import React from 'react';
import { sanityClient, previewClient, urlFor } from '@/sanity/client';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { Metadata } from 'next';

export const revalidate = 60;

const itineraryQuery = `*[_type == "itinerary" && slug.current == $slug][0] {
  _id,
  _type,
  title,
  slug,
  eyebrow,
  subtitle,
  description,
  image,
  pricing {
    priceString,
    minimumGroup,
    inclusions
  },
  activities[]-> {
    _id,
    title,
    slug,
    eyebrow,
    subtitle,
    description,
    adventureLevel,
    ctaText,
    image,
    pricing {
      priceString,
      minimumGroup,
      inclusions
    },
    suppliers[] {
      label,
      name,
      credential
    }
  }
}`;

const activityQuery = `*[_type == "activity" && slug.current == $slug][0] {
  _id,
  _type,
  title,
  slug,
  eyebrow,
  subtitle,
  description,
  adventureLevel,
  ctaText,
  image,
  pricing {
    priceString,
    minimumGroup,
    inclusions
  },
  suppliers[] {
    label,
    name,
    credential
  }
}`;

interface ItineraryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ItineraryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const isDraft = (await draftMode()).isEnabled;
  const client = isDraft ? previewClient : sanityClient;
  
  // Try itinerary first
  const itinerary = await client.fetch(itineraryQuery, { slug });
  if (itinerary) {
    return {
      title: `${itinerary.title} | Traverse South`,
      description: itinerary.subtitle || itinerary.description,
    };
  }

  // Fallback to activity
  const activity = await client.fetch(activityQuery, { slug });
  if (activity) {
    return {
      title: `${activity.title} Itinerary | Traverse South`,
      description: activity.subtitle || activity.description,
    };
  }

  return {
    title: 'Itinerary | Traverse South',
  };
}

export default async function ItineraryPage({ params }: ItineraryPageProps) {
  const { slug } = await params;
  const isDraft = (await draftMode()).isEnabled;
  const client = isDraft ? previewClient : sanityClient;

  // Try fetching as itinerary
  const itinerary = await client.fetch(itineraryQuery, { slug });
  let activity = null;

  if (!itinerary) {
    // Fallback to activity
    activity = await client.fetch(activityQuery, { slug });
    if (!activity) {
      notFound();
    }
  }

  // Determine metadata values
  const title = itinerary ? itinerary.title : activity.title;
  const subtitle = itinerary ? itinerary.subtitle : (activity.subtitle || activity.description);
  const description = itinerary ? itinerary.description : activity.description;
  
  // Resolve image URL
  let imageUrl = '';
  if (itinerary) {
    imageUrl = itinerary.image 
      ? urlFor(itinerary.image).url() 
      : (itinerary.activities?.[0]?.image 
          ? urlFor(itinerary.activities[0].image).url() 
          : `/images/${itinerary.activities?.[0]?.slug?.current}.png`);
  } else if (activity) {
    imageUrl = activity.image 
      ? urlFor(activity.image).url() 
      : `/images/${activity.slug?.current}.png`;
  }

  // Calculate stats
  const maxAdventureLevel = itinerary
    ? Math.max(...(itinerary.activities || []).map((a: any) => a.adventureLevel || 1))
    : (activity.adventureLevel || 1);

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 1: return 'LEVEL 1 // RESTORATIVE';
      case 2: return 'LEVEL 2 // ACTIVE WILDERNESS';
      case 3: return 'LEVEL 3 // HIGH GRAVITY';
      default: return `LEVEL ${level}`;
    }
  };

  const getTechLevel = (level: number) => {
    switch (level) {
      case 1: return 'Basic';
      case 2: return 'Intermediate';
      case 3: return 'Elite';
      default: return 'Standard';
    }
  };

  const getPhysicalIntensity = (level: number) => {
    switch (level) {
      case 1: return 'Restorative';
      case 2: return 'Medium Intensity';
      case 3: return 'High Intensity';
      default: return 'Standard';
    }
  };

  // Pricing & Inclusions aggregation
  const priceString = itinerary 
    ? (itinerary.pricing?.priceString || 'Bespoke Package Quote')
    : (activity.pricing?.priceString || 'Bespoke Quote');

  const minimumGroup = itinerary
    ? (itinerary.pricing?.minimumGroup || 'Tailored to private groups')
    : (activity.pricing?.minimumGroup || 'Tailored for private groups');

  const inclusions = itinerary
    ? (itinerary.pricing?.inclusions && itinerary.pricing.inclusions.length > 0
        ? itinerary.pricing.inclusions
        : (itinerary.activities || []).flatMap((a: any) => a.pricing?.inclusions || []))
    : (activity.pricing?.inclusions || [
        'Private transfers and safety crews',
        'Bespoke guiding and premium gear'
      ]);

  // Aggregate verified operators list
  const uniqueSuppliers: any[] = [];
  const supplierNames = new Set<string>();

  if (itinerary) {
    (itinerary.activities || []).forEach((act: any) => {
      (act.suppliers || []).forEach((sup: any) => {
        if (!supplierNames.has(sup.name)) {
          supplierNames.add(sup.name);
          uniqueSuppliers.push(sup);
        }
      });
    });
  } else if (activity) {
    (activity.suppliers || []).forEach((sup: any) => {
      if (!supplierNames.has(sup.name)) {
        supplierNames.add(sup.name);
        uniqueSuppliers.push(sup);
      }
    });
  }

  // Format Day Timeline Phases
  const timelineDays = itinerary 
    ? (itinerary.activities || []).map((act: any, idx: number) => ({
        dayNumber: `PHASE ${idx + 1}`,
        title: act.title,
        description: act.description,
        logistics: act.suppliers?.[0] 
          ? `Transit & guides by certified operator: ${act.suppliers[0].name} (${act.suppliers[0].credential})`
          : 'Surgical field transit & safety guides network'
      }))
    : [{
        dayNumber: 'PHASE 1',
        title: activity.title,
        description: activity.description,
        logistics: activity.suppliers?.[0]
          ? `Coordinated by operator: ${activity.suppliers[0].name} (${activity.suppliers[0].credential})`
          : 'Surgical field transit & safety guides network'
      }];

  return (
    <main style={{ backgroundColor: '#0b0b0b', color: '#b9b9b9', minHeight: '100vh', paddingBottom: 'var(--spacing-section-lg)' }}>
      {/* Editorial Banner */}
      <div 
        style={{
          width: '100%',
          height: '40vh',
          minHeight: '300px',
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, #0b0b0b 0%, rgba(11, 11, 11, 0.4) 100%)'
        }} />
      </div>

      <div className="container" style={{ marginTop: '-80px', position: 'relative', zIndex: 10 }}>
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '32px' }}>
          <Link href="/#adventures" style={{
            fontFamily: 'var(--font-ibm-plex-mono), monospace',
            fontSize: '13px',
            color: 'var(--colors-brand)',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            ← Return to manifests
          </Link>
        </div>

        {/* Header Block */}
        <div style={{ borderBottom: '1px solid var(--colors-hairline-soft)', paddingBottom: '40px', marginBottom: '48px' }}>
          <p className="typography-mono-eyebrow" style={{ color: 'var(--colors-brand)', marginBottom: '16px', letterSpacing: '1px' }}>
            {getLevelLabel(maxAdventureLevel)}
          </p>
          <h1 className="typography-display-xl" style={{ color: '#fff', marginBottom: '24px' }}>
            {title}
          </h1>
          <p className="typography-subtitle" style={{ color: 'var(--colors-ash)', maxWidth: '800px', lineHeight: 1.6 }}>
            {subtitle}
          </p>
        </div>

        {/* Split Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '64px' }}>
          {/* Left Column: Narrative Timeline */}
          <div>
            <h2 className="typography-mono-caps" style={{ color: 'var(--colors-mute)', marginBottom: '32px', borderBottom: '1px solid #222', paddingBottom: '12px' }}>
              // CHRONOLOGICAL TIMELINE
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              {timelineDays.map((day: any, idx: number) => (
                <div key={idx} style={{ display: 'flex', gap: '24px' }}>
                  {/* Timeline node */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: '1px solid var(--colors-brand)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--colors-brand)',
                      fontFamily: 'var(--font-ibm-plex-mono), monospace',
                      fontSize: '12px',
                      fontWeight: 600,
                      backgroundColor: '#0b0b0b'
                    }}>
                      {idx + 1}
                    </div>
                    {idx < timelineDays.length - 1 && (
                      <div style={{ flex: 1, width: '1px', backgroundColor: 'var(--colors-hairline-soft)', margin: '12px 0' }} />
                    )}
                  </div>

                  {/* Timeline details */}
                  <div style={{ flex: 1 }}>
                    <p className="typography-mono-eyebrow" style={{ color: 'var(--colors-mute)', fontSize: '11px', textTransform: 'uppercase', marginBottom: '8px' }}>
                      {day.dayNumber}
                    </p>
                    <h3 className="typography-heading-sm" style={{ color: '#fff', marginBottom: '16px', fontWeight: 500 }}>
                      {day.title}
                    </h3>
                    <p className="typography-body" style={{ color: 'var(--colors-ash)', lineHeight: 1.7, marginBottom: '20px' }}>
                      {day.description}
                    </p>

                    {day.logistics && (
                      <div style={{ 
                        backgroundColor: 'var(--colors-canvas-soft)', 
                        padding: '16px', 
                        borderRadius: 'var(--rounded-app-md)', 
                        border: '1px solid var(--colors-hairline-soft)',
                        fontFamily: 'var(--font-ibm-plex-mono), monospace',
                        fontSize: '12px',
                        color: 'var(--colors-ash)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px'
                      }}>
                        <span style={{ color: 'var(--colors-brand)', fontSize: '10px', letterSpacing: '1px' }}>// LOGISTICS & SAFETY ENVELOPE</span>
                        <span>{day.logistics}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* In-Line calendar widget placeholder */}
            <div style={{ marginTop: '64px', borderTop: '1px solid var(--colors-hairline-soft)', paddingTop: '48px' }}>
              <p className="typography-mono-eyebrow" style={{ color: 'var(--colors-brand)', marginBottom: '16px' }}>
                // DIRECT BOOKING WIDGET
              </p>
              <h3 className="typography-heading-md" style={{ color: '#fff', marginBottom: '24px' }}>
                Select Your Expedition Window
              </h3>
              
              <div 
                style={{ 
                  borderRadius: 'var(--rounded-marketing)', 
                  overflow: 'hidden', 
                  border: '1px solid var(--colors-hairline-soft)',
                  backgroundColor: '#000',
                  padding: '16px',
                  maxWidth: '560px',
                  marginBottom: '24px'
                }}
              >
                <img 
                  src="/images/booking_calendar.png" 
                  alt="Calendar Date Selection UI Mockup" 
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

              <p className="typography-meta" style={{ color: 'var(--colors-mute)', maxWidth: '560px', lineHeight: 1.6 }}>
                "Selecting dates on these individual manifests locks in your slot directly with our certified local operators. All transfers, safety guides, and rotorcraft availability are reserved in real-time, removing the traditional delays of luxury travel booking."
              </p>
            </div>
          </div>

          {/* Right Column: Logistics Overview Block */}
          <div>
            <div 
              style={{
                backgroundColor: 'var(--colors-canvas-soft)',
                border: '1px solid var(--colors-hairline-soft)',
                borderRadius: 'var(--rounded-marketing)',
                padding: 'var(--spacing-xl)',
                position: 'sticky',
                top: '100px'
              }}
            >
              <p className="typography-mono-eyebrow" style={{ color: 'var(--colors-mute)', marginBottom: '16px' }}>
                // EXPEDITION BLUEPRINT
              </p>

              {/* Price Row */}
              <div style={{ borderBottom: '1px solid #333', paddingBottom: '20px', marginBottom: '20px' }}>
                <span style={{ fontSize: '12px', color: 'var(--colors-mute)', display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>ESTIMATED COSTING</span>
                <span className="typography-heading-md" style={{ color: '#fff', fontWeight: 600 }}>
                  {priceString}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--colors-mute)', marginLeft: '6px' }}>
                  {priceString !== 'Bespoke Package Quote' ? '' : ''}
                </span>
                <p style={{ fontSize: '12px', color: 'var(--colors-ash)', marginTop: '6px' }}>
                  {minimumGroup}
                </p>
              </div>

              {/* Specs Rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderBottom: '1px solid #333', paddingBottom: '20px', marginBottom: '20px' }}>
                <div>
                  <span style={{ fontSize: '10px', color: 'var(--colors-mute)', display: 'block', textTransform: 'uppercase', marginBottom: '2px', fontFamily: 'var(--font-ibm-plex-mono), monospace' }}>DURATION</span>
                  <span style={{ color: '#fff', fontSize: '15px' }}>
                    {itinerary 
                      ? `${itinerary.activities?.length || 1} Days (Custom Adjustments Available)`
                      : '1 Day (Expedition Extension Available)'}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: '10px', color: 'var(--colors-mute)', display: 'block', textTransform: 'uppercase', marginBottom: '2px', fontFamily: 'var(--font-ibm-plex-mono), monospace' }}>TECHNICAL DIFFICULTY</span>
                  <span style={{ color: '#fff', fontSize: '15px' }}>{getTechLevel(maxAdventureLevel)}</span>
                </div>
                <div>
                  <span style={{ fontSize: '10px', color: 'var(--colors-mute)', display: 'block', textTransform: 'uppercase', marginBottom: '2px', fontFamily: 'var(--font-ibm-plex-mono), monospace' }}>PHYSICAL INTENSITY</span>
                  <span style={{ color: '#fff', fontSize: '15px' }}>{getPhysicalIntensity(maxAdventureLevel)}</span>
                </div>
              </div>

              {/* Inclusions */}
              <div style={{ borderBottom: '1px solid #333', paddingBottom: '20px', marginBottom: '20px' }}>
                <span style={{ fontSize: '10px', color: 'var(--colors-mute)', display: 'block', textTransform: 'uppercase', marginBottom: '12px', fontFamily: 'var(--font-ibm-plex-mono), monospace' }}>EXPEDITION INCLUSIONS</span>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {inclusions.map((inc: string, idx: number) => (
                    <li key={idx} style={{ fontSize: '13px', color: 'var(--colors-ash)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ color: 'var(--colors-brand)', fontWeight: 'bold' }}>✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verified Operators */}
              {uniqueSuppliers.length > 0 && (
                <div>
                  <span style={{ fontSize: '10px', color: 'var(--colors-mute)', display: 'block', textTransform: 'uppercase', marginBottom: '12px', fontFamily: 'var(--font-ibm-plex-mono), monospace' }}>LICENSED OPERATOR NETWORK</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {uniqueSuppliers.map((sup: any, idx: number) => (
                      <div key={idx} style={{ fontSize: '13px' }}>
                        <span style={{ color: '#fff', display: 'block', fontWeight: 500 }}>{sup.name}</span>
                        <span style={{ color: 'var(--colors-mute)', fontSize: '11px', display: 'block', marginTop: '2px' }}>{sup.credential}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

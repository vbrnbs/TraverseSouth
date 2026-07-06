import React from 'react';
import Image from 'next/image';
import { sanityClient, previewClient, urlFor } from '@/sanity/client';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { Metadata } from 'next';
import { PortableText } from '@portabletext/react';
import { ItineraryBooking } from '@/components/ItineraryBooking';

export const revalidate = 60;

const itineraryQuery = `*[_type == "itinerary" && slug.current == $slug][0] {
  _id,
  _type,
  title,
  slug,
  eyebrow,
  subtitle,
  description[] {
    ...,
    markDefs[] {
      ...,
      _type == "activityLink" => {
        ...,
        "slug": reference->slug.current
      }
    }
  },
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
    duration,
    description,
    adventureLevel,
    ctaText,
    image,
    pricing {
      priceString,
      minimumGroup,
      inclusions
    },
    "suppliers": select(
      defined(operator) => [{
        "label": "Vetted Operator",
        "name": operator->companyName,
        "credential": operator->primaryContact
      }],
      suppliers[] {
        label,
        name,
        credential
      }
    )
  }
}`;

const activityQuery = `*[_type == "activity" && slug.current == $slug][0] {
  _id,
  _type,
  title,
  slug,
  eyebrow,
  subtitle,
  duration,
  description,
  adventureLevel,
  ctaText,
  image,
  pricing {
    priceString,
    minimumGroup,
    inclusions
  },
  "suppliers": select(
    defined(operator) => [{
      "label": "Vetted Operator",
      "name": operator->companyName,
      "credential": operator->primaryContact
    }],
    suppliers[] {
      label,
      name,
      credential
    }
  )
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
      description: itinerary.subtitle || (typeof itinerary.description === 'string' ? itinerary.description : ''),
    };
  }

  // Fallback to activity
  const activity = await client.fetch(activityQuery, { slug });
  if (activity) {
    return {
      title: `${activity.title} | Traverse South`,
      description: activity.subtitle || activity.description,
    };
  }

  return {
    title: 'Itinerary | Traverse South',
  };
}

const portableTextComponents = {
  marks: {
    activityLink: ({ children, value }: any) => {
      const slug = value?.slug;
      if (!slug) return <span>{children}</span>;
      return (
        <Link
          href={`/trips/${slug}`}
          style={{
            color: 'var(--colors-brand)',
            fontWeight: 500,
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
            transition: 'opacity 0.2s',
          }}
          className="activity-link-hover"
        >
          {children}
        </Link>
      );
    },
    link: ({ children, value }: any) => {
      return (
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'var(--colors-link-blue-soft)',
            textDecoration: 'underline'
          }}
        >
          {children}
        </a>
      );
    }
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="typography-display-sm" style={{ color: '#fff', marginTop: '40px', marginBottom: '20px' }}>
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="typography-heading-md" style={{ color: '#fff', marginTop: '36px', marginBottom: '16px' }}>
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="typography-heading-sm" style={{ color: '#fff', marginTop: '28px', marginBottom: '12px' }}>
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="typography-body" style={{ color: 'var(--colors-ash)', lineHeight: '1.8', marginBottom: '24px', fontSize: '17px' }}>
        {children}
      </p>
    )
  }
};

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
      case 1: return 'LEVEL 1 // MODERATE';
      case 2: return 'LEVEL 2 // INTENSE';
      case 3: return 'LEVEL 3 // EXTREME';
      default: return `LEVEL ${level}`;
    }
  };

  const getTechLevel = (level: number) => {
    switch (level) {
      case 1: return 'Basic';
      case 2: return 'Intermediate';
      case 3: return 'Advanced';
      default: return 'Standard';
    }
  };

  const getPhysicalIntensity = (level: number) => {
    switch (level) {
      case 1: return 'Low';
      case 2: return 'Medium';
      case 3: return 'High';
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
      'Transfers and safety crews',
      'Guiding and premium gear'
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

  // Construct fake activity for client booking modal
  const bookingActivity = itinerary
    ? {
      _id: itinerary._id,
      title: itinerary.title,
      slug: itinerary.slug,
      eyebrow: itinerary.eyebrow,
      subtitle: itinerary.subtitle,
      duration: `${itinerary.activities?.length || 1} Days`,
      description: typeof itinerary.description === 'string'
        ? itinerary.description
        : (itinerary.subtitle || ''),
      adventureLevel: maxAdventureLevel,
      ctaText: 'Book Now',
      image: itinerary.image || itinerary.activities?.[0]?.image,
      pricing: {
        priceString: priceString,
        minimumGroup: minimumGroup,
        inclusions: inclusions
      }
    }
    : {
      _id: activity._id,
      title: activity.title,
      slug: activity.slug,
      eyebrow: activity.eyebrow,
      subtitle: activity.subtitle,
      duration: activity.duration || '1 Day',
      description: activity.description,
      adventureLevel: activity.adventureLevel || 1,
      ctaText: activity.ctaText || 'Book Now',
      image: activity.image,
      pricing: {
        priceString: priceString,
        minimumGroup: minimumGroup,
        inclusions: inclusions
      }
    };

  return (
    <main style={{ backgroundColor: '#0b0b0b', color: '#b9b9b9', minHeight: '100vh', paddingBottom: 'var(--spacing-section-lg)' }}>
      {/* Editorial Content Container */}
      <div className="container" style={{ maxWidth: '800px', paddingTop: '120px', paddingBottom: '40px' }}>

        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '40px' }}>
          <Link href="/" style={{
            fontFamily: 'var(--font-ibm-plex-mono), monospace',
            fontSize: '12px',
            color: 'var(--colors-brand)',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            letterSpacing: '1px'
          }}>
            ← Return to manifests
          </Link>
        </div>

        {/* Header Block */}
        <div style={{ marginBottom: '48px' }}>
          <p className="typography-mono-eyebrow" style={{ color: 'var(--colors-mute)', marginBottom: '16px', letterSpacing: '1px' }}>
            {getLevelLabel(maxAdventureLevel)}
          </p>
          <h1 className="typography-display-md" style={{ color: '#fff', marginBottom: '24px', lineHeight: '1.1', letterSpacing: '-2.0px' }}>
            {title}
          </h1>
          <p className="typography-subtitle" style={{ color: 'var(--colors-ash)', lineHeight: 1.6, fontSize: '20px' }}>
            {subtitle}
          </p>
        </div>

        {/* Main Editorial Image with Low-Res Blur Placeholder & Next.js Image */}
        {imageUrl && (
          <div style={{
            width: '100%',
            height: '450px',
            position: 'relative',
            borderRadius: 'var(--rounded-marketing)',
            border: '1px solid var(--colors-hairline-soft)',
            marginBottom: '48px',
            overflow: 'hidden'
          }}>
            {/* Instant Low-Res Blur Placeholder */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(20px)',
              transform: 'scale(1.15)',
              zIndex: 0
            }} />
            <Image
              src={imageUrl}
              alt={title || 'Expedition Image'}
              fill
              priority
              style={{ objectFit: 'cover', zIndex: 1 }}
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        )}

        {/* Stats Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '24px',
            padding: '24px 0',
            borderTop: '1px solid var(--colors-hairline-soft)',
            borderBottom: '1px solid var(--colors-hairline-soft)',
            marginBottom: '56px'
          }}
        >
          <div>
            <span style={{ fontSize: '10px', color: 'var(--colors-mute)', display: 'block', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'var(--font-ibm-plex-mono), monospace' }}>// ESTIMATED COSTING</span>
            <span style={{ color: '#fff', fontSize: '18px', fontWeight: 500 }}>{priceString}</span>
            <span style={{ fontSize: '12px', color: 'var(--colors-mute)', display: 'block', marginTop: '2px' }}>{minimumGroup}</span>
          </div>
          <div>
            <span style={{ fontSize: '10px', color: 'var(--colors-mute)', display: 'block', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'var(--font-ibm-plex-mono), monospace' }}>// DURATION</span>
            <span style={{ color: '#fff', fontSize: '18px', fontWeight: 500 }}>
              {itinerary
                ? `${itinerary.activities?.length || 1} Days`
                : (activity?.duration || '1 Day')}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--colors-mute)', display: 'block', marginTop: '2px' }}>Custom modules available</span>
          </div>
          <div>
            <span style={{ fontSize: '10px', color: 'var(--colors-mute)', display: 'block', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'var(--font-ibm-plex-mono), monospace' }}>// TECHNICAL DIFFICULTY</span>
            <span style={{ color: '#fff', fontSize: '18px', fontWeight: 500 }}>{getTechLevel(maxAdventureLevel)}</span>
          </div>
          <div>
            <span style={{ fontSize: '10px', color: 'var(--colors-mute)', display: 'block', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'var(--font-ibm-plex-mono), monospace' }}>// PHYSICAL INTENSITY</span>
            <span style={{ color: '#fff', fontSize: '18px', fontWeight: 500 }}>{getPhysicalIntensity(maxAdventureLevel)}</span>
          </div>
        </div>

        {/* Main Description / Narrative Editorial */}
        <div style={{ marginBottom: '64px' }}>
          {description ? (
            Array.isArray(description) ? (
              <PortableText value={description} components={portableTextComponents} />
            ) : (
              <p className="typography-body" style={{ color: 'var(--colors-ash)', lineHeight: '1.8', fontSize: '17px' }}>
                {description}
              </p>
            )
          ) : null}
        </div>

        {/* Activities / Phases Sections (Only if itinerary document) */}
        {itinerary && itinerary.activities && itinerary.activities.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', marginTop: '80px', borderTop: '1px solid var(--colors-hairline-soft)', paddingTop: '80px' }}>
            <h2 className="typography-mono-caps" style={{ color: 'var(--colors-mute)', fontSize: '12px', letterSpacing: '1.5px', marginBottom: '-40px' }}>
              // EXPEDITION SEQUENTIAL PHASES
            </h2>

            {itinerary.activities.map((act: any, idx: number) => {
              const actImageUrl = act.image ? urlFor(act.image).url() : `/images/${act.slug?.current}.png`;
              return (
                <div key={act._id} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                    <span style={{
                      fontFamily: 'var(--font-ibm-plex-mono), monospace',
                      fontSize: '14px',
                      color: 'var(--colors-brand)',
                      fontWeight: 600
                    }}>
                      PHASE 0{idx + 1}
                    </span>
                    <span style={{ color: 'var(--colors-mute)', fontSize: '12px' }}>—</span>
                    <span className="typography-mono-eyebrow" style={{ color: 'var(--colors-mute)' }}>
                      {getLevelLabel(act.adventureLevel)}
                    </span>
                  </div>

                  <h3 className="typography-heading-md" style={{ color: '#fff', fontWeight: 500, margin: 0, fontSize: '28px', letterSpacing: '-0.5px' }}>
                    {act.title}
                  </h3>

                  {actImageUrl && (
                    <div style={{
                      width: '100%',
                      height: '350px',
                      position: 'relative',
                      borderRadius: 'var(--rounded-marketing)',
                      border: '1px solid var(--colors-hairline-soft)',
                      overflow: 'hidden'
                    }}>
                      {/* Instant Low-Res Blur Placeholder */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${actImageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(15px)',
                        transform: 'scale(1.15)',
                        zIndex: 0
                      }} />
                      <Image
                        src={actImageUrl}
                        alt={act.title || `Phase ${idx + 1}`}
                        fill
                        style={{ objectFit: 'cover', zIndex: 1 }}
                        sizes="(max-width: 1200px) 100vw, 800px"
                      />
                    </div>
                  )}

                  <p className="typography-body" style={{ color: 'var(--colors-ash)', lineHeight: '1.8', margin: 0 }}>
                    {act.description}
                  </p>

                  {/* Operator info / logistics card */}
                  {act.suppliers?.[0] && (
                    <div style={{
                      backgroundColor: 'var(--colors-canvas-soft)',
                      padding: '20px',
                      borderRadius: 'var(--rounded-marketing)',
                      border: '1px solid var(--colors-hairline-soft)',
                      fontFamily: 'var(--font-ibm-plex-mono), monospace',
                      fontSize: '13px',
                      color: 'var(--colors-ash)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}>
                      <span style={{ color: 'var(--colors-brand)', fontSize: '11px', letterSpacing: '1px', fontWeight: 600 }}>
                        // LICENSED OPERATOR NETWORK
                      </span>
                      <span style={{ color: '#fff', fontWeight: 500 }}>{act.suppliers[0].name}</span>
                      <span style={{ color: 'var(--colors-mute)', fontSize: '12px' }}>{act.suppliers[0].credential}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Integrated Inclusions & Operator Summary Section */}
        <div style={{ marginTop: '80px', borderTop: '1px solid var(--colors-hairline-soft)', paddingTop: '64px' }}>
          <h4 className="typography-mono-caps" style={{ color: 'var(--colors-mute)', marginBottom: '24px' }}>
            // INCLUDED IN THIS EXPEDITION
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 48px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {inclusions.map((inc: string, idx: number) => (
              <li key={idx} style={{ fontSize: '14px', color: 'var(--colors-ash)', display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: '1.5' }}>
                <span style={{ color: 'var(--colors-brand)', fontWeight: 'bold' }}>✓</span>
                <span>{inc}</span>
              </li>
            ))}
          </ul>

          {uniqueSuppliers.length > 0 && (
            <div style={{ marginBottom: '64px' }}>
              <h4 className="typography-mono-caps" style={{ color: 'var(--colors-mute)', marginBottom: '24px' }}>
                // VERIFIED SERVICE PARTNERS
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
                {uniqueSuppliers.map((sup: any, idx: number) => (
                  <div key={idx} style={{
                    backgroundColor: 'var(--colors-canvas-soft)',
                    padding: '16px',
                    borderRadius: 'var(--rounded-marketing)',
                    border: '1px solid var(--colors-hairline-soft)'
                  }}>
                    <span style={{ color: '#fff', display: 'block', fontWeight: 500, fontSize: '14px' }}>{sup.name}</span>
                    <span style={{ color: 'var(--colors-mute)', fontSize: '11px', display: 'block', marginTop: '4px', fontFamily: 'var(--font-ibm-plex-mono), monospace' }}>{sup.credential}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Booking Calendar Widget & Final CTA Section */}
        <div style={{ marginTop: '80px', borderTop: '1px solid var(--colors-hairline-soft)', paddingTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p className="typography-mono-eyebrow" style={{ color: 'var(--colors-brand)', marginBottom: '16px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            // SECURE EXPEDITION SLOT
          </p>
          <h3 className="typography-heading-md" style={{ color: '#fff', marginBottom: '16px', textAlign: 'center' }}>
            Select Your Dates
          </h3>
          {/* <p className="typography-body" style={{ color: 'var(--colors-ash)', maxWidth: '600px', textAlign: 'center', marginBottom: '32px', lineHeight: '1.6' }}>
            Selecting dates on these individual manifests locks in your slot directly with our certified local operators. All transfers, safety guides, and rotorcraft availability are reserved in real-time, removing the traditional delays of luxury travel booking.
          </p> */}

          {/* Dynamic Client Booking Trigger button with interactive BookingCalendar widget */}
          <ItineraryBooking activity={bookingActivity} />
        </div>

      </div>
    </main>
  );
}

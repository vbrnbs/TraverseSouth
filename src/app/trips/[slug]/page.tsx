import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { Metadata } from 'next';
import { PortableText } from '@portabletext/react';
import { ActivityCardSmall } from '@/components/ActivityCardSmall';
import { OperatorCardSmall } from '@/components/OperatorCardSmall';
import { ReturnToMainLink } from '@/components/ReturnToMainLink';
import { PackageHero } from '@/components/PackageHero';
import { TripBookingPanel } from '@/components/TripBookingPanel';
import { portableTextComponents } from '@/components/PortableTextComponents';

import {
  itineraryDetailQuery as itineraryQuery,
  activityDetailQuery as activityQuery,
} from '@/sanity/queries';
import { sanityClient, previewClient, urlFor } from '@/sanity/client';

export const revalidate = 60;

interface ItineraryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ItineraryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const isDraft = (await draftMode()).isEnabled;
  const client = isDraft ? previewClient : sanityClient;

  const itinerary = await client.fetch(itineraryQuery, { slug });
  if (itinerary) {
    return {
      title: `${itinerary.title} | Traverse South`,
      description: itinerary.subtitle || 'Expertly curated multi-day expedition in the Southern Alps.',
    };
  }

  const activity = await client.fetch(activityQuery, { slug });
  if (activity) {
    return {
      title: `${activity.title} | Traverse South`,
      description: activity.subtitle || activity.description || 'Verified wilderness activity.',
    };
  }

  return {
    title: 'Itinerary | Traverse South',
  };
}

export default async function ActivitiesPage({ params }: ItineraryPageProps) {
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
  const rawAdventureLevel = itinerary
    ? (itinerary.adventureLevel || itinerary.activities?.[0]?.adventureLevel || 'BEGINNER')
    : (activity?.adventureLevel || 'BEGINNER');

  const adventureLevelMap: Record<string, string> = {
    '1': 'BEGINNER',
    '2': 'INTERMEDIATE',
    '3': 'ADVANCED',
    '4': 'EXTREME',
  };

  const adventureLevelValue =
    adventureLevelMap[String(rawAdventureLevel)] || String(rawAdventureLevel);

  // Derive pricing, minimum group, and inclusions safely
  const priceString = itinerary
    ? (itinerary.pricing?.priceString || '')
    : (activity?.pricing?.priceString || '');

  const minimumGroup = itinerary
    ? (itinerary.pricing?.minimumGroup || '')
    : (activity?.pricing?.minimumGroup || '');

  const adventureHighlights = itinerary
    ? (itinerary.adventureHighlights || itinerary.activities?.flatMap((a: any) => a.adventureHighlights || []))
    : (activity?.adventureHighlights || []);

  const inclusions = itinerary
    ? (itinerary.pricing?.inclusions || [
      'Private twin-engine rotorcraft staging',
      'Certified IFMGA mountain & wilderness guides',
      'All technical & backcountry safety apparatus',
      'Bespoke backcountry culinary provisions'
    ])
    : (activity?.pricing?.inclusions || [
      'Dedicated professional guide',
      'All specialized technical gear',
      'Safety & logistics oversight'
    ]);

  const durationString = itinerary
    ? `${itinerary.activities?.length || 1} Days`
    : (activity?.duration || '1 Day');

  // Collect unique suppliers
  const suppliersMap = new Map();
  const rawSuppliersList: any[] = [];

  if (itinerary && itinerary.activities) {
    itinerary.activities.forEach((act: any) => {
      (act.suppliers || []).forEach((sup: any) => {
        if (sup && sup.name) {
          rawSuppliersList.push(sup);
        }
      });
    });
  } else if (activity) {
    (activity.suppliers || []).forEach((sup: any) => {
      if (sup && sup.name) {
        rawSuppliersList.push(sup);
      }
    });
  }

  rawSuppliersList.forEach((sup) => {
    if (!suppliersMap.has(sup.name)) {
      suppliersMap.set(sup.name, sup);
    }
  });
  const uniqueSuppliers = Array.from(suppliersMap.values());

  // Related activities
  const relatedActivities = itinerary ? itinerary.relatedActivities : activity?.relatedActivities;

  return (
    <main style={{ backgroundColor: '#0b0b0b', color: '#fff', minHeight: '100vh', position: 'relative' }}>
      {/* Return button at the top of the page */}
      <div
        style={{
          position: 'absolute',
          top: '110px',
          left: '0',
          right: '0',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 var(--spacing-lg)',
            pointerEvents: 'auto',
          }}
        >
          <ReturnToMainLink />
        </div>
      </div>

      {/* 01. Atmospheric Hero Section matching packages/[slug] */}
      <PackageHero
        eyebrow={adventureLevelValue}
        title={title}
        caption={subtitle}
        bgImage={imageUrl}
      />

      {/* 02. Detail Grid Layout Section matching packages/[slug] */}
      <section style={{ backgroundColor: '#0b0b0b' }}>
        <div className="detail-grid" style={{ alignItems: 'start' }}>
          {/* Column A: Main Editorial Description ONLY */}
          <div>
            {description ? (
              <div style={{ color: 'var(--colors-ash)', fontSize: '17px', lineHeight: '1.8' }}>
                {Array.isArray(description) ? (
                  <PortableText value={description} components={portableTextComponents} />
                ) : (
                  <p className="typography-body" style={{ color: 'var(--colors-ash)', lineHeight: '1.8', margin: 0 }}>
                    {description}
                  </p>
                )}
              </div>
            ) : null}
          </div>

          {/* Column B: Reusable Sticky Expedition Pricing & Summary Panel */}
          <div style={{ position: 'sticky', top: '110px', zIndex: 10 }}>
            <TripBookingPanel
              priceString={priceString}
              minimumGroup={minimumGroup}
              durationString={durationString}
              adventureLevelLabel={adventureLevelValue}
              adventureHighlights={adventureHighlights}
              inclusions={inclusions}
            />
          </div>
        </div>

        {/* Sections below the description where sticky booking panel has stopped */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 var(--spacing-lg) var(--spacing-section-lg)' }}>
          {/* Service Operators Grid */}
          {uniqueSuppliers.length > 0 && (
            <section style={{ borderTop: '1px solid var(--colors-hairline-soft)', paddingTop: '64px', marginBottom: '64px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-ibm-plex-mono), monospace',
                  fontSize: '11px',
                  color: 'var(--colors-mute, #797979)',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  display: 'block',
                  marginBottom: '24px',
                }}
              >
                // SERVICE OPERATORS
              </span>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '16px',
                }}
              >
                {uniqueSuppliers.map((sup: any, idx: number) => {
                  const supLogoUrl = sup.logo ? urlFor(sup.logo).url() : undefined;
                  return (
                    <OperatorCardSmall
                      key={idx}
                      name={sup.name}
                      slug={sup.slug}
                      logoUrl={supLogoUrl}
                      label={sup.label}
                    />
                  );
                })}
              </div>
            </section>
          )}

          {/* Related Activities Carousel */}
          {relatedActivities && relatedActivities.length > 0 && (
            <section style={{ borderTop: '1px solid var(--colors-hairline-soft)', paddingTop: '64px', marginBottom: '64px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-ibm-plex-mono), monospace',
                  fontSize: '11px',
                  color: 'var(--colors-mute, #797979)',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  display: 'block',
                  marginBottom: '24px',
                }}
              >
                // RELATED ACTIVITIES
              </span>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '16px',
                  overflowX: 'auto',
                  paddingBottom: '16px',
                  scrollSnapType: 'x mandatory',
                }}
              >
                {relatedActivities.map((rel: any, idx: number) => {
                  const relImage = rel.image ? urlFor(rel.image).url() : `/images/${rel.slug?.current}.png`;
                  return (
                    <div
                      key={rel._id || idx}
                      style={{
                        width: '280px',
                        flexShrink: 0,
                        scrollSnapAlign: 'start',
                      }}
                    >
                      <ActivityCardSmall
                        title={rel.title}
                        slug={rel.slug?.current || ''}
                        subtitle={rel.subtitle}
                        image={relImage}
                        duration={rel.duration}
                        priceString={rel.pricing?.priceString}
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}

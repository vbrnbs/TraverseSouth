import React from 'react';
import { sanityClient, previewClient } from '@/sanity/client';
import { homepageQuery } from '@/sanity/queries';
import { ScrollObserver } from '@/components/ScrollObserver';
import { Hero } from '@/components/Hero';
import { AdventuresSection } from '@/components/AdventuresSection';
import { ItinerariesWaitlist } from '@/components/ItinerariesWaitlist';
import { MissionSection } from '@/components/MissionSection';
import { LaunchPopup } from '@/components/LaunchPopup';
import { draftMode } from 'next/headers';

// Configure dynamic pages to always fetch fresh data from Sanity on every request
export const revalidate = 0;

/* ═══════════════════════════════════════════════
   Server Component — fetches 100% dynamically from
   Sanity Studio at request/build time.
   ═══════════════════════════════════════════════ */

export default async function Home() {
  let data: any = null;
  const isDraft = (await draftMode()).isEnabled;
  const client = isDraft ? previewClient : sanityClient;

  try {
    data = await client.fetch(homepageQuery, {}, { next: { revalidate: 0 } });
  } catch (error) {
    console.error('Error fetching homepage data from Sanity:', error);
  }

  if (!data) {
    return (
      <div style={{ background: '#0b0b0b', color: '#fff', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '8px', fontWeight: 500, letterSpacing: '-0.32px' }}>Traverse South</h1>
          <p style={{ color: '#888', fontSize: '14px' }}>Connecting to Sanity Studio. Please verify that your dataset is populated and the server is online.</p>
        </div>
      </div>
    );
  }

  const { hero, adventures, mission, featuredActivities, featuredItineraries, itinerariesPage, popup } = data;

  // Single Source of Truth: mirror content directly from the standalone Itineraries Page
  const syncedItinerariesData = {
    eyebrow: itinerariesPage?.eyebrow || '// EXPEDITION BLUEPRINTS',
    title: itinerariesPage?.title || 'Multi-Day Sovereign Journeys',
    subtitle: itinerariesPage?.subtitle || itinerariesPage?.seoDescription || 'Expertly curated narratives combining private aviation, elite guides, and ultra-luxe lodges. We are currently hand-selecting our founding expedition routes for the upcoming season.',
    ctaText: itinerariesPage?.ctaText || 'Get Early Access →',
    image: itinerariesPage?.image,
  };

  return (
    <main>
      <ScrollObserver />

      {/* 00. Launching Soon / Priority Boarding Pass Pop-up */}
      <LaunchPopup data={popup} />

      {/* 01. Hero Section */}
      <Hero data={hero} />

      {/* 02. Combined Premium Adventures Grid */}
      <AdventuresSection data={adventures} activities={featuredActivities} />

      {/* 03. Inspirational Package Editorials (Itineraries Waitlist) */}
      <ItinerariesWaitlist data={syncedItinerariesData} />

      {/* 04. Brand Manifesto / Intro (Our Mission) */}
      <MissionSection data={mission} isWide={true} />
    </main>
  );
}

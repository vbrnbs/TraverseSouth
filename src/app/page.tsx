import React from 'react';
import { Button } from '@/components/Button';
import { sanityClient, previewClient, urlFor } from '@/sanity/client';
import { homepageQuery } from '@/sanity/queries';
import { ScrollObserver } from '@/components/ScrollObserver';
import { TourBuilder } from '@/components/TourBuilder';
import { MuxBackgroundVideo } from '@/components/MuxBackgroundVideo';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { AccordionGallery } from '@/components/AccordionGallery';
import { ItinerariesWaitlist } from '@/components/ItinerariesWaitlist';

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

  const { hero, adventures, mission, featuredActivities, featuredItineraries, itinerariesSection, itinerariesPage } = data;

  // Sync and merge itineraries data (latest updated document wins, falling back to the other)
  const useLanding = !itinerariesPage?._updatedAt || (itinerariesSection?._updatedAt && itinerariesSection._updatedAt >= itinerariesPage._updatedAt);
  const primaryItin = useLanding ? itinerariesSection : itinerariesPage;
  const secondaryItin = useLanding ? itinerariesPage : itinerariesSection;

  const syncedItinerariesData = {
    eyebrow: primaryItin?.eyebrow || secondaryItin?.eyebrow || '// EXPEDITION BLUEPRINTS',
    title: primaryItin?.title || secondaryItin?.title || 'Multi-Day Sovereign Journeys',
    subtitle: primaryItin?.subtitle || primaryItin?.seoDescription || secondaryItin?.subtitle || secondaryItin?.seoDescription || 'Expertly curated narratives combining private aviation, elite guides, and ultra-luxe lodges. We are currently hand-selecting our founding expedition routes for the upcoming season.',
    ctaText: primaryItin?.ctaText || secondaryItin?.ctaText || 'Get Early Access →',
    image: primaryItin?.image || secondaryItin?.image,
  };

  return (
    <main>
      <ScrollObserver />

      {/* ═══════════════════════════════════════
          01. Hero Section
          ═══════════════════════════════════════ */}
      <section className="hero-section" id="hero">
        <div className="hero-overlay"></div>

        {/* Cinematic Background Video Frame */}
        <div className="hero-video-bg">
          <MuxBackgroundVideo
            playbackId={hero?.muxPlaybackId}
            fallbackUrl="https://assets.mixkit.co/videos/preview/mixkit-beautiful-aerial-view-of-snowy-mountains-42211-large.mp4"
          />
        </div>

        <div className="hero-content" style={{ paddingBottom: 'var(--spacing-xxl)' }}>
          <p className="typography-mono-eyebrow" style={{ marginBottom: '24px', color: 'var(--colors-brand)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
            {hero?.eyebrow || 'TRAVERSE SOUTH // SOUTHERN ALPS, NZ'}
          </p>
          <h1 className="typography-display-mega" style={{ maxWidth: '1200px', marginBottom: '32px', color: 'var(--colors-on-primary)' }}>
            {hero?.headline || 'Epic NZ Adventures. Zero Admin.'}
          </h1>
          <p className="typography-subtitle" style={{ maxWidth: '650px', color: 'var(--colors-ash)', marginBottom: '32px', lineHeight: '1.6' }}>
            {hero?.subtitle || 'We filter out the noise to connect you with New Zealand\'s elite operators. We handle the logistics, the premium lodgings, and the weather pivots—so you can experience the world\'s most remote wilderness with zero friction.'}
          </p>

          {/* Hormozi Risk Reversals */}
          {(() => {
            const badges = (hero?.riskReversals && hero.riskReversals.length > 0) 
              ? hero.riskReversals 
              : ["NZ's Best Operators Only", "100% Kiwi Operated", "Zero-Admin Weather Refunds"];
            
            return (
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '32px' }}>
                {badges.map((badge: string, i: number) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--colors-brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span style={{ color: 'var(--colors-ash)', fontSize: '13px', fontFamily: 'var(--font-ibm-plex-mono), monospace', textTransform: 'uppercase' }}>{badge}</span>
                  </div>
                ))}
              </div>
            );
          })()}

          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            <Button variant="brand" href="#adventures">{hero?.primaryCta || 'Explore Blueprints'}</Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          02. Combined Premium Adventures Grid (Activities)
          ═══════════════════════════════════════ */}
      <section id="adventures" className="marketing-section-dark" style={{ borderTop: '1px solid var(--colors-hairline-soft)' }}>
        <div className="container" id="modules">
          <p className="typography-mono-eyebrow" style={{ marginBottom: '24px', color: 'var(--colors-brand)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
            {adventures?.eyebrow || '// THE MANIFEST'}
          </p>
          <h2 className="typography-display-xl" style={{ marginBottom: '16px', color: '#fff' }}>
            {adventures?.heading || 'Premium Adventures Grid'}
          </h2>
          <p className="typography-subtitle" style={{ maxWidth: '600px', color: 'var(--colors-ash)' }}>
            {adventures?.subtitle || 'Surgical day modules filterable by gravity and wilderness intensity.'}
          </p>
        </div>
        
        {/* Full Bleed Scrolling Row */}
        <div style={{ '--layout-padding-left': 'max(var(--spacing-lg), calc((100% - 1640px) / 2 + var(--spacing-lg)))', width: '100%', paddingLeft: 'var(--layout-padding-left)', paddingRight: 'var(--spacing-lg)' } as React.CSSProperties}>
          <TourBuilder products={featuredActivities || []} viewAllCard={adventures?.viewAllCard} isScrollable={true} />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          03. Inspirational Package Editorials (Itineraries Waitlist)
          ═══════════════════════════════════════ */}
      <ItinerariesWaitlist data={syncedItinerariesData} />

      {/* ═══════════════════════════════════════
          04. Brand Manifesto / Intro (Our Mission)
          ═══════════════════════════════════════ */}
      <section id="mission" className="marketing-section-dark" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--colors-hairline-soft)', padding: 0 }}>

        {/* Partner Logos Marquee (At the very top, full width) */}
        {/* TEMPORARILY HIDDEN UNTIL OPERATOR LOGOS ARE ADDED
        <div style={{ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap', padding: '32px 0', borderBottom: '1px solid var(--colors-hairline-soft)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
          <div className="animate-marquee" style={{ display: 'flex', gap: '64px', alignItems: 'center' }}>
            {mission?.badges?.length > 0 ? (
              [...mission.badges, ...mission.badges, ...mission.badges, ...mission.badges, ...mission.badges, ...mission.badges].map((badge: any, i: number) => (
                <img
                  key={i}
                  src={urlFor(badge).url()}
                  alt={badge.alt || "Operator Logo"}
                  className="marquee-logo"
                />
              ))
            ) : (
              [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3].map((num, i) => (
                <img
                  key={i}
                  src={`/images/badge${num}.png`}
                  alt="Operator Logo"
                  className="marquee-logo"
                />
              ))
            )}
          </div>
        </div>
        */}

        {/* Centered Content Below */}
        <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', maxWidth: '1200px', padding: 'var(--spacing-section-lg) var(--spacing-lg)', textAlign: 'center' }}>

          <p className="typography-mono-eyebrow" style={{ marginBottom: '24px', color: 'var(--colors-brand)', textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '12px' }}>
            {mission?.eyebrow || '// OUR MISSION'}
          </p>

          <h2 className="typography-display-sm" style={{ color: '#fff', fontSize: '38px', marginBottom: '40px', letterSpacing: '-1.5px', lineHeight: '1.2', maxWidth: '800px' }}>
            {mission?.heading || 'Surgical Wilderness Manifests.'}
          </h2>

          {/* 1. Image Gallery Accordion */}
          <AccordionGallery images={mission?.imageGallery} />

          {/* Body Text */}
          <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            {mission?.bodyText ? (
              <div className="portable-text-content" style={{ color: 'var(--colors-ash)', lineHeight: '1.7', fontSize: '18px' }}>
                <PortableText value={mission.bodyText} />
              </div>
            ) : (
              <p className="typography-subtitle" style={{ color: 'var(--colors-ash)', lineHeight: '1.7', fontSize: '18px' }}>
                We do not believe in standard tourism; we believe in the surgical execution of untouched wilderness experiences. Traverse South decouples luxury travel from administrative delay.
              </p>
            )}
          </div>

        </div>
      </section>
    </main>
  );
}

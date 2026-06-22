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

  const { hero, mission, featuredActivities, featuredItineraries } = data;

  return (
    <main>
      <ScrollObserver />

      {/* ═══════════════════════════════════════
          01. Hero Section
          ═══════════════════════════════════════ */}
      <section className="hero-section" id="hero" style={{ height: 'calc(100vh - 72px)', minHeight: 'calc(100vh - 72px)', marginTop: '72px' }}>
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
            {hero?.eyebrow || 'TRAVERSE SOUTH // UNTRACKED SOUTHERN WILDERNESS FOR ADVENTURE SEEKERS'}
          </p>
          <h1 className="typography-display-mega" style={{ maxWidth: '1200px', marginBottom: '32px', color: 'var(--colors-on-primary)' }}>
            {hero?.headline || 'High-Altitude Surgical Insertions.'}
          </h1>
          <p className="typography-subtitle" style={{ maxWidth: '650px', color: 'var(--colors-ash)', marginBottom: '32px', lineHeight: '1.6' }}>
            {hero?.subtitle || 'Zero-friction private expeditions across New Zealand’s remote Southern Alps. We control the assets, the timeline, and the terrain.'}
          </p>

          {/* Hormozi Risk Reversals */}
          {hero?.riskReversals && hero.riskReversals.length > 0 && (
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '32px' }}>
              {hero.riskReversals.map((badge: string, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--colors-brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span style={{ color: 'var(--colors-ash)', fontSize: '13px', fontFamily: 'var(--font-ibm-plex-mono), monospace', textTransform: 'uppercase' }}>{badge}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            <Button variant="brand" href="#adventures">{hero?.primaryCta || 'Explore Blueprints'}</Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          02. Brand Manifesto / Intro
          ═══════════════════════════════════════ */}
      <section id="mission" className="marketing-section-dark" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--colors-hairline-soft)', padding: 0 }}>

        {/* Partner Logos Marquee (At the very top, full width) */}
        <div style={{ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap', padding: '32px 0', borderBottom: '1px solid var(--colors-hairline-soft)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
          <div className="animate-marquee" style={{ display: 'flex', gap: '64px', alignItems: 'center' }}>
            {/* Forcing display of new full-color local logos so user can preview them immediately */}
            {[1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3].map((num, i) => (
              <img
                key={i}
                src={`/images/badge${num}.png`}
                alt="Operator Logo"
                className="marquee-logo"
              />
            ))}
          </div>
        </div>

        {/* Centered Content Below */}
        <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', maxWidth: '1200px', padding: 'var(--spacing-section-lg) var(--spacing-lg)', textAlign: 'center' }}>

          <p className="typography-mono-eyebrow" style={{ marginBottom: '24px', color: 'var(--colors-brand)', textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '12px' }}>
            {mission?.eyebrow || '// OUR MISSION'}
          </p>

          <h2 className="typography-display-sm" style={{ color: '#fff', fontSize: '38px', marginBottom: '40px', letterSpacing: '-1.5px', lineHeight: '1.2', maxWidth: '800px' }}>
            {mission?.heading || 'Surgical Wilderness Manifests.'}
          </h2>

          {/* 1. Image Gallery Accordion */}
          <div className="accordion-gallery">
            {mission?.imageGallery?.length > 0 ? (
              mission.imageGallery.map((img: any, i: number) => (
                <div key={i} className="accordion-item" style={{ backgroundImage: `url(${urlFor(img).url()})` }}>
                  <div className="accordion-overlay">
                    <span className="accordion-text">{img.alt || `Sector 0${i + 1}`}</span>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="accordion-item" style={{ backgroundImage: 'url(/images/glacier_landing.png)' }}>
                  <div className="accordion-overlay"><span className="accordion-text">Alpine Insertions</span></div>
                </div>
                <div className="accordion-item" style={{ backgroundImage: 'url(/images/yacht_charter.png)' }}>
                  <div className="accordion-overlay"><span className="accordion-text">Marine Assets</span></div>
                </div>
                <div className="accordion-item" style={{ backgroundImage: 'url(/images/off_road.png)' }}>
                  <div className="accordion-overlay"><span className="accordion-text">Overland Traverse</span></div>
                </div>
                <div className="accordion-item" style={{ backgroundImage: 'url(/images/glacier_landing.png)' }}>
                  <div className="accordion-overlay"><span className="accordion-text">Remote Outposts</span></div>
                </div>
              </>
            )}
          </div>

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

      {/* ═══════════════════════════════════════
          03. Combined Premium Adventures Grid
          ═══════════════════════════════════════ */}
      <section id="adventures" className="marketing-section-dark" style={{ borderTop: '1px solid var(--colors-hairline-soft)' }}>
        <div className="container" id="modules">
          <p className="typography-mono-eyebrow" style={{ marginBottom: '24px', color: 'var(--colors-brand)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
            // THE MANIFEST
          </p>
          <h2 className="typography-display-xl" style={{ marginBottom: '16px', color: '#fff' }}>
            Premium Adventures Grid
          </h2>
          <p className="typography-subtitle" style={{ maxWidth: '600px', color: 'var(--colors-ash)', marginBottom: '32px' }}>
            Surgical day modules filterable by gravity and wilderness intensity.
          </p>

          <TourBuilder products={featuredActivities || []} />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          04. Inspirational Package Editorials
          ═══════════════════════════════════════ */}
      {featuredItineraries && featuredItineraries.length > 0 && (
        <section id="itineraries" className="marketing-section-dark" style={{ borderTop: '1px solid var(--colors-hairline-soft)' }}>
          <div className="container">
            <p className="typography-mono-eyebrow" style={{ marginBottom: '24px', color: 'var(--colors-brand)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              // INSPIRATIONAL BLUEPRINTS
            </p>
            <h2 className="typography-display-xl" style={{ marginBottom: '16px', color: '#fff' }}>
              Multi-Day Journeys
            </h2>
            <p className="typography-subtitle" style={{ maxWidth: '600px', color: 'var(--colors-ash)', marginBottom: '48px' }}>
              Expertly curated narratives combining private aviation, guides, and ultra-luxe lodges.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
                gap: 'var(--spacing-xl)',
                marginBottom: 'var(--spacing-section)'
              }}
            >
              {featuredItineraries.map((itinerary: any) => {
                const imageUrl = itinerary.image
                  ? urlFor(itinerary.image).url()
                  : (itinerary.activities?.[0]?.image
                    ? urlFor(itinerary.activities[0].image).url()
                    : '');
                return (
                  <Link
                    href={`/itinerary/${itinerary.slug?.current}`}
                    key={itinerary._id}
                    className="feature-card-dark"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '0',
                      overflow: 'hidden',
                      transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease',
                      backgroundColor: 'var(--colors-canvas-soft)',
                      border: '1px solid var(--colors-hairline-soft)',
                      borderRadius: 'var(--rounded-marketing)'
                    }}
                  >
                    {/* Oversized Image Frame */}
                    {imageUrl && (
                      <div
                        style={{
                          width: '100%',
                          height: '320px',
                          backgroundImage: `url(${imageUrl})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          borderBottom: '1px solid var(--colors-hairline-soft)'
                        }}
                      />
                    )}

                    {/* Content Block */}
                    <div style={{ padding: 'var(--spacing-xl)' }}>
                      <p
                        className="typography-mono-eyebrow"
                        style={{
                          color: 'var(--colors-brand)',
                          fontSize: '11px',
                          letterSpacing: '1.2px',
                          marginBottom: '12px',
                          textTransform: 'uppercase'
                        }}
                      >
                        {itinerary.eyebrow || 'MULTI-DAY EXPEDITION'}
                      </p>
                      <h3
                        className="typography-heading-md"
                        style={{
                          marginBottom: '12px',
                          fontWeight: 400,
                          color: '#fff',
                          fontSize: '26px',
                          letterSpacing: '-0.5px'
                        }}
                      >
                        {itinerary.title}
                      </h3>
                      <p
                        className="typography-body-sm"
                        style={{
                          color: 'var(--colors-ash)',
                          lineHeight: '1.6',
                          marginBottom: '24px'
                        }}
                      >
                        {itinerary.subtitle}
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #333', paddingTop: '16px' }}>
                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-ibm-plex-mono), monospace', color: 'var(--colors-mute)' }}>
                          COSTING: {itinerary.pricing?.priceString || 'Bespoke Package'}
                        </span>
                        <span style={{ color: 'var(--colors-brand)', fontSize: '13px', fontWeight: 500, fontFamily: 'var(--font-ibm-plex-mono), monospace' }}>
                          EXPLORE BLUEPRINT →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

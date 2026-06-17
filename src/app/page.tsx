import React from 'react';
import { Button } from '@/components/Button';
import { sanityClient, previewClient } from '@/sanity/client';
import { homepageQuery } from '@/sanity/queries';
import { ScrollObserver } from '@/components/ScrollObserver';
import { TourBuilder } from '@/components/TourBuilder';
import { draftMode } from 'next/headers';

// Configure dynamic pages to prerender at build time, but allow dynamic cache revalidation
export const revalidate = 60;

/* ═══════════════════════════════════════════════
   Server Component — fetches 100% dynamically from
   Sanity Studio at request/build time.
   ═══════════════════════════════════════════════ */

export default async function Home() {
  let data: any = null;
  const isDraft = (await draftMode()).isEnabled;
  const client = isDraft ? previewClient : sanityClient;

  try {
    data = await client.fetch(homepageQuery, {}, { next: { revalidate: isDraft ? 0 : 60 } });
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

  const { allProducts } = data;

  return (
    <main>
      <ScrollObserver />

      {/* ═══════════════════════════════════════
          01. Hero Section
          ═══════════════════════════════════════ */}
      <section className="hero-section" id="hero" style={{ minHeight: '92vh' }}>
        <div className="hero-overlay"></div>
        
        {/* Cinematic Background Video Frame */}
        <div className="hero-video-bg">
          <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 }}>
            <source src="https://assets.mixkit.co/videos/preview/mixkit-beautiful-aerial-view-of-snowy-mountains-42211-large.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="hero-content" style={{ paddingBottom: 'var(--spacing-xxl)' }}>
          <p className="typography-mono-eyebrow" style={{ marginBottom: '24px', color: 'var(--colors-brand)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
            TRAVERSE SOUTH // UNTRACKED SOUTHERN WILDERNESS FOR ADVENTURE SEEKERS
          </p>
          <h1 className="typography-display-mega" style={{ maxWidth: '1200px', marginBottom: '32px', color: 'var(--colors-on-primary)' }}>
            Traverse South — Elite Southern Blueprints.
          </h1>
          <p className="typography-subtitle" style={{ maxWidth: '650px', color: 'var(--colors-ash)', marginBottom: '40px', lineHeight: '1.6' }}>
            Frictionless, high-gravity expeditions engineered for those whose rarest asset is time. We compile private rotorcraft, marine charters, and elite mountain guides into uncompromised, surgical wilderness manifests.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Button variant="brand" href="#adventures">Explore Blueprints</Button>
            <Button variant="secondary-dark" href="#manifesto">Our Manifesto</Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          02. The Luxury Adventure Manifesto
          ═══════════════════════════════════════ */}
      <section id="manifesto" className="marketing-section-dark" style={{ borderTop: '1px solid var(--colors-hairline-soft)' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p className="typography-mono-eyebrow" style={{ marginBottom: '24px', color: 'var(--colors-brand)', textTransform: 'uppercase', letterSpacing: '1.5px', textAlign: 'center' }}>
            MANIFESTO
          </p>
          <h2 className="typography-display-sm" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto var(--spacing-xxl)', color: '#fff', fontSize: '38px' }}>
            Surgical Wilderness Manifests.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: 'var(--spacing-xl)' }}>
            <p className="typography-subtitle" style={{ color: 'var(--colors-on-primary)', lineHeight: '1.7', fontSize: '20px' }}>
              We do not believe in standard tourism; we believe in the surgical execution of untouched wilderness experiences. For those whose time is their most valuable currency, waiting on a traditional travel agent is a friction point. Traverse South decouples luxury travel from administrative delay, offering pre-qualified, logistically validated day modules that stack into the ultimate South Island itinerary.
            </p>
            <p className="typography-body" style={{ color: 'var(--colors-ash)', lineHeight: '1.7', fontSize: '16px' }}>
              Every blueprint is built on direct relationships with elite local operators. We coordinate AS350 turbine helicopters, 24-meter deep-fiord catamarans, restricted high-country Land Rover Defender convoys, and IFMGA-certified mountain guides. Each transit window and safety envelope is calculated to the minute, ensuring that your transition from high-alpine powder to ocean-level restoration is absolute.
            </p>
            <p className="typography-body" style={{ color: 'var(--colors-ash)', lineHeight: '1.7', fontSize: '16px' }}>
              Quiet luxury is defined by capability and speed. By bypassing middle-tier tour brokers, our portal connects your booking manifest directly into supplier operations. No placeholder itineraries. No standard schedules. Just pure, uncompromised gravity and wilderness.
            </p>
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
          
          <TourBuilder products={allProducts || []} />
        </div>
      </section>
    </main>
  );
}

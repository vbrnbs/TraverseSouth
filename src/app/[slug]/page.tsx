import React from 'react';
import { sanityClient, previewClient, urlFor } from '@/sanity/client';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { Metadata } from 'next';
import { PortableText } from '@portabletext/react';
import { TourBuilder } from '@/components/TourBuilder';
import { Button } from '@/components/Button';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const isDraft = (await draftMode()).isEnabled;
  const client = isDraft ? previewClient : sanityClient;

  const pageData = await client.fetch(
    `*[_type == "page" && slug.current == $slug][0] { title, seoDescription }`,
    { slug }
  );

  if (pageData) {
    return {
      title: `${pageData.title} | Traverse South`,
      description: pageData.seoDescription || '',
    };
  }

  // Capitalize slug for title fallback
  const fallbackTitle = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${fallbackTitle} | Traverse South`,
  };
}

const portableTextComponents = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="typography-display-sm" style={{ color: '#fff', marginTop: '40px', marginBottom: '20px', letterSpacing: '-1px' }}>
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="typography-heading-md" style={{ color: '#fff', marginTop: '36px', marginBottom: '16px', letterSpacing: '-0.5px' }}>
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="typography-heading-sm" style={{ color: '#fff', marginTop: '28px', marginBottom: '12px' }}>
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="typography-body" style={{ color: 'var(--colors-ash)', lineHeight: '1.8', marginBottom: '24px', fontSize: '16px' }}>
        {children}
      </p>
    )
  }
};

export default async function GenericDynamicPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Protect system routes
  const systemRoutes = ['studio', 'api', 'legal', 'itinerary', 'packages'];
  if (systemRoutes.includes(slug)) {
    notFound();
  }

  const isDraft = (await draftMode()).isEnabled;
  const client = isDraft ? previewClient : sanityClient;

  // 1. Fetch page data from Sanity
  const pageData = await client.fetch(
    `*[_type == "page" && slug.current == $slug][0] {
      title,
      body,
      seoDescription
    }`,
    { slug }
  );

  // 2. Fetch listings in case of itineraries/trips lists
  let allItineraries = [];
  let allProducts = [];

  if (slug === 'itineraries') {
    allItineraries = await client.fetch(
      `*[_type == "itinerary"] {
        _id,
        title,
        slug,
        eyebrow,
        subtitle,
        image,
        pricing,
        activities[]-> {
          image
        }
      }`
    );
  } else if (slug === 'trips') {
    allProducts = await client.fetch(
      `*[_type == "activity"] {
        _id,
        title,
        slug,
        eyebrow,
        subtitle,
        description,
        adventureLevel,
        ctaText,
        image,
        pricing,
        region
      }`
    );
  }

  // Fallback title and descriptions if Sanity content doesn't exist
  const title = pageData?.title || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const body = pageData?.body;

  return (
    <main style={{ backgroundColor: '#0b0b0b', color: '#b9b9b9', minHeight: '100vh', paddingTop: '120px', paddingBottom: '96px' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
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
            ← Return to home
          </Link>
        </div>

        {/* Header Block */}
        <div style={{ borderBottom: '1px solid var(--colors-hairline-soft)', paddingBottom: '32px', marginBottom: '56px' }}>
          <p className="typography-mono-eyebrow" style={{ color: 'var(--colors-mute)', marginBottom: '16px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            // {slug.replace('-', ' ')} manifest
          </p>
          <h1 className="typography-display-md" style={{ color: '#fff', marginBottom: '24px', lineHeight: '1.1', letterSpacing: '-2.0px' }}>
            {title}
          </h1>
          {pageData?.seoDescription && (
            <p className="typography-subtitle" style={{ color: 'var(--colors-ash)', maxWidth: '800px', fontSize: '18px', lineHeight: 1.6 }}>
              {pageData.seoDescription}
            </p>
          )}
        </div>

        {/* Main Body (Portable Text or default fallback) */}
        <div style={{ maxWidth: '800px', margin: '0 auto 64px auto' }}>
          {body ? (
            <PortableText value={body} components={portableTextComponents} />
          ) : (
            // Default structural placeholders if page body is not seeded
            <div style={{ marginBottom: '40px' }}>
              {slug === 'about-us' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <p className="typography-body" style={{ lineHeight: '1.8' }}>
                    Traverse South was founded in Queenstown with a singular vision: to remove the friction from luxury wilderness travel. We represent a collective of the South Island’s most elite guides, aviation specialists, and marine operators.
                  </p>
                  <p className="typography-body" style={{ lineHeight: '1.8' }}>
                    Instead of standard schedules and tour packages, we compile custom, real-time logistics manifests that allow our guests to move seamlessly between alpine glacier fields and deep-fjord private charters.
                  </p>
                </div>
              )}

              {slug === 'stories' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <p className="typography-body" style={{ lineHeight: '1.8' }}>
                    Read logs, weather snapshots, and route annotations from our recent South Island expeditions.
                  </p>
                  <div style={{ padding: '32px', backgroundColor: 'var(--colors-canvas-soft)', borderRadius: '12px', border: '1px solid var(--colors-hairline-soft)' }}>
                    <span style={{ color: 'var(--colors-brand)', fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: '11px', display: 'block', marginBottom: '8px' }}>LOG #42 // FIORDLAND SOVEREIGN</span>
                    <h3 style={{ color: '#fff', fontSize: '20px', marginBottom: '12px' }}>Deep Fjord Silence</h3>
                    <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                      Rotor insertion at Deep Cove. Landed directly on the heli-pad of the 24m Catamaran. Navigated to Hall Arm under absolute silence. Spotting dolphin pods and seal colonies. Private chef prepared local wild-caught blue cod and geothermal lobster.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Dynamic Lists & Forms based on Slugs */}

        {/* ─── Itineraries Page List ─── */}
        {slug === 'itineraries' && allItineraries.length > 0 && (
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))', 
              gap: 'var(--spacing-xl)',
            }}
          >
            {allItineraries.map((itinerary: any) => {
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
                    backgroundColor: 'var(--colors-canvas-soft)',
                    border: '1px solid var(--colors-hairline-soft)',
                    borderRadius: 'var(--rounded-marketing)'
                  }}
                >
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
                  <div style={{ padding: 'var(--spacing-xl)' }}>
                    <p className="typography-mono-eyebrow" style={{ color: 'var(--colors-brand)', fontSize: '11px', letterSpacing: '1.2px', marginBottom: '12px', textTransform: 'uppercase' }}>
                      {itinerary.eyebrow || 'MULTI-DAY EXPEDITION'}
                    </p>
                    <h3 className="typography-heading-md" style={{ marginBottom: '12px', fontWeight: 400, color: '#fff', fontSize: '26px', letterSpacing: '-0.5px' }}>
                      {itinerary.title}
                    </h3>
                    <p className="typography-body-sm" style={{ color: 'var(--colors-ash)', lineHeight: '1.6', marginBottom: '24px' }}>
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
        )}

        {/* ─── Trips / Activities Page List ─── */}
        {slug === 'trips' && allProducts.length > 0 && (
          <TourBuilder products={allProducts} />
        )}

        {/* ─── Tailor Made Trips / Contact Form ─── */}
        {slug === 'tailor-made' && (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <form 
              style={{
                backgroundColor: 'var(--colors-canvas-soft)',
                border: '1px solid var(--colors-hairline-soft)',
                padding: '40px',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}
            >
              <h2 className="typography-mono-caps" style={{ color: 'var(--colors-brand)', fontSize: '12px', letterSpacing: '1px', marginBottom: '8px' }}>
                // INITIALIZE TRIP COMPILER
              </h2>
              
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--colors-mute)', marginBottom: '8px', fontFamily: 'var(--font-ibm-plex-mono), monospace' }}>FULL NAME</label>
                <input 
                  type="text" 
                  required 
                  style={{ width: '100%', padding: '12px', backgroundColor: '#000', border: '1px solid var(--colors-hairline-soft)', color: '#fff', borderRadius: '4px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--colors-mute)', marginBottom: '8px', fontFamily: 'var(--font-ibm-plex-mono), monospace' }}>EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  required 
                  style={{ width: '100%', padding: '12px', backgroundColor: '#000', border: '1px solid var(--colors-hairline-soft)', color: '#fff', borderRadius: '4px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--colors-mute)', marginBottom: '8px', fontFamily: 'var(--font-ibm-plex-mono), monospace' }}>TARGET EXPEDITION WINDOW</label>
                <input 
                  type="text" 
                  placeholder="e.g. Feb 2027"
                  style={{ width: '100%', padding: '12px', backgroundColor: '#000', border: '1px solid var(--colors-hairline-soft)', color: '#fff', borderRadius: '4px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--colors-mute)', marginBottom: '8px', fontFamily: 'var(--font-ibm-plex-mono), monospace' }}>ADVENTURE INTENSITY LEVEL</label>
                <select 
                  style={{ width: '100%', padding: '12px', backgroundColor: '#000', border: '1px solid var(--colors-hairline-soft)', color: '#fff', borderRadius: '4px', outline: 'none' }}
                >
                  <option value="1">Level 1 // Restorative Wilderness</option>
                  <option value="2">Level 2 // Active Alpine</option>
                  <option value="3">Level 3 // High Gravity Elite</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--colors-mute)', marginBottom: '8px', fontFamily: 'var(--font-ibm-plex-mono), monospace' }}>EXPEDITION DETAILS & PREFERENCES</label>
                <textarea 
                  rows={5}
                  placeholder="Describe your desired route, heli preferences, or vessel requirements..."
                  style={{ width: '100%', padding: '12px', backgroundColor: '#000', border: '1px solid var(--colors-hairline-soft)', color: '#fff', borderRadius: '4px', outline: 'none', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ marginTop: '12px' }}>
                <Button variant="brand" type="submit" style={{ width: '100%', height: '48px', fontWeight: 600 }}>
                  Submit Manifest Inquiry →
                </Button>
              </div>
            </form>
          </div>
        )}

      </div>
    </main>
  );
}

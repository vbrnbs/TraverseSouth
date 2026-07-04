import React from 'react';
import { sanityClient, previewClient, urlFor } from '@/sanity/client';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { Metadata } from 'next';
import { PortableText } from '@portabletext/react';
import { TourBuilder } from '@/components/TourBuilder';
import { Button } from '@/components/Button';
import { ItinerariesWaitlist } from '@/components/ItinerariesWaitlist';
import { EmailInquiry } from '@/components/EmailInquiry';
import { AccordionGallery } from '@/components/AccordionGallery';

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
      seoDescription,
      image,
      eyebrow,
      subtitle,
      ctaText,
      _updatedAt
    }`,
    { slug }
  );

  // 2. Fetch listings/data based on slug
  let allProducts = [];
  let mission = null;
  let syncedItinerariesData = null;

  if (slug === 'trips' || slug === 'adventures') {
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
  } else if (slug === 'about-us') {
    mission = await client.fetch(
      `*[_type == "mission"][0] {
        eyebrow,
        heading,
        bodyText,
        imageGallery
      }`
    );
  } else if (slug === 'itineraries') {
    const landingSection = await client.fetch(`*[_type == "landing"][0].itinerariesSection { ..., "_updatedAt": ^._updatedAt }`);
    const useLanding = !pageData?._updatedAt || (landingSection?._updatedAt && landingSection._updatedAt >= pageData._updatedAt);
    const primaryItin = useLanding ? landingSection : pageData;
    const secondaryItin = useLanding ? pageData : landingSection;

    syncedItinerariesData = {
      eyebrow: primaryItin?.eyebrow || secondaryItin?.eyebrow || '// EXPEDITION BLUEPRINTS',
      title: primaryItin?.title || secondaryItin?.title || 'Multi-Day Sovereign Journeys',
      subtitle: primaryItin?.subtitle || primaryItin?.seoDescription || secondaryItin?.subtitle || secondaryItin?.seoDescription || 'Expertly curated narratives combining private aviation, elite guides, and ultra-luxe lodges. We are currently hand-selecting our founding expedition routes for the upcoming season.',
      ctaText: primaryItin?.ctaText || secondaryItin?.ctaText || 'Get Early Access →',
      image: primaryItin?.image || secondaryItin?.image,
    };
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

        {/* Main Body (Portable Text & Image if seeded and NOT replaced by custom layout) */}
        {slug !== 'itineraries' && slug !== 'tailor-made' && slug !== 'group-business' && (
          <div style={{ maxWidth: '800px', margin: '0 auto 64px auto' }}>
            {pageData?.image && (
              <div style={{ marginBottom: '48px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--colors-hairline-soft)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                <img
                  src={urlFor(pageData.image).width(1200).url()}
                  alt={pageData.image.alt || pageData.title || 'Traverse South'}
                  style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '550px', objectFit: 'cover' }}
                />
              </div>
            )}
            {body ? (
              <PortableText value={body} components={portableTextComponents} />
            ) : (
              <div style={{ marginBottom: '40px' }}>
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
        )}

        {/* ─── Dynamic Specialized Page Content based on Slugs ─── */}

        {/* 1. Adventures & Trips Page List */}
        {(slug === 'trips' || slug === 'adventures') && allProducts.length > 0 && (
          <TourBuilder products={allProducts} />
        )}

        {/* 2. Itineraries Page (Waitlist) */}
        {slug === 'itineraries' && (
          <div style={{ margin: '0 -24px' }}>
            <ItinerariesWaitlist data={syncedItinerariesData || pageData} />
          </div>
        )}

        {/* 3. Tailor Made Trips */}
        {slug === 'tailor-made' && (
          <EmailInquiry variant="tailor-made" defaultSubject="Tailor-Made Trip Inquiry" />
        )}

        {/* 4. Group & Business Trips */}
        {slug === 'group-business' && (
          <EmailInquiry variant="group-business" defaultSubject="Group & Business Trip Inquiry" />
        )}
      </div>
    </main>
  );
}

import React from 'react';
import { sanityClient, previewClient, urlFor } from '@/sanity/client';
import { notFound } from 'next/navigation';
import { packagesData } from '@/data/packagesData';
import { Button } from '@/components/Button';
import { BookingPanel } from '@/components/BookingPanel';
import { getShopifyProductByHandle } from '@/shopify/client';
import { draftMode } from 'next/headers';

// Configure dynamic pages to prerender at build time, but allow dynamic cache revalidation
export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const isDraft = (await draftMode()).isEnabled;
  const client = isDraft ? previewClient : sanityClient;
  
  // 1. Check if slug exists in our detailed copy dataset
  const detail = packagesData[slug];
  if (!detail) {
    notFound();
  }

  // 2. Fetch category document dynamically from Sanity
  let category: any = null;
  try {
    category = await client.fetch(
      `*[_type == "category" && (_id == $slug || _id == "category-" + $slug)][0] {
        eyebrow,
        title,
        description,
        ctaText,
        imageCaption,
        image,
        modules,
        subtitle,
        days[] {
          dayNumber,
          title,
          description,
          logistics
        },
        suppliers[] {
          label,
          name,
          credential
        },
        pricing {
          priceString,
          minimumGroup,
          inclusions
        }
      }`,
      { slug }
    );
  } catch (error) {
    console.error('Error fetching package category from Sanity:', error);
  }

  // Resolve fallbacks in case Sanity dataset hasn't updated or is offline
  const displayTitle = category?.title || detail.title;
  const displayEyebrow = category?.eyebrow || `0${slug === 'fiordland' ? '1' : slug === 'qt-mtcook' ? '2' : '3'} // DEEP EXPEDITIONS`;
  const displayOverview = category?.description || detail.overview;
  const displayBgImage = category?.image ? urlFor(category.image).url() : '';
  const displayCaption = category?.subtitle || category?.imageCaption || detail.subtitle;
  const displayDays = category?.days || detail.days;
  const displaySuppliers = category?.suppliers || detail.suppliers;
  const displayMinGroup = category?.pricing?.minimumGroup || detail.pricing.minimumGroup;
  const displayInclusions = category?.pricing?.inclusions || detail.pricing.inclusions;
  const displayCtaText = category?.ctaText || detail.ctaText || 'Book Private Expedition';


  // 3. Fetch live details from Shopify with silent credentials/offline fallbacks
  let shopifyProduct = null;
  try {
    shopifyProduct = await getShopifyProductByHandle(slug);
  } catch (error) {
    console.error('Error fetching package from Shopify:', error);
  }

  let variantId: string | null = null;
  let livePriceString = detail.pricing.priceString;
  let availableForSale = true;

  if (shopifyProduct) {
    const variantNode = shopifyProduct.variants.edges[0]?.node;
    if (variantNode) {
      variantId = variantNode.id;
      availableForSale = variantNode.availableForSale;
      if (variantNode.price?.amount) {
        const amt = parseFloat(variantNode.price.amount);
        const currency = variantNode.price.currencyCode || 'NZD';
        livePriceString = `$${amt.toLocaleString()} ${currency} / person`;
      }
    }
  }

  return (

    <main style={{ backgroundColor: '#0b0b0b', color: '#fff', minHeight: '100vh' }}>
      
      {/* ═══════════════════════════════════════
          Bespoke Style Rules (Scoped)
          ═══════════════════════════════════════ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .package-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          padding: 0 var(--spacing-lg);
          background-color: rgba(11, 11, 11, 0.95);
          backdrop-filter: blur(8px);
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid var(--colors-hairline-soft);
        }
        .package-hero {
          position: relative;
          min-height: 70vh;
          display: flex;
          align-items: flex-end;
          padding: var(--spacing-xxl) var(--spacing-lg);
          background-size: cover;
          background-position: center;
          overflow: hidden;
        }
        .package-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            #0b0b0b 0%,
            rgba(11, 11, 11, 0.5) 50%,
            rgba(11, 11, 11, 0.3) 100%
          );
          z-index: 1;
        }
        .package-hero-content {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        .detail-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: var(--spacing-xxl);
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--spacing-section-lg) var(--spacing-lg);
        }
        .timeline-day {
          border-left: 1px solid var(--colors-brand);
          padding-left: var(--spacing-xl);
          position: relative;
          margin-bottom: var(--spacing-xxl);
        }
        .timeline-day::before {
          content: "";
          position: absolute;
          left: -6px;
          top: 8px;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background-color: var(--colors-brand);
        }
        .day-badge {
          font-family: var(--font-ibm-plex-mono), monospace;
          color: var(--colors-brand);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: var(--spacing-xs);
        }
        .day-title {
          font-size: 28px;
          font-weight: 500;
          letter-spacing: -0.8px;
          margin-bottom: var(--spacing-md);
        }
        .day-description {
          font-size: 16px;
          line-height: 1.7;
          color: var(--colors-ash);
          margin-bottom: var(--spacing-md);
        }
        .day-logistics {
          font-family: var(--font-ibm-plex-mono), monospace;
          font-size: 12px;
          color: var(--colors-mute);
          background-color: rgba(255, 255, 255, 0.03);
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--rounded-app-md);
          border: 1px solid var(--colors-hairline-soft);
        }
        .pricing-panel {
          background-color: #fff;
          color: #0b0b0b;
          padding: var(--spacing-xl);
          border-radius: var(--rounded-marketing);
          position: sticky;
          top: 96px;
          height: fit-content;
          border: 1px solid var(--colors-hairline);
        }
        .pricing-value {
          font-size: 32px;
          font-weight: 600;
          letter-spacing: -1px;
          margin-top: var(--spacing-xs);
          margin-bottom: var(--spacing-xs);
        }
        .supplier-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-lg);
          margin-top: var(--spacing-xxl);
          border-top: 1px solid var(--colors-hairline-soft);
          padding-top: var(--spacing-xxl);
        }
        .supplier-card {
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--colors-hairline-soft);
          padding: var(--spacing-md);
          border-radius: var(--rounded-app-lg);
        }
        .supplier-label {
          font-family: var(--font-ibm-plex-mono), monospace;
          font-size: 11px;
          color: var(--colors-mute);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: var(--spacing-xs);
        }
        .supplier-name {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: var(--spacing-xs);
        }
        .supplier-credential {
          font-size: 12px;
          color: var(--colors-ash);
        }
        @media (max-width: 960px) {
          .detail-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-xl);
          }
          .supplier-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-md);
          }
          .pricing-panel {
            position: relative;
            top: 0;
          }
        }
      ` }} />

      {/* ═══════════════════════════════════════
          01. Navigation Header
          ═══════════════════════════════════════ */}
      <header className="package-nav">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="brand-dot"></div>
          <span className="typography-heading-md" style={{ fontWeight: 500, letterSpacing: '-0.32px', fontSize: '20px' }}>Traverse South</span>
        </div>
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center' }}>
          <a href="/" className="nav-link">Home</a>
          <a href="/#modules" className="nav-link">Expeditions</a>
          <a href="/#engine" className="nav-link">Experience Engine</a>
        </div>
        <div>
          <Button variant="secondary-dark" href="/#engine">Design Journey</Button>
        </div>
      </header>

      {/* ═══════════════════════════════════════
          02. Atmospheric Hero
          ═══════════════════════════════════════ */}
      <section 
        className="package-hero"
        style={{
          backgroundImage: `url(${displayBgImage || '/images/alpine_lodge.png'})`
        }}
      >
        <div className="package-hero-overlay"></div>
        <div className="package-hero-content">
          <p className="typography-mono-eyebrow" style={{ color: 'var(--colors-brand)', marginBottom: '16px' }}>
            {displayEyebrow}
          </p>
          <h1 className="typography-display-xl" style={{ marginBottom: '24px', letterSpacing: '-2px' }}>
            {displayTitle}
          </h1>
          <p className="typography-subtitle" style={{ maxWidth: '600px', color: 'var(--colors-ash)', fontSize: '18px', lineHeight: 1.6 }}>
            {displayCaption}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          03. Detailed Layout Section
          ═══════════════════════════════════════ */}
      <section style={{ backgroundColor: '#0b0b0b' }}>
        <div className="detail-grid">
          
          {/* Column A: Overview & Visual Timeline */}
          <div>
            <p className="typography-mono-eyebrow" style={{ marginBottom: '16px', color: 'var(--colors-mute)' }}>
              // EXPEDITION CHARTER OVERVIEW
            </p>
            <p style={{ fontSize: '20px', lineHeight: 1.7, color: 'var(--colors-ash)', marginBottom: 'var(--spacing-xxl)', letterSpacing: '-0.2px' }}>
              {displayOverview}
            </p>

            <p className="typography-mono-eyebrow" style={{ marginBottom: 'var(--spacing-xl)', color: 'var(--colors-mute)' }}>
              // DAY-BY-DAY VISUAL TIMELINE
            </p>
            <div>
              {displayDays.map((day: any) => (
                <div className="timeline-day" key={day.dayNumber}>
                  <div className="day-badge">{day.dayNumber}</div>
                  <h3 className="day-title">{day.title}</h3>
                  <p className="day-description">{day.description}</p>
                  <div className="day-logistics">
                    <strong>LOGISTICAL ENVELOPE:</strong> {day.logistics}
                  </div>
                </div>
              ))}
            </div>

            {/* Exclusive Supplier Access Networks */}
            <div className="supplier-grid">
              <div style={{ gridColumn: '1 / -1', marginBottom: 'var(--spacing-md)' }}>
                <p className="typography-mono-eyebrow" style={{ color: 'var(--colors-mute)' }}>
                  // SUPPLIER DECOUPLING & CERTIFICATIONS
                </p>
                <h4 style={{ fontSize: '20px', fontWeight: 500, marginTop: '8px', color: '#fff' }}>
                  Our Exclusive Operator Access network
                </h4>
              </div>
              {displaySuppliers.map((sup: any) => (
                <div className="supplier-card" key={sup.name}>
                  <div className="supplier-label">{sup.label}</div>
                  <div className="supplier-name">{sup.name}</div>
                  <div className="supplier-credential">{sup.credential}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Column B: Pricing & Inclusions Panel */}
          <div>
            <BookingPanel
              slug={slug}
              priceString={livePriceString}
              minimumGroup={displayMinGroup}
              inclusions={displayInclusions}
              variantId={variantId}
              availableForSale={availableForSale}
              buttonText={displayCtaText}
            />
          </div>



        </div>
      </section>

      {/* ═══════════════════════════════════════
          04. Footer Section
          ═══════════════════════════════════════ */}
      <footer className="footer" style={{ borderTop: '1px solid var(--colors-hairline-soft)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="footer-bottom">
            <p className="typography-caption" style={{ color: 'var(--colors-mute)' }}>© 2026 Traverse South. All rights reserved.</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="brand-dot"></div>
              <span style={{ fontWeight: 500, letterSpacing: '-0.32px', fontSize: '16px' }}>Traverse South</span>
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}

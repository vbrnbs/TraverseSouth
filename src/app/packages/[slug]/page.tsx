import React from 'react';
import { sanityClient, previewClient, urlFor } from '@/sanity/client';
import { notFound } from 'next/navigation';
import { packagesData } from '@/data/packagesData';
import { BookingPanel } from '@/components/BookingPanel';
import { PackageHero } from '@/components/PackageHero';
import { PackageTimeline } from '@/components/PackageTimeline';
import { PackageSuppliers } from '@/components/PackageSuppliers';
import { getShopifyProductByHandle } from '@/shopify/client';
import { draftMode } from 'next/headers';
import { packageDetailQuery } from '@/sanity/queries';

// Configure dynamic pages to prerender at build time, but allow dynamic cache revalidation
export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const isDraft = (await draftMode()).isEnabled;
  const client = isDraft ? previewClient : sanityClient;
  
  // 1. Fetch content document dynamically from Sanity (supports both old packages and new products)
  let contentData: any = null;
  try {
    contentData = await client.fetch(
      packageDetailQuery,
      { slug },
      { cache: isDraft ? 'no-store' : 'force-cache' }
    );
  } catch (error) {
    console.error('Error fetching content from Sanity:', error);
  }

  // 2. Fallback to hardcoded dataset if Sanity fails or doc doesn't exist
  const detail = packagesData[slug];
  if (!contentData && !detail) {
    notFound();
  }

  // Resolve fallbacks in case Sanity dataset hasn't updated or is offline
  const displayTitle = contentData?.title || detail?.title;
  const displayEyebrow = contentData?.eyebrow || `01 // EXPEDITIONS`;
  const displayOverview = contentData?.description || detail?.overview;
  const displayBgImage = contentData?.image ? urlFor(contentData.image).url() : '';
  const displayCaption = contentData?.subtitle || contentData?.imageCaption || detail?.subtitle;
  const displayDays = contentData?.days || detail?.days || [];
  const displaySuppliers = contentData?.suppliers || detail?.suppliers || [];
  const displayMinGroup = contentData?.pricing?.minimumGroup || detail?.pricing?.minimumGroup;
  const displayInclusions = (contentData?.adventureHighlights && contentData.adventureHighlights.length > 0)
    ? contentData.adventureHighlights
    : (contentData?.pricing?.inclusions || detail?.pricing?.inclusions || []);
  const displayCtaText = contentData?.ctaText || detail?.ctaText || 'Book Now';

  // 3. Fetch live details from Shopify with silent credentials/offline fallbacks
  let shopifyProduct = null;
  try {
    shopifyProduct = await getShopifyProductByHandle(slug);
  } catch (error) {
    console.error('Error fetching package from Shopify:', error);
  }

  let variantId: string | null = null;
  let livePriceString = contentData?.pricing?.priceString || detail?.pricing?.priceString || '$1,000 NZD / person';
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
      {/* 01. Atmospheric Hero */}
      <PackageHero
        eyebrow={displayEyebrow}
        title={displayTitle}
        caption={displayCaption}
        bgImage={displayBgImage}
      />

      {/* 02. Detailed Layout Section */}
      <section style={{ backgroundColor: '#0b0b0b' }}>
        <div className="detail-grid">
          {/* Column A: Overview, Timeline & Exclusive Supplier Access */}
          <div>
            <PackageTimeline overview={displayOverview} days={displayDays} />
            <PackageSuppliers suppliers={displaySuppliers} />
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
    </main>
  );
}

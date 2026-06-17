import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Legal Portal & Regulatory Disclosures | Traverse South',
  description: 'Terms of Service, Privacy Policy, and Operational Bio for Traverse South.',
};

export default function LegalPage() {
  return (
    <main style={{ backgroundColor: '#0b0b0b', color: '#b9b9b9', minHeight: '100vh', padding: 'var(--spacing-section-lg) 0' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '48px' }}>
          <Link href="/" style={{
            fontFamily: 'var(--font-ibm-plex-mono), monospace',
            fontSize: '13px',
            color: 'var(--colors-brand)',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            ← Return to manifests
          </Link>
        </div>

        {/* Header Block */}
        <div style={{ borderBottom: '1px solid var(--colors-hairline-soft)', paddingBottom: '32px', marginBottom: '48px' }}>
          <p className="typography-mono-eyebrow" style={{ color: 'var(--colors-mute)', marginBottom: '16px', letterSpacing: '1px' }}>
            // REGULATORY DISCLOSURES
          </p>
          <h1 className="typography-display-sm" style={{ color: '#fff', marginBottom: '16px', fontSize: '38px', letterSpacing: '-1.3px' }}>
            Legal & Terms Portal
          </h1>
          <p className="typography-caption" style={{ color: 'var(--colors-mute)' }}>
            Last updated: June 2026
          </p>
        </div>

        {/* Content Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {/* Section 1: Operational Bio */}
          <section>
            <h2 className="typography-mono-caps" style={{ color: '#fff', fontSize: '11px', letterSpacing: '1px', marginBottom: '20px' }}>
              01. OPERATIONAL DECLARATION & BIO
            </h2>
            <p className="typography-body" style={{ lineHeight: '1.7', color: 'var(--colors-ash)' }}>
              Traverse South acts as an elite coordinating agent and logistics compiler for certified local aviation, marine, and guiding suppliers. We do not operate aircraft or watercraft directly. All transport is executed by CAA Part 135 aviation licensees and Maritime NZ surveyed vessel operators.
            </p>
          </section>

          {/* Section 2: Terms of Service */}
          <section style={{ borderTop: '1px solid #222', paddingTop: '40px' }}>
            <h2 className="typography-mono-caps" style={{ color: '#fff', fontSize: '11px', letterSpacing: '1px', marginBottom: '20px' }}>
              02. EXPEDITION TERMS & CONDITIONS
            </h2>
            <p className="typography-body" style={{ lineHeight: '1.7', color: 'var(--colors-ash)' }}>
              All bookings are subject to the weather-safety, weight-limit, and operational cancellation policies of our supplier partners. Helicopter flights are subject to pilot discretion. Cancellations due to weather will result in dynamic rescheduling or full refunding of the affected module.
            </p>
          </section>

          {/* Section 3: Privacy Policy */}
          <section style={{ borderTop: '1px solid #222', paddingTop: '40px' }}>
            <h2 className="typography-mono-caps" style={{ color: '#fff', fontSize: '11px', letterSpacing: '1px', marginBottom: '20px' }}>
              03. PRIVACY & DATA MANIFEST
            </h2>
            <p className="typography-body" style={{ lineHeight: '1.7', color: 'var(--colors-ash)' }}>
              Customer contact and manifest details collected at checkout are processed securely via Stripe/Shopify vaults and shared exclusively with the designated supplier to fulfill safety logs, aviation manifests, and custom gear sizing.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

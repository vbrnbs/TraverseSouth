'use client';

import React from 'react';
import { urlFor } from '@/sanity/client';
import { PackageSelectButton } from '@/components/EmailInquiry';

export function CorporatePackages({ data }: { data?: any }) {
  if (!data || !data.packagesList || !Array.isArray(data.packagesList) || data.packagesList.length === 0) {
    return null;
  }
  const packages = data;

  return (
    <section id="packages" className="marketing-section-light" style={{ padding: '96px 0' }}>
      <div className="container" style={{ maxWidth: '1440px' }}>
        <div style={{ marginBottom: '64px', maxWidth: '1200px' }}>
          {packages.eyebrow && (
            <p className="typography-mono-eyebrow" style={{ color: 'var(--colors-brand)', marginBottom: '12px', letterSpacing: '1px' }}>
              {packages.eyebrow}
            </p>
          )}
          <h2 className="typography-display-md" style={{ color: 'var(--colors-ink)', letterSpacing: '-1.68px', lineHeight: '1.1', marginBottom: '16px' }}>
            {packages.heading}
          </h2>
          {packages.description && (
            <p className="typography-body" style={{ color: 'var(--colors-slate-soft)', fontSize: '17px', lineHeight: 1.6, whiteSpace: 'pre-line', maxWidth: '840px' }}>
              {packages.description}
            </p>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px', alignItems: 'stretch' }}>
          {(packages.packagesList || []).map((pkg: any, idx: number) => {
            const isHighlighted = Boolean(pkg.isFeaturedDarkTheme);
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: isHighlighted ? '#f36458' : 'var(--colors-canvas-light)',
                  color: isHighlighted ? '#fff' : 'var(--colors-ink)',
                  borderRadius: 'var(--rounded-marketing)',
                  border: isHighlighted ? '2px solid #f36458' : '1px solid var(--colors-hairline)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: isHighlighted ? '0 0 36px rgba(243, 100, 88, 0.28), 0 20px 48px rgba(0,0,0,0.18)' : '0 4px 24px rgba(0,0,0,0.06)',
                  overflow: 'hidden'
                }}
              >
                <div>
                  {/* Top Section: Clean 240px Image Banner without obstructing overlays */}
                  <div style={{ position: 'relative', height: '240px', width: '100%', overflow: 'hidden' }}>
                    {pkg.headerImage ? (
                      <img
                        src={urlFor(pkg.headerImage).url()}
                        alt={pkg.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', backgroundColor: isHighlighted ? '#c2483d' : '#e8e8e8' }} />
                    )}
                  </div>

                  {/* Middle Section: Card Content inside Solid Coral-Red Block */}
                  <div style={{ padding: '36px', backgroundColor: isHighlighted ? '#f36458' : 'transparent' }}>
                    {pkg.tierEyebrow && (
                      <p className="typography-mono-caps" style={{ color: isHighlighted ? '#fff' : 'var(--colors-brand)', marginBottom: '12px', letterSpacing: '1px', fontWeight: 600, opacity: isHighlighted ? 0.95 : 1 }}>
                        {pkg.tierEyebrow}
                      </p>
                    )}
                    <h3 className="typography-heading-md" style={{ color: isHighlighted ? '#fff' : 'var(--colors-ink)', marginBottom: '16px' }}>
                      {pkg.title}
                    </h3>
                    {pkg.description && (
                      <p className="typography-body" style={{ color: isHighlighted ? 'rgba(255,255,255,0.92)' : 'var(--colors-slate-soft)', minHeight: '60px', marginBottom: '32px', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                        {pkg.description}
                      </p>
                    )}

                    <PackageSelectButton
                      packageName={pkg.packageId || pkg.title}
                      label={pkg.buttonLabel || `Select ${pkg.title} →`}
                      className={isHighlighted ? 'button button-primary' : 'button button-primary-on-light'}
                      style={{
                        width: '100%',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        justifyContent: 'center',
                        ...(isHighlighted
                          ? { backgroundColor: '#141414', borderColor: '#141414', color: '#fff', fontWeight: 600, boxShadow: '0 8px 24px rgba(0,0,0,0.35)' }
                          : {})
                      }}
                    />
                  </div>

                  {/* Bottom Section: Structural Inclusions inside Solid Obsidian Black Block */}
                  <div style={{ borderTop: `1px solid ${isHighlighted ? 'rgba(255,255,255,0.2)' : 'var(--colors-hairline)'}`, padding: '36px', backgroundColor: isHighlighted ? '#141414' : 'var(--colors-canvas-light)' }}>
                    <p className="typography-mono-caps" style={{ color: isHighlighted ? '#fff' : 'var(--colors-ink)', marginBottom: '16px', fontSize: '11px', opacity: isHighlighted ? 0.9 : 1 }}>
                      STRUCTURAL INCLUSIONS
                    </p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0, margin: 0 }}>
                      {(pkg.inclusions || []).map((inc: string, iIdx: number) => (
                        <li key={iIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: isHighlighted ? 'rgba(255,255,255,0.88)' : 'var(--colors-ink-soft)' }}>
                          <span style={{ color: isHighlighted ? '#f36458' : 'var(--colors-brand)', fontWeight: 'bold' }}>✓</span>
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

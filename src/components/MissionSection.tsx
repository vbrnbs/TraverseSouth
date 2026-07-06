'use client';

import React from 'react';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { AccordionGallery } from '@/components/AccordionGallery';

export interface MissionProps {
  eyebrow?: string;
  heading?: string;
  bodyText?: any;
  imageGallery?: any[];
  badges?: any[];
  riskReversals?: string[];
}

export function MissionSection({
  data,
  isWide,
  layout = isWide ? 'magazine' : 'default',
}: {
  data?: MissionProps;
  isWide?: boolean;
  layout?: 'default' | 'magazine';
}) {
  const riskBadges =
    data?.riskReversals && data.riskReversals.length > 0
      ? data.riskReversals
      : [
          'ZERO-ADMIN PROTOCOL',
          'SURGICAL WILDERNESS ACCESS',
          'VETTED OPERATOR GUARANTEE',
        ];
  if (layout === 'magazine') {
    return (
      <section
        id="mission-editorial"
        className="marketing-section-dark"
        style={{
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderTop: '1px solid var(--colors-hairline-soft)',
          padding: 'var(--spacing-section-lg) 0',
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: '1440px',
            width: '100%',
            padding: '0 var(--spacing-xl)',
            boxSizing: 'border-box',
          }}
        >
          <div className="mission-magazine-grid">
            {/* Left Editorial Text Column (Locked to top and bottom of image) */}
            <div
              style={{
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                boxSizing: 'border-box',
              }}
            >
              <div>
                <p
                  className="typography-mono-eyebrow"
                  style={{
                    marginBottom: '16px',
                    color: 'var(--colors-brand)',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    fontSize: '12px',
                    lineHeight: '1',
                  }}
                >
                  {data?.eyebrow || '// OPERATIONAL MANIFESTO'}
                </p>

                <h2
                  className="typography-display-sm"
                  style={{
                    color: '#fff',
                    fontSize: '42px',
                    marginBottom: '20px',
                    letterSpacing: '-1.5px',
                    lineHeight: '1.12',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {data?.heading || 'Surgical Wilderness Manifests.'}
                </h2>

                <div
                  className="portable-text-content"
                  style={{ color: 'var(--colors-ash)', lineHeight: '1.65', fontSize: '16px' }}
                >
                  {data?.bodyText ? (
                    <PortableText value={data.bodyText} />
                  ) : (
                    <p style={{ margin: 0 }}>
                      We do not believe in standard tourism; we believe in the surgical execution of untouched wilderness experiences. Traverse South decouples luxury travel from administrative delay.
                    </p>
                  )}
                </div>
              </div>

              {/* Editorial Hairline Divider & Monospaced Pillars (Locked to bottom of image) */}
              <div
                style={{
                  borderTop: '1px solid var(--colors-hairline-soft)',
                  paddingTop: '20px',
                  marginTop: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {riskBadges.map((badge: string, i: number) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--colors-brand)',
                      }}
                    ></div>
                    <span
                      className="typography-mono-caps"
                      style={{ color: '#fff', fontSize: '11px', letterSpacing: '1.5px', lineHeight: '1' }}
                    >
                      {String(i + 1).padStart(2, '0')} // {badge.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Image Gallery */}
            <div style={{ height: '100%', display: 'flex' }}>
              <AccordionGallery images={data?.imageGallery || []} isWide={true} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="mission"
      className="marketing-section-dark"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        borderTop: '1px solid var(--colors-hairline-soft)',
        padding: 0,
      }}
    >
      {/* Centered Content Below */}
      <div
        className="container"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '1200px',
          width: '100%',
          padding: 'var(--spacing-section-lg) var(--spacing-lg)',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        <p
          className="typography-mono-eyebrow"
          style={{
            marginBottom: '24px',
            color: 'var(--colors-brand)',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            fontSize: '12px',
          }}
        >
          {data?.eyebrow || '// OUR MISSION'}
        </p>

        <h2
          className="typography-display-sm"
          style={{
            color: '#fff',
            fontSize: '38px',
            marginBottom: '40px',
            letterSpacing: '-1.5px',
            lineHeight: '1.2',
            maxWidth: '800px',
            whiteSpace: 'pre-line',
          }}
        >
          {data?.heading || 'Surgical Wilderness Manifests.'}
        </h2>

        {/* 1. Image Gallery Accordion */}
        <AccordionGallery images={data?.imageGallery || []} />

        {/* Body Text */}
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          {data?.bodyText && (
            <div
              className="portable-text-content"
              style={{ color: 'var(--colors-ash)', lineHeight: '1.7', fontSize: '18px' }}
            >
              <PortableText value={data.bodyText} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

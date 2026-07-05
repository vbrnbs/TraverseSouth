'use client';

import React from 'react';
import { Button } from '@/components/Button';
import { MuxBackgroundVideo } from '@/components/MuxBackgroundVideo';

export interface HeroProps {
  muxPlaybackId?: string;
  eyebrow?: string;
  headline?: string;
  subtitle?: string;
  primaryCta?: string;
  riskReversals?: string[];
}

export function Hero({ data }: { data?: HeroProps }) {
  const badges =
    data?.riskReversals && data.riskReversals.length > 0
      ? data.riskReversals
      : [
          "NZ's Best Operators Only",
          '100% Kiwi Operated',
          'Zero-Admin Weather Refunds',
        ];

  return (
    <section className="hero-section" id="hero">
      <div className="hero-overlay"></div>

      {/* Cinematic Background Video Frame */}
      <div className="hero-video-bg">
        <MuxBackgroundVideo
          playbackId={data?.muxPlaybackId}
          fallbackUrl="https://assets.mixkit.co/videos/preview/mixkit-beautiful-aerial-view-of-snowy-mountains-42211-large.mp4"
        />
      </div>

      <div className="hero-content" style={{ paddingBottom: 'var(--spacing-xxl)' }}>
        <p
          className="typography-mono-eyebrow"
          style={{
            marginBottom: '24px',
            color: 'var(--colors-brand)',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
          }}
        >
          {data?.eyebrow || 'TRAVERSE SOUTH // SOUTHERN ALPS, NZ'}
        </p>
        <h1
          className="typography-display-mega"
          style={{
            maxWidth: '1200px',
            marginBottom: '32px',
            color: 'var(--colors-on-primary)',
            whiteSpace: 'pre-line',
          }}
        >
          {data?.headline || 'Epic NZ Adventures. Zero Admin.'}
        </h1>
        <p
          className="typography-subtitle"
          style={{
            maxWidth: '650px',
            color: 'var(--colors-ash)',
            marginBottom: '32px',
            lineHeight: '1.6',
          }}
        >
          {data?.subtitle ||
            "We filter out the noise to connect you with New Zealand's elite operators. We handle the logistics, the premium lodgings, and the weather pivots—so you can experience the world's most remote wilderness with zero friction."}
        </p>

        {/* Hormozi Risk Reversals */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: '32px',
          }}
        >
          {badges.map((badge: string, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--colors-brand)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span
                style={{
                  color: 'var(--colors-ash)',
                  fontSize: '13px',
                  fontFamily: 'var(--font-ibm-plex-mono), monospace',
                  textTransform: 'uppercase',
                }}
              >
                {badge}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <Button variant="brand" href="#adventures">
            {data?.primaryCta || 'Explore Blueprints'}
          </Button>
        </div>
      </div>
    </section>
  );
}

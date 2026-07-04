'use client';

import React from 'react';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { AccordionGallery } from '@/components/AccordionGallery';
import { urlFor } from '@/sanity/client';

export interface MissionProps {
  eyebrow?: string;
  heading?: string;
  bodyText?: any;
  imageGallery?: any[];
  badges?: any[];
}

export function MissionSection({ data }: { data?: MissionProps }) {
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
      {/* Partner Logos Marquee (At the very top, full width) */}
      {/* TEMPORARILY HIDDEN UNTIL OPERATOR LOGOS ARE ADDED
      <div style={{ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap', padding: '32px 0', borderBottom: '1px solid var(--colors-hairline-soft)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
        <div className="animate-marquee" style={{ display: 'flex', gap: '64px', alignItems: 'center' }}>
          {data?.badges && data.badges.length > 0 ? (
            [...data.badges, ...data.badges, ...data.badges, ...data.badges, ...data.badges, ...data.badges].map((badge: any, i: number) => (
              <Image
                key={i}
                src={urlFor(badge).url()}
                alt={badge.alt || "Operator Logo"}
                width={120}
                height={40}
                className="marquee-logo"
              />
            ))
          ) : (
            [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3].map((num, i) => (
              <Image
                key={i}
                src={`/images/badge${num}.png`}
                alt="Operator Logo"
                width={120}
                height={40}
                className="marquee-logo"
              />
            ))
          )}
        </div>
      </div>
      */}

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
          padding: 'var(--spacing-section-lg) var(--spacing-lg)',
          textAlign: 'center',
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
          }}
        >
          {data?.heading || 'Surgical Wilderness Manifests.'}
        </h2>

        {/* 1. Image Gallery Accordion */}
        <AccordionGallery images={data?.imageGallery || []} />

        {/* Body Text */}
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          {data?.bodyText ? (
            <div
              className="portable-text-content"
              style={{ color: 'var(--colors-ash)', lineHeight: '1.7', fontSize: '18px' }}
            >
              <PortableText value={data.bodyText} />
            </div>
          ) : (
            <p
              className="typography-subtitle"
              style={{ color: 'var(--colors-ash)', lineHeight: '1.7', fontSize: '18px' }}
            >
              We do not believe in standard tourism; we believe in the surgical execution of
              untouched wilderness experiences. Traverse South decouples luxury travel from
              administrative delay.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

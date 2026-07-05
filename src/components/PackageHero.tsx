'use client';

import React from 'react';
import Image from 'next/image';

export interface PackageHeroProps {
  eyebrow?: string;
  title?: string;
  caption?: string;
  bgImage?: string;
}

export function PackageHero({
  eyebrow,
  title,
  caption,
  bgImage,
}: PackageHeroProps) {
  const imageUrl = bgImage || '/images/alpine_lodge.png';

  return (
    <section
      className="package-hero"
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Instant Low-Res Blur Placeholder */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(20px)',
          transform: 'scale(1.15)',
          zIndex: 0,
        }}
      />
      <Image
        src={imageUrl}
        alt={title || 'Atmospheric Hero'}
        fill
        priority
        style={{ objectFit: 'cover', zIndex: 1 }}
        sizes="100vw"
      />
      <div className="package-hero-overlay" style={{ zIndex: 2 }}></div>
      <div className="package-hero-content" style={{ zIndex: 3 }}>
        <p
          className="typography-mono-eyebrow"
          style={{ color: 'var(--colors-brand)', marginBottom: '16px' }}
        >
          {eyebrow || '01 // EXPEDITIONS'}
        </p>
        <h1
          className="typography-display-xl"
          style={{ marginBottom: '24px', letterSpacing: '-2px' }}
        >
          {title}
        </h1>
        {caption && (
          <p
            className="typography-subtitle"
            style={{
              maxWidth: '600px',
              color: 'var(--colors-ash)',
              fontSize: '18px',
              lineHeight: 1.6,
            }}
          >
            {caption}
          </p>
        )}
      </div>
    </section>
  );
}

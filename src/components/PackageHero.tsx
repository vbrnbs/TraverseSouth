'use client';

import React from 'react';

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
  return (
    <section
      className="package-hero"
      style={{
        backgroundImage: `url(${bgImage || '/images/alpine_lodge.png'})`,
      }}
    >
      <div className="package-hero-overlay"></div>
      <div className="package-hero-content">
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

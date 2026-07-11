'use client';

import React from 'react';
import Link from 'next/link';

export function formatActivityPrice(priceString?: string): string {
  if (!priceString) return 'BESPOKE QUOTE';
  const lower = priceString.toLowerCase();
  if (lower.includes('bespoke') || lower.includes('request')) {
    return priceString;
  }

  let clean = priceString
    .replace(/^from\s+/i, '')
    .replace(/\s*NZD.*$/i, '')
    .replace(/\s*(per|\/).*$/i, '')
    .trim();

  if (!clean) return priceString;

  if (!clean.startsWith('$')) {
    clean = `$${clean}`;
  }

  return `From ${clean} NZD`;
}

export interface ActivityCardSmallProps {
  title: string;
  slug: string;
  subtitle?: string;
  image?: string;
  duration?: string;
  priceString?: string;
}

export function ActivityCardSmall({
  title,
  slug,
  subtitle,
  image,
  duration,
  priceString,
}: ActivityCardSmallProps) {
  const targetHref = slug ? `/trips/${slug}` : '#';
  const imageUrl = image || `/images/${slug || 'default'}.png`;

  return (
    <Link
      href={targetHref}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.025)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--colors-hairline-soft, #353535)',
        overflow: 'hidden',
        textDecoration: 'none',
        color: '#ffffff',
        transition: 'border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.45)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--colors-hairline-soft, #353535)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Top Image Thumbnail - Fixed Height with sleek gradient overlay */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '160px',
          flexShrink: 0,
          backgroundColor: '#141414',
          overflow: 'hidden',
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        {/* Subtle Frosted/Dark Gradient Overlay at base of image */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '48px',
            background: 'linear-gradient(to top, rgba(18, 18, 18, 0.85) 0%, rgba(18, 18, 18, 0) 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Card Content Area - Flex 1 ensuring uniform vertical structure */}
      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          gap: '22px',
        }}
      >
        <div>
          {/* Title: Pinned to exactly 1 line (height 26px) */}
          <h3
            style={{
              fontFamily: 'var(--font-waldenburg), serif',
              fontSize: '20px',
              lineHeight: '26px',
              height: '26px',
              margin: '0 0 8px 0',
              color: '#fff',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            title={title}
          >
            {title}
          </h3>

          {/* Subtitle: Pinned to exactly 2 lines (height 38px) */}
          <p
            style={{
              fontSize: '13px',
              color: 'var(--colors-ash, #b9b9b9)',
              lineHeight: '19px',
              height: '38px',
              margin: 0,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
            title={subtitle || ''}
          >
            {subtitle || 'Experience premium wilderness terrain tailored to your expedition.'}
          </p>
        </div>

        {/* Pinned Bottom Footer Row with generous gap and frosted divider */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              color: 'var(--colors-mute, #797979)',
              fontFamily: 'var(--font-ibm-plex-mono), monospace',
              letterSpacing: '0.5px',
            }}
          >
            {duration || 'SINGLE DAY'}
          </span>
          <span
            style={{
              fontSize: '13px',
              color: 'var(--colors-brand, #f36458)',
              fontFamily: 'var(--font-ibm-plex-mono), monospace',
              fontWeight: 600,
            }}
          >
            {formatActivityPrice(priceString)}
          </span>
        </div>
      </div>
    </Link>
  );
}

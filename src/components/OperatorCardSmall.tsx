'use client';

import React from 'react';
import Link from 'next/link';

export interface OperatorCardSmallProps {
  name: string;
  slug?: string;
  logoUrl?: string;
  label?: string;
}

export function OperatorCardSmall({
  name,
  slug,
  logoUrl,
}: OperatorCardSmallProps) {
  const targetHref = slug ? `/operator/${slug}` : '#';

  return (
    <Link
      href={targetHref}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '16px',
        padding: '14px 16px',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.025)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--colors-hairline-soft, #353535)',
        textDecoration: 'none',
        color: '#ffffff',
        transition: 'border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.35)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--colors-hairline-soft, #353535)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Logo Box */}
      {logoUrl ? (
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '8px',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6px',
            flexShrink: 0,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <img
            src={logoUrl}
            alt={`${name} logo`}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>
      ) : (
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-waldenburg), serif',
            fontSize: '20px',
            color: '#fff',
            flexShrink: 0,
          }}
        >
          {name.charAt(0)}
        </div>
      )}

      {/* Operator Name */}
      <span
        style={{
          fontFamily: 'var(--font-waldenburg), serif',
          fontSize: '17px',
          color: '#fff',
          lineHeight: '1.3',
          flex: 1,
          wordBreak: 'break-word',
        }}
      >
        {name}
      </span>

      {/* VIEW -> Link */}
      <span
        style={{
          fontSize: '12px',
          color: 'var(--colors-brand, #f36458)',
          fontFamily: 'var(--font-ibm-plex-mono), monospace',
          fontWeight: 500,
          flexShrink: 0,
          whiteSpace: 'nowrap',
        }}
      >
        VIEW →
      </span>
    </Link>
  );
}

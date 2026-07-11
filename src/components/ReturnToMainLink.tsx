'use client';

import React from 'react';
import Link from 'next/link';

export interface ReturnToMainLinkProps {
  href?: string;
  label?: string;
}

export function ReturnToMainLink({
  href = '/',
  label = 'RETURN TO MAIN PAGE',
}: ReturnToMainLinkProps) {
  return (
    <div style={{ marginBottom: '40px' }}>
      <Link
        href={href}
        style={{
          fontFamily: 'var(--font-ibm-plex-mono), monospace',
          fontSize: '12px',
          color: 'var(--colors-brand, #f36458)',
          textTransform: 'uppercase',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          letterSpacing: '1px',
          textDecoration: 'none',
          transition: 'transform 0.2s ease, opacity 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateX(-3px)';
          e.currentTarget.style.opacity = '0.85';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateX(0)';
          e.currentTarget.style.opacity = '1';
        }}
      >
        <span>←</span>
        <span>{label}</span>
      </Link>
    </div>
  );
}

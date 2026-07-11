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
          backgroundColor: '#141414',
          padding: '10px 16px',
          borderRadius: '100px',
          textTransform: 'uppercase',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          letterSpacing: '1px',
          textDecoration: 'none',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#1e1e1e';
          e.currentTarget.style.transform = 'translateX(-3px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#141414';
          e.currentTarget.style.transform = 'translateX(0)';
        }}
      >
        <span>←</span>
        <span>{label}</span>
      </Link>
    </div>
  );
}

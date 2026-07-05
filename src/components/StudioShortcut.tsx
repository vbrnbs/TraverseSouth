'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function StudioShortcut() {
  const pathname = usePathname();

  // ONLY render when we are inside Sanity Studio (/studio)
  if (!pathname?.startsWith('/studio')) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 9999,
      }}
    >
      <Link
        href="/"
        target="_blank"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 16px',
          backgroundColor: 'rgba(11, 11, 11, 0.90)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(243, 100, 88, 0.4)',
          borderRadius: '100px',
          color: '#fff',
          fontFamily: 'var(--font-ibm-plex-mono), monospace',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '1.5px',
          textDecoration: 'none',
          textTransform: 'uppercase',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--colors-brand)';
          e.currentTarget.style.backgroundColor = 'rgba(243, 100, 88, 0.15)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(243, 100, 88, 0.4)';
          e.currentTarget.style.backgroundColor = 'rgba(11, 11, 11, 0.90)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--colors-brand)',
            display: 'inline-block',
          }}
        />
        <span>// VIEW PUBLIC SITE ↗</span>
      </Link>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ─── Transparent Fixed Header ─── */}
      <header 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 48px',
          zIndex: 999,
          background: 'transparent',
          pointerEvents: 'none'
        }}
      >
        {/* Invisible spacer on left for centering */}
        <div style={{ width: '60px' }}></div>

        {/* Central Brand Wordmark */}
        <div style={{ pointerEvents: 'auto' }}>
          <Link 
            href="/" 
            className="typography-heading-md" 
            style={{ 
              fontWeight: 500, 
              letterSpacing: '-0.4px', 
              fontSize: '22px', 
              color: '#fff',
              textDecoration: 'none'
            }}
          >
            Traverse South
          </Link>
        </div>

        {/* Right typographic MENU trigger */}
        <div style={{ pointerEvents: 'auto' }}>
          <button 
            onClick={() => setIsOpen(true)}
            className="typography-mono-caps"
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '13px',
              letterSpacing: '1.5px',
              padding: '8px 0',
              fontWeight: 600
            }}
          >
            MENU
          </button>
        </div>
      </header>

      {/* ─── Full-Screen Dark Navigation Overlay ─── */}
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#0b0b0b',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            animation: 'fadeIn 0.25s ease-out'
          }}
        >
          {/* Top Close trigger */}
          <div 
            style={{
              position: 'absolute',
              top: '20px',
              right: '48px',
              height: '80px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="typography-mono-caps"
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '13px',
                letterSpacing: '1.5px',
                fontWeight: 600
              }}
            >
              CLOSE
            </button>
          </div>

          {/* Typographic Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '32px', textAlign: 'center' }}>
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className="typography-display-sm"
              style={{ color: '#fff', textDecoration: 'none', fontSize: '38px', letterSpacing: '-1.5px' }}
            >
              Home / Manifest
            </Link>
            <Link 
              href="/#adventures" 
              onClick={() => setIsOpen(false)}
              className="typography-display-sm"
              style={{ color: '#fff', textDecoration: 'none', fontSize: '38px', letterSpacing: '-1.5px' }}
            >
              Expeditions
            </Link>
            <Link 
              href="/legal" 
              onClick={() => setIsOpen(false)}
              className="typography-display-sm"
              style={{ color: '#fff', textDecoration: 'none', fontSize: '38px', letterSpacing: '-1.5px' }}
            >
              Legal & Disclosures
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

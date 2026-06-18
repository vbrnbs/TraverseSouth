'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 48px',
        zIndex: 999,
        background: 'rgba(11, 11, 11, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--colors-hairline-soft)'
      }}
    >
      {/* Left logo (matches footer layout) */}
      <div>
        <Link 
          href="/" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'none' 
          }}
        >
          <div className="brand-dot"></div>
          <span 
            style={{ 
              fontWeight: 500, 
              letterSpacing: '-0.32px', 
              fontSize: '16px', 
              color: '#fff' 
            }}
          >
            Traverse South
          </span>
        </Link>
      </div>

      {/* Right typographic MENU trigger */}
      <div style={{ position: 'relative' }}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
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
          {isOpen ? 'CLOSE' : 'MENU'}
        </button>

        {/* Dropdown Menu below the trigger */}
        {isOpen && (
          <>
            {/* Click outside to close backdrop */}
            <div 
              onClick={() => setIsOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 997,
                background: 'transparent',
              }}
            />
            {/* Dropdown Box */}
            <div 
              style={{
                position: 'absolute',
                top: '48px', // situated below the trigger button
                right: '0',
                width: '220px',
                backgroundColor: '#0b0b0b',
                border: '1px solid var(--colors-hairline-soft)',
                borderRadius: '6px',
                padding: '8px 0',
                zIndex: 998,
                boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Link 
                href="/" 
                onClick={() => setIsOpen(false)}
                className="header-dropdown-link"
              >
                Home / Manifest
              </Link>
              <Link 
                href="/#adventures" 
                onClick={() => setIsOpen(false)}
                className="header-dropdown-link"
              >
                Expeditions
              </Link>
              <Link 
                href="/legal" 
                onClick={() => setIsOpen(false)}
                className="header-dropdown-link"
              >
                Legal & Disclosures
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

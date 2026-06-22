'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Keep header visible when near the top (less than 10px scrolled)
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide header
        setIsVisible(false);
      } else {
        // Scrolling up - show header
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
        background: 'rgba(11, 11, 11, 0.8)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--colors-hairline-soft)',
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
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

      {/* Right typographic MENU trigger & Highlighted Contact Us button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', position: 'relative' }}>
        {/* Highlighted Contact Us Button */}
        <Button
          variant="brand"
          href="/tailor-made"
          style={{
            height: '36px',
            padding: '0 16px',
            fontSize: '13px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            fontWeight: 600
          }}
        >
          Contact Us
        </Button>

        {/* MENU button trigger */}
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
                href="/about-us"
                onClick={() => setIsOpen(false)}
                className="header-dropdown-link"
              >
                About Us
              </Link>
              <Link
                href="/itineraries"
                onClick={() => setIsOpen(false)}
                className="header-dropdown-link"
              >
                Itineraries
              </Link>
              <Link
                href="/trips"
                onClick={() => setIsOpen(false)}
                className="header-dropdown-link"
              >
                Trips
              </Link>
              <Link
                href="/tailor-made"
                onClick={() => setIsOpen(false)}
                className="header-dropdown-link"
              >
                Tailor Made Trips
              </Link>
              <Link
                href="/stories"
                onClick={() => setIsOpen(false)}
                className="header-dropdown-link"
              >
                Stories
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

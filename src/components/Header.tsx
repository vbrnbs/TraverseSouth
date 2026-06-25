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
      className="site-header"
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)'
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
          className="header-contact-btn"
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
            position: 'relative',
            zIndex: 999,
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
            <div className="header-dropdown-menu">
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

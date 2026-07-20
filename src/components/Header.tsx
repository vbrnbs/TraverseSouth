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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsVisible(true);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header
      className="site-header"
      style={{
        transform: (isVisible || isOpen) ? 'translateY(0)' : 'translateY(-100%)'
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
            {/* Mega Menu Panel */}
            <div className="header-mega-menu">
              {/* Mobile Fullscreen Header Bar with Close Button */}
              <div className="mobile-menu-topbar">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
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
                    padding: '8px 0',
                    fontWeight: 600
                  }}
                  aria-label="Close menu"
                >
                  CLOSE ✕
                </button>
              </div>

              <Link
                href="/adventures"
                onClick={() => setIsOpen(false)}
                className="mega-menu-item"
              >
                <div className="mega-menu-title-row">
                  <span className="mega-menu-title">Adventures</span>
                </div>
                <p className="mega-menu-subtitle">Surgical day expeditions across the South Island</p>
              </Link>

              <Link
                href="/itineraries"
                onClick={() => setIsOpen(false)}
                className="mega-menu-item"
              >
                <div className="mega-menu-title-row">
                  <span className="mega-menu-title">Itineraries</span>
                  <span className="mega-menu-badge">Coming Soon</span>
                </div>
                <p className="mega-menu-subtitle" style={{ color: 'var(--colors-brand)' }}>
                  Multi-day curated journeys // Get Early Access →
                </p>
              </Link>

              <Link
                href="/tailor-made"
                onClick={() => setIsOpen(false)}
                className="mega-menu-item"
              >
                <div className="mega-menu-title-row">
                  <span className="mega-menu-title">Tailor-Made Trips</span>
                </div>
                <p className="mega-menu-subtitle">Transport, lodging & private tours arranged for you</p>
              </Link>

              <Link
                href="/corporate"
                onClick={() => setIsOpen(false)}
                className="mega-menu-item"
              >
                <div className="mega-menu-title-row">
                  <span className="mega-menu-title">Group & Business Trips</span>
                </div>
                <p className="mega-menu-subtitle">Private coaches, facilitators & corporate retreats</p>
              </Link>

              <div className="mega-menu-divider" />

              <Link
                href="/about-us"
                onClick={() => setIsOpen(false)}
                className="mega-menu-item"
              >
                <div className="mega-menu-title-row">
                  <span className="mega-menu-title">About Us</span>
                </div>
                <p className="mega-menu-subtitle">Brand manifesto and operational guarantee</p>
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

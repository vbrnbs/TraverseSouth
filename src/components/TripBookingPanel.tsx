'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface TripBookingPanelProps {
  priceString: string;
  minimumGroup: string;
  durationString: string;
  adventureLevelLabel: string;
  adventureHighlights?: string[];
  inclusions?: string[];
  ctaHref?: string;
  ctaText?: string;
}

export function TripBookingPanel({
  priceString,
  minimumGroup,
  durationString,
  adventureLevelLabel,
  adventureHighlights = [],
  inclusions = [],
  ctaHref = '/#contact',
  ctaText = "I'M INTERESTED →",
}: TripBookingPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedHighlights = isExpanded
    ? adventureHighlights
    : adventureHighlights.slice(0, 5);

  const displayedInclusions = isExpanded
    ? inclusions
    : inclusions.slice(0, 5);

  const canExpand = adventureHighlights.length > 5 || inclusions.length > 5;

  return (
    <div
      className="pricing-panel"
      style={{
        position: 'sticky',
        top: '110px',
        maxHeight: 'calc(100vh - 130px)',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        zIndex: 10,
      }}
    >
      {/* 1. PRICE PER PERSON */}
      <span className="typography-mono-eyebrow" style={{ color: 'var(--colors-mute)' }}>
        // PRICE PER PERSON
      </span>
      <h2 className="pricing-value" style={{ margin: '8px 0', fontSize: '32px', fontWeight: 600 }}>
        {priceString.toLowerCase().includes('from') || priceString.includes('$') || priceString.toLowerCase().includes('bespoke')
          ? priceString
          : `From $${priceString} NZD`}
      </h2>

      {/* 2. EXPEDITION HIGHLIGHTS */}
      {displayedHighlights && displayedHighlights.length > 0 && (
        <div
          style={{
            borderTop: '1px solid #e5e5e7',
            paddingTop: 'var(--spacing-lg)',
            marginBottom: 'var(--spacing-lg)',
          }}
        >
          <span
            className="typography-mono-eyebrow"
            style={{ color: 'var(--colors-mute)', marginBottom: 'var(--spacing-md)', display: 'block' }}
          >
            // EXPEDITION HIGHLIGHTS
          </span>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {displayedHighlights.map((hl: string, idx: number) => (
              <li
                key={idx}
                style={{
                  fontSize: '14px',
                  lineHeight: 1.4,
                  color: '#333',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                }}
              >
                <span style={{ color: 'var(--colors-brand)', fontWeight: 'bold' }}>•</span>
                <span>{hl}</span>
              </li>
            ))}
            {!isExpanded && adventureHighlights.length > 5 && (
              <li style={{ marginTop: '4px' }}>
                <button
                  type="button"
                  onClick={() => setIsExpanded(true)}
                  style={{
                    background: '#f8f8f8',
                    border: '1px solid #e0e0e0',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    width: '100%',
                    color: '#0b0b0b',
                    fontFamily: 'var(--font-ibm-plex-mono), monospace',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>+ {adventureHighlights.length - 5} MORE HIGHLIGHTS</span>
                  <span style={{ color: 'var(--colors-brand)' }}>VIEW ALL ↓</span>
                </button>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* 3. TOTAL INCLUSIONS */}
      <div
        style={{
          borderTop: '1px solid #e5e5e7',
          paddingTop: 'var(--spacing-lg)',
          marginBottom: canExpand && isExpanded ? '8px' : 'var(--spacing-xl)',
        }}
      >
        <span
          className="typography-mono-eyebrow"
          style={{ color: 'var(--colors-mute)', marginBottom: 'var(--spacing-md)', display: 'block' }}
        >
          // TOTAL INCLUSIONS
        </span>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 0 16px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {displayedInclusions.map((inc: string, idx: number) => (
            <li
              key={idx}
              style={{
                fontSize: '14px',
                lineHeight: 1.4,
                color: '#333',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
              }}
            >
              <span style={{ color: 'var(--colors-brand)', fontWeight: 'bold' }}>✓</span>
              <span>{inc}</span>
            </li>
          ))}
          {!isExpanded && inclusions.length > 5 && (
            <li style={{ marginTop: '4px' }}>
              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                style={{
                  background: '#f8f8f8',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  width: '100%',
                  color: '#0b0b0b',
                  fontFamily: 'var(--font-ibm-plex-mono), monospace',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>+ {inclusions.length - 5} MORE INCLUSIONS</span>
                <span style={{ color: 'var(--colors-brand)' }}>VIEW ALL ↓</span>
              </button>
            </li>
          )}
        </ul>
      </div>

      {canExpand && isExpanded && (
        <button
          type="button"
          onClick={() => setIsExpanded(false)}
          style={{
            background: 'none',
            border: 'none',
            padding: '4px 0 16px 0',
            color: 'var(--colors-brand)',
            fontFamily: 'var(--font-ibm-plex-mono), monospace',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '1px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          − SHOW LESS DETAILS ↑
        </button>
      )}

      {/* 4. CTA BUTTON */}
      <Link
        href={ctaHref}
        style={{
          width: '100%',
          height: '48px',
          backgroundColor: 'var(--colors-brand)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--rounded-app-md)',
          fontFamily: 'var(--font-ibm-plex-mono), monospace',
          fontSize: '13px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'background-color 0.2s ease, transform 0.2s ease',
        }}
      >
        {ctaText}
      </Link>
    </div>
  );
}

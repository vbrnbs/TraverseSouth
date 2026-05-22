'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { handleCheckoutAction } from '@/shopify/actions';

interface BookingPanelProps {
  slug: string;
  priceString: string;
  minimumGroup: string;
  inclusions: string[];
  variantId: string | null;
  availableForSale: boolean;
}

const REDIRECT_STEPS = [
  'Verifying rotorcraft availability...',
  'Securing high-country transit clearance...',
  'Synchronizing local guides network...',
  'Formulating custom dietary roster...',
  'Connecting to secure billing node...'
];

export function BookingPanel({
  slug,
  priceString,
  minimumGroup,
  inclusions,
  variantId,
  availableForSale = true
}: BookingPanelProps) {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  // Animate the status steps during routing
  useEffect(() => {
    if (!isRedirecting) return;
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % REDIRECT_STEPS.length);
    }, 650);
    return () => clearInterval(interval);
  }, [isRedirecting]);

  const handleCheckout = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!availableForSale) return;
    setIsRedirecting(true);

    try {
      const result = await handleCheckoutAction(variantId, slug);
      if (result && result.url) {
        window.location.href = result.url;
      } else {
        setIsRedirecting(false);
        alert('We encountered an error setting up your booking. Please try again or contact concierge@traversesouth.com.');
      }
    } catch (err) {
      console.error(err);
      setIsRedirecting(false);
      alert('An unexpected error occurred. Reverting to baseline.');
    }
  };

  return (
    <>
      <div className="pricing-panel">
        <span className="typography-mono-eyebrow" style={{ color: 'var(--colors-mute)' }}>
          // TRANSPARENT COSTING
        </span>
        <h2 className="pricing-value" style={{ margin: '8px 0', fontSize: '32px', fontWeight: 600 }}>
          {priceString}
        </h2>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: 'var(--spacing-lg)' }}>
          {minimumGroup}
        </p>

        <div style={{ borderTop: '1px solid #e5e5e7', paddingTop: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
          <span className="typography-mono-eyebrow" style={{ color: 'var(--colors-mute)', marginBottom: 'var(--spacing-md)', display: 'block' }}>
            // TOTAL INCLUSIONS
          </span>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {inclusions.map((inc, i) => (
              <li style={{ fontSize: '14px', lineHeight: 1.4, color: '#333', display: 'flex', alignItems: 'flex-start', gap: '8px' }} key={i}>
                <span style={{ color: 'var(--colors-brand)', fontWeight: 'bold' }}>✓</span>
                <span>{inc}</span>
              </li>
            ))}
          </ul>
        </div>

        {availableForSale ? (
          <button
            onClick={handleCheckout}
            className="btn btn-primary"
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
              cursor: 'pointer',
              transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#d85348';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--colors-brand)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Book Private Expedition →
          </button>
        ) : (
          <button
            disabled
            className="btn btn-disabled"
            style={{
              width: '100%',
              height: '48px',
              backgroundColor: '#eaeaea',
              color: '#999',
              border: 'none',
              borderRadius: 'var(--rounded-app-md)',
              fontFamily: 'var(--font-ibm-plex-mono), monospace',
              fontSize: '13px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              cursor: 'not-allowed'
            }}
          >
            Expedition Fully Booked
          </button>
        )}
      </div>

      {/* ═══════════════════════════════════════
          Bespoke Redirect Loader (Luxury Glassmorphism Overlay)
          ═══════════════════════════════════════ */}
      {isRedirecting && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(11, 11, 11, 0.88)',
          backdropFilter: 'blur(16px)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          animation: 'fadeIn 0.3s ease-out forwards'
        }}>
          {/* Subtle loading spinner */}
          <div style={{
            width: '40px',
            height: '40px',
            border: '2px solid rgba(243, 100, 88, 0.1)',
            borderTop: '2px solid var(--colors-brand)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '32px'
          }} />

          <p style={{
            fontFamily: 'var(--font-ibm-plex-mono), monospace',
            fontSize: '11px',
            color: 'var(--colors-brand)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '12px'
          }}>
            // SECURE LOGISTICS HANDSHAKE
          </p>

          <h3 style={{
            fontFamily: 'var(--font-waldenburg), serif',
            fontSize: '28px',
            fontWeight: 'normal',
            textAlign: 'center',
            maxWidth: '500px',
            lineHeight: 1.4,
            height: '80px',
            transition: 'opacity 0.25s ease-in-out'
          }}>
            {REDIRECT_STEPS[stepIndex]}
          </h3>

          <p style={{
            fontSize: '13px',
            color: 'var(--colors-mute)',
            marginTop: '24px'
          }}>
            Redirecting to secure gateway...
          </p>

          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}} />
        </div>
      )}
    </>
  );
}

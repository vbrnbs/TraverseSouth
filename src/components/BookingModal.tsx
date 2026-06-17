'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { urlFor } from '@/sanity/client';

interface ActivityProps {
  _id: string;
  title: string;
  slug: { current: string };
  eyebrow?: string;
  subtitle?: string;
  description?: string;
  adventureLevel: number;
  ctaText?: string;
  image?: any;
  pricing?: {
    priceString?: string;
    minimumGroup?: string;
    inclusions?: string[];
  };
}

interface BookingModalProps {
  activity: ActivityProps;
  onClose: () => void;
}

const REDIRECT_STEPS = [
  'Verifying rotorcraft availability...',
  'Securing high-country transit clearance...',
  'Synchronizing local guides network...',
  'Formulating custom dietary roster...',
  'Connecting to secure billing node...'
];

export function BookingModal({ activity, onClose }: BookingModalProps) {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  // Animate secure handshake loading steps
  useEffect(() => {
    if (!isRedirecting) return;
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % REDIRECT_STEPS.length);
    }, 700);
    return () => clearInterval(interval);
  }, [isRedirecting]);

  const handleCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRedirecting(true);
    setTimeout(() => {
      setIsRedirecting(false);
      alert(`Booking initiated for: ${activity.title}. This represents a successful secure manifest handshake!`);
      onClose();
    }, 3800);
  };

  const imageUrl = activity.image ? urlFor(activity.image).url() : `/images/${activity.slug?.current}.png`;

  return (
    <>
      {/* Overlay Backdrop */}
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(11, 11, 11, 0.75)',
          backdropFilter: 'blur(12px)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.25s ease-out forwards'
        }}
        onClick={onClose}
      >
        {/* Modal Window */}
        <div 
          style={{
            backgroundColor: '#0b0b0b',
            width: '90%',
            maxWidth: '960px',
            maxHeight: '90vh',
            border: '1px solid var(--colors-hairline-soft)',
            borderRadius: 'var(--rounded-marketing)',
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            position: 'relative'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              color: '#fff',
              fontSize: '24px',
              cursor: 'pointer',
              zIndex: 10,
              backgroundColor: 'rgba(0,0,0,0.4)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #333'
            }}
            aria-label="Close"
          >
            ×
          </button>

          {/* Left Column: Details & Calendar Mockup */}
          <div style={{ padding: 'var(--spacing-xl)', borderRight: '1px solid var(--colors-hairline-soft)' }}>
            <p className="typography-mono-eyebrow" style={{ color: 'var(--colors-brand)', fontSize: '11px', marginBottom: '8px' }}>
              // SECURE BOOKING PIPELINE
            </p>
            <h2 className="typography-display-sm" style={{ color: '#fff', marginBottom: '8px', fontSize: '28px', letterSpacing: '-0.8px' }}>
              {activity.title}
            </h2>
            <p className="typography-body-sm" style={{ color: 'var(--colors-ash)', marginBottom: '24px', lineHeight: 1.5 }}>
              {activity.subtitle || activity.description}
            </p>

            {/* Calendar Mockup */}
            <div style={{ marginBottom: '16px' }}>
              <p className="typography-mono-caps" style={{ color: 'var(--colors-mute)', marginBottom: '12px', fontSize: '11px' }}>
                // SELECT EXPEDITION DATES (REZDY PLUG-IN)
              </p>
              <div 
                style={{ 
                  borderRadius: 'var(--rounded-app-lg)', 
                  overflow: 'hidden', 
                  border: '1px solid var(--colors-hairline-soft)',
                  backgroundColor: '#000',
                  padding: '8px'
                }}
              >
                <img 
                  src="/images/booking_calendar.png" 
                  alt="Calendar date picker selector widget" 
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Inclusions */}
          <div style={{ padding: 'var(--spacing-xl)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#111' }}>
            <div>
              <p className="typography-mono-eyebrow" style={{ color: 'var(--colors-mute)', fontSize: '11px', marginBottom: '8px' }}>
                // TRANSPARENT COSTING
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                <span className="typography-heading-md" style={{ color: '#fff', fontSize: '32px', fontWeight: 600 }}>
                  {activity.pricing?.priceString || '$1,500 NZD'}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--colors-mute)' }}>/ person</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--colors-ash)', marginBottom: '24px' }}>
                {activity.pricing?.minimumGroup || 'Tailored for private groups.'}
              </p>

              <div style={{ borderTop: '1px solid #222', paddingTop: '20px', marginBottom: '24px' }}>
                <p className="typography-mono-caps" style={{ color: 'var(--colors-mute)', marginBottom: '12px', fontSize: '11px' }}>
                  // EXPEDITION INCLUSIONS
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {(activity.pricing?.inclusions || ['Private helicopter transfers', 'Bespoke guiding and gear', 'Gourmet mountain dining']).map((inc, i) => (
                    <li key={i} style={{ fontSize: '13px', color: 'var(--colors-ash)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ color: 'var(--colors-brand)', fontWeight: 'bold' }}>✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <p className="typography-meta" style={{ color: 'var(--colors-mute)', marginBottom: '16px', lineHeight: 1.4 }}>
                * Selecting dates connects directly with operators' booking manifests in real-time.
              </p>
              <button
                onClick={handleCheckout}
                className="button button-brand"
                style={{
                  width: '100%',
                  height: '48px',
                  fontFamily: 'var(--font-ibm-plex-mono), monospace',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}
              >
                Book Private Experience →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Redirect Loader Overlay */}
      {isRedirecting && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(11, 11, 11, 0.9)',
          backdropFilter: 'blur(16px)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          animation: 'fadeIn 0.3s ease-out forwards'
        }}>
          {/* Spinner */}
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
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '26px',
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
            @keyframes slideUp {
              from { transform: translateY(30px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}} />
        </div>
      )}
    </>
  );
}

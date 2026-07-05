'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from './Button';
import { urlFor } from '@/sanity/client';

interface ItinerariesWaitlistProps {
  data?: {
    eyebrow?: string;
    title?: string;
    heading?: string;
    subtitle?: string;
    seoDescription?: string;
    ctaText?: string;
    image?: any;
    [key: string]: any;
  };
}

export function ItinerariesWaitlist({ data }: ItinerariesWaitlistProps = {}) {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const eyebrow = data?.eyebrow || '// EXPEDITION BLUEPRINTS';
  const title = data?.title || data?.heading || 'Multi-Day Sovereign Journeys';
  const subtitle = data?.subtitle || data?.seoDescription || 'Expertly curated narratives combining private aviation, elite guides, and ultra-luxe lodges. We are currently hand-selecting our founding expedition routes for the upcoming season.';
  const ctaText = data?.ctaText || 'Get Early Access →';
  const bgImage = data?.image;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  return (
    <section 
      className="marketing-section-dark" 
      style={{ 
        borderTop: '1px solid var(--colors-hairline-soft)',
        borderBottom: '1px solid var(--colors-hairline-soft)',
        backgroundColor: 'var(--colors-canvas-soft)',
        padding: '120px 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Image from Sanity with Low-Res Blur Placeholder & Next.js Image */}
      {bgImage && (
        <>
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${urlFor(bgImage).width(20).blur(50).url()})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(20px)',
              transform: 'scale(1.15)',
              opacity: 0.5,
              pointerEvents: 'none',
              zIndex: 0
            }}
          />
          <Image
            src={urlFor(bgImage).width(1920).url()}
            alt={data?.title || 'Atmospheric Background'}
            fill
            style={{ objectFit: 'cover', opacity: 0.5, pointerEvents: 'none', zIndex: 0 }}
            sizes="100vw"
          />
        </>
      )}

      {/* Background glow effect */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(243, 100, 88, 0.05) 0%, rgba(0, 0, 0, 0) 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ maxWidth: '800px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <p className="typography-mono-eyebrow" style={{ color: 'var(--colors-brand)', marginBottom: '16px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          {eyebrow}
        </p>
        
        <h2 className="typography-display-lg" style={{ color: '#fff', marginBottom: '24px', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
          {title}
        </h2>
        
        <p className="typography-subtitle" style={{ color: 'var(--colors-ash)', fontSize: '18px', lineHeight: 1.6, marginBottom: '40px', maxWidth: '640px', margin: '0 auto 40px auto' }}>
          {subtitle}
        </p>

        {!showForm && !isSubmitted && (
          <div>
            <button
              onClick={() => setShowForm(true)}
              className="button button-brand"
              style={{
                height: '52px',
                padding: '0 32px',
                fontFamily: 'var(--font-ibm-plex-mono), monospace',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                borderRadius: 'var(--rounded-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              {ctaText}
            </button>
            <p style={{ color: 'var(--colors-mute)', fontSize: '12px', marginTop: '16px', fontFamily: 'var(--font-ibm-plex-mono), monospace' }}>
              // CLOSED CURATION WINDOW
            </p>
          </div>
        )}

        {showForm && !isSubmitted && (
          <form 
            onSubmit={handleSubmit}
            style={{
              maxWidth: '460px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              animation: 'fadeIn 0.3s ease-out forwards'
            }}
          >
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: '1 1 240px',
                  height: '52px',
                  padding: '0 20px',
                  backgroundColor: '#0b0b0b',
                  border: '1px solid var(--colors-hairline-soft)',
                  borderRadius: 'var(--rounded-full)',
                  color: '#fff',
                  fontSize: '14px',
                  fontFamily: 'var(--font-inter), sans-serif',
                  outline: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
              />
              <button
                type="submit"
                className="button button-brand"
                style={{
                  height: '52px',
                  padding: '0 28px',
                  fontFamily: 'var(--font-ibm-plex-mono), monospace',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  borderRadius: 'var(--rounded-full)',
                  cursor: 'pointer',
                  flex: '0 0 auto'
                }}
              >
                Join List →
              </button>
            </div>
            <p style={{ color: 'var(--colors-mute)', fontSize: '12px', fontFamily: 'var(--font-ibm-plex-mono), monospace' }}>
              We respect your inbox. Priority manifest notification only.
            </p>
          </form>
        )}

        {isSubmitted && (
          <div 
            style={{
              padding: '32px',
              backgroundColor: '#0b0b0b',
              border: '1px solid var(--colors-brand)',
              borderRadius: 'var(--rounded-marketing)',
              maxWidth: '520px',
              margin: '0 auto',
              animation: 'fadeIn 0.3s ease-out forwards'
            }}
          >
            <span style={{ color: 'var(--colors-brand)', fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: '11px', display: 'block', marginBottom: '8px' }}>
              // MANIFEST HANDSHAKE COMPLETE
            </span>
            <h3 style={{ color: '#fff', fontSize: '20px', marginBottom: '12px', fontWeight: 500 }}>
              You have been added to the closed curation list.
            </h3>
            <p style={{ color: 'var(--colors-ash)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
              We will notify <strong style={{ color: '#fff' }}>{email}</strong> the moment our founding expedition routes open for reservations.
            </p>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </section>
  );
}

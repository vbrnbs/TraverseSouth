'use client';

import React, { useState, useEffect } from 'react';

interface GalleryImage {
  url: string;
  alt?: string;
}

interface OperatorGalleryProps {
  images: GalleryImage[];
  companyName: string;
}

export function OperatorGallery({ images, companyName }: OperatorGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev !== null ? (prev - 1 + images.length) % images.length : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <section style={{ marginBottom: '48px' }}>
      {/* 1. Main Feature Image */}
      <button
        onClick={() => setSelectedIndex(0)}
        style={{
          all: 'unset',
          cursor: 'pointer',
          display: 'block',
          width: '100%',
          maxHeight: '460px',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid var(--colors-hairline-soft, #2a2a2a)',
          backgroundColor: '#141414',
          aspectRatio: '16/9',
          position: 'relative',
          transition: 'border-color 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#666666';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--colors-hairline-soft, #2a2a2a)';
        }}
      >
        <img
          src={images[0].url}
          alt={images[0].alt || `${companyName} featured image`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </button>

      {/* 2. Single-Line Scrollable Thumbnail Strip (fit in one line with scrollbar) */}
      {images.length > 1 && (
        <div
          style={{
            display: 'flex',
            gap: '10px',
            marginTop: '10px',
            overflowX: 'auto',
            paddingBottom: '8px',
            scrollbarWidth: 'thin',
            scrollbarColor: '#333333 #111111',
          }}
        >
          {images.slice(1).map((img, idx) => {
            const actualIndex = idx + 1;
            return (
              <button
                key={actualIndex}
                onClick={() => setSelectedIndex(actualIndex)}
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  display: 'block',
                  width: '128px',
                  height: '76px',
                  flexShrink: 0,
                  borderRadius: '6px',
                  overflow: 'hidden',
                  border: '1px solid var(--colors-hairline-soft, #2a2a2a)',
                  backgroundColor: '#141414',
                  transition: 'border-color 0.2s ease, opacity 0.2s ease',
                  opacity: 0.88,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#666666';
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--colors-hairline-soft, #2a2a2a)';
                  e.currentTarget.style.opacity = '0.88';
                }}
              >
                <img
                  src={img.url}
                  alt={img.alt || `${companyName} thumbnail ${actualIndex + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Interactive Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          onClick={() => setSelectedIndex(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(5, 5, 5, 0.93)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
          }}
        >
          {/* Top Bar: Counter and Close */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: '24px',
              left: '32px',
              right: '32px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-ibm-plex-mono), monospace',
                fontSize: '13px',
                color: '#aaaaaa',
                letterSpacing: '1px',
              }}
            >
              // {String(selectedIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
            <button
              onClick={() => setSelectedIndex(null)}
              style={{
                all: 'unset',
                cursor: 'pointer',
                color: '#ffffff',
                fontFamily: 'var(--font-ibm-plex-mono), monospace',
                fontSize: '13px',
                padding: '8px 16px',
                border: '1px solid #333333',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              CLOSE [ESC]
            </button>
          </div>

          {/* Main Display Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '78vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={images[selectedIndex].url}
              alt={images[selectedIndex].alt || `${companyName} full image`}
              style={{
                maxWidth: '100%',
                maxHeight: '78vh',
                objectFit: 'contain',
                borderRadius: '6px',
                border: '1px solid #2a2a2a',
                boxShadow: '0 24px 48px rgba(0, 0, 0, 0.7)',
              }}
            />
          </div>

          {/* Prev / Next Navigation Arrows */}
          {images.length > 1 && (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'flex',
                gap: '12px',
                marginTop: '24px',
              }}
            >
              <button
                onClick={() =>
                  setSelectedIndex((prev) =>
                    prev !== null ? (prev - 1 + images.length) % images.length : null
                  )
                }
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-ibm-plex-mono), monospace',
                  fontSize: '12px',
                  color: '#ffffff',
                  padding: '10px 20px',
                  border: '1px solid #333333',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                }}
              >
                ← PREV
              </button>
              <button
                onClick={() =>
                  setSelectedIndex((prev) =>
                    prev !== null ? (prev + 1) % images.length : null
                  )
                }
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-ibm-plex-mono), monospace',
                  fontSize: '12px',
                  color: '#ffffff',
                  padding: '10px 20px',
                  border: '1px solid #333333',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                }}
              >
                NEXT →
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

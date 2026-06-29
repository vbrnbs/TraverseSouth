'use client';

import React, { useState } from 'react';
import { Button } from '@/components/Button';
import { urlFor } from '@/sanity/client';
import { BookingModal } from './BookingModal';

interface ActivityProps {
  _id: string;
  title: string;
  slug: { current: string };
  eyebrow?: string;
  subtitle?: string;
  description?: string;
  adventureLevel: number;
  region?: string;
  ctaText?: string;
  image?: any;
  pricing?: {
    priceString?: string;
    minimumGroup?: string;
    inclusions?: string[];
  };
}

export function TourBuilder({ products }: { products: ActivityProps[] }) {
  const [activeRegion, setActiveRegion] = useState<string>('all');
  const [activeLevel, setActiveLevel] = useState<string>('all');
  const [selectedActivity, setSelectedActivity] = useState<ActivityProps | null>(null);

  const safeActivities = products || [];

  // Filter activities by selected Region and Level
  const filteredActivities = safeActivities.filter((act) => {
    const matchesLevel = activeLevel === 'all' || act.adventureLevel === parseInt(activeLevel);
    const matchesRegion = activeRegion === 'all' || act.region?.toLowerCase() === activeRegion.toLowerCase();
    return matchesLevel && matchesRegion;
  });

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 1:
        return 'LEVEL 1 // RESTORATIVE';
      case 2:
        return 'LEVEL 2 // ACTIVE WILDERNESS';
      case 3:
        return 'LEVEL 3 // HIGH GRAVITY';
      default:
        return `LEVEL ${level}`;
    }
  };

  const getCardClassName = (index: number) => {
    // Staggered asymmetric layout: 0, 3, 4 are span 2; 1, 2, 5 are span 1
    const mod = index % 6;
    if (mod === 0 || mod === 3 || mod === 4) {
      return 'adventure-card-span-2';
    }
    return 'adventure-card-span-1';
  };

  const regions = [
    { title: 'ALL REGIONS', value: 'all' },
    { title: 'OTAGO', value: 'otago' },
    { title: 'SOUTHLAND', value: 'southland' },
    { title: 'CANTERBURY', value: 'canterbury' }
  ];

  const levels = [
    { title: 'ALL EXPERIENCES', value: 'all' },
    { title: 'LEVEL 1 // RESTORATIVE', value: '1' },
    { title: 'LEVEL 2 // ACTIVE WILDERNESS', value: '2' },
    { title: 'LEVEL 3 // HIGH GRAVITY', value: '3' }
  ];

  return (
    <div style={{ marginTop: 'var(--spacing-xl)' }}>
      
      {/* ─── Filter Section ─── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: 'var(--spacing-xxl)' }}>
        
        {/* Region Filter Row */}
        <div>
          <p className="typography-mono-caps" style={{ color: 'var(--colors-mute)', fontSize: '10px', marginBottom: '8px', letterSpacing: '1px' }}>
            // REGION MANIFEST
          </p>
          <div 
            style={{ 
              display: 'flex', 
              gap: '12px', 
              borderBottom: '1px solid var(--colors-hairline-soft)',
              paddingBottom: '12px',
              overflowX: 'auto',
              scrollbarWidth: 'none'
            }}
          >
            {regions.map((reg) => {
              const isActive = activeRegion === reg.value;
              return (
                <button
                  key={reg.value}
                  onClick={() => setActiveRegion(reg.value)}
                  className="typography-mono-caps"
                  style={{
                    padding: 'var(--spacing-xs) var(--spacing-md)',
                    backgroundColor: isActive ? 'var(--colors-brand)' : 'var(--colors-canvas-soft)',
                    color: isActive ? '#0b0b0b' : 'var(--colors-ash)',
                    borderRadius: 'var(--rounded-app-sm)',
                    border: isActive ? '1px solid var(--colors-brand)' : '1px solid var(--colors-hairline-soft)',
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    whiteSpace: 'nowrap',
                    fontWeight: isActive ? 600 : 500
                  }}
                >
                  {reg.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Level Filter Row */}
        <div>
          <p className="typography-mono-caps" style={{ color: 'var(--colors-mute)', fontSize: '10px', marginBottom: '8px', letterSpacing: '1px' }}>
            // GRAVITY & INTENSITY
          </p>
          <div 
            style={{ 
              display: 'flex', 
              gap: '12px', 
              borderBottom: '1px solid var(--colors-hairline-soft)',
              paddingBottom: '12px',
              overflowX: 'auto',
              scrollbarWidth: 'none'
            }}
          >
            {levels.map((lvl) => {
              const isActive = activeLevel === lvl.value;
              return (
                <button
                  key={lvl.value}
                  onClick={() => setActiveLevel(lvl.value)}
                  className="typography-mono-caps"
                  style={{
                    padding: 'var(--spacing-xs) var(--spacing-md)',
                    backgroundColor: isActive ? 'var(--colors-brand)' : 'var(--colors-canvas-soft)',
                    color: isActive ? '#0b0b0b' : 'var(--colors-ash)',
                    borderRadius: 'var(--rounded-app-sm)',
                    border: isActive ? '1px solid var(--colors-brand)' : '1px solid var(--colors-hairline-soft)',
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    whiteSpace: 'nowrap',
                    fontWeight: isActive ? 600 : 500
                  }}
                >
                  {lvl.title}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* ─── Asymmetric Grid Layout ─── */}
      <div className="adventures-grid">
        {filteredActivities.map((act, index) => {
          const imageUrl = act.image ? urlFor(act.image).url() : `/images/${act.slug?.current}.png`;

          return (
            <div 
              key={act._id} 
              className={`feature-card-dark ${getCardClassName(index)}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '0',
                overflow: 'hidden',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease',
                backgroundColor: 'var(--colors-canvas-soft)',
                border: '1px solid var(--colors-hairline-soft)',
                borderRadius: 'var(--rounded-marketing)',
                minHeight: '520px' // Ensures no card button clipping and aligns row heights
              }}
            >
              {/* Image Frame with Lazy Loading & Skeleton Color */}
              <img 
                src={imageUrl} 
                alt={act.title || 'Adventure Image'}
                loading="lazy"
                style={{ 
                  width: '100%', 
                  height: '240px', 
                  objectFit: 'cover',
                  backgroundColor: 'var(--colors-hairline-soft)', // Acts as a skeleton loader
                  borderBottom: '1px solid var(--colors-hairline-soft)'
                }}
              />

              {/* Content Block */}
              <div style={{ padding: 'var(--spacing-xl)', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <p 
                      className="typography-mono-eyebrow" 
                      style={{ 
                        color: 'var(--colors-brand)', 
                        fontSize: '11px', 
                        letterSpacing: '1px', 
                        margin: 0
                      }}
                    >
                      {getLevelLabel(act.adventureLevel)}
                    </p>
                    {act.region && (
                      <span className="typography-mono-micro" style={{ color: 'var(--colors-mute)', textTransform: 'uppercase' }}>
                        // {act.region}
                      </span>
                    )}
                  </div>
                  <h3 
                    className="typography-heading-sm" 
                    style={{ 
                      marginBottom: '12px', 
                      fontWeight: 500, 
                      color: '#fff',
                      fontSize: '22px',
                      letterSpacing: '-0.4px'
                    }}
                  >
                    {act.title}
                  </h3>
                  <p 
                    className="typography-body-sm" 
                    style={{ 
                      color: 'var(--colors-ash)', 
                      lineHeight: '1.6', 
                      marginBottom: '24px' 
                    }}
                  >
                    {act.description}
                  </p>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '12px', marginTop: 'auto', paddingTop: '16px' }}>
                  <Button 
                    variant="brand" 
                    style={{ flex: 1, height: '40px', padding: '0', fontSize: '13px' }}
                    onClick={() => setSelectedActivity(act)}
                  >
                    {act.ctaText || 'Book Now'}
                  </Button>
                  <Button 
                    variant="secondary-dark" 
                    style={{ flex: 1, height: '40px', padding: '0', fontSize: '13px' }}
                    href={`/itinerary/${act.slug?.current}`}
                  >
                    View Itinerary
                  </Button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredActivities.length === 0 && (
          <p style={{ color: 'var(--colors-ash)', fontSize: '14px', gridColumn: '1 / -1', textAlign: 'center', padding: '48px 0' }}>
            No experiences found matching this criteria.
          </p>
        )}
      </div>

      {/* Booking Modal Fallback */}
      {selectedActivity && (
        <BookingModal 
          activity={selectedActivity} 
          onClose={() => setSelectedActivity(null)} 
        />
      )}
    </div>
  );
}

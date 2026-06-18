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
  ctaText?: string;
  image?: any;
  pricing?: {
    priceString?: string;
    minimumGroup?: string;
    inclusions?: string[];
  };
}

export function TourBuilder({ products }: { products: ActivityProps[] }) {
  const [activeLevel, setActiveLevel] = useState<string>('all');
  const [selectedActivity, setSelectedActivity] = useState<ActivityProps | null>(null);

  const safeActivities = products || [];

  // Filter activities by selected adventureLevel
  const filteredActivities = safeActivities.filter((act) => {
    if (activeLevel === 'all') return true;
    return act.adventureLevel === parseInt(activeLevel);
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

  return (
    <div style={{ marginTop: 'var(--spacing-xl)' }}>
      {/* ─── Level Filter Tabs ─── */}
      <div 
        style={{ 
          display: 'flex', 
          gap: '12px', 
          marginBottom: 'var(--spacing-xxl)', 
          borderBottom: '1px solid var(--colors-hairline-soft)',
          paddingBottom: '16px',
          overflowX: 'auto',
          scrollbarWidth: 'none'
        }}
      >
        {['all', '1', '2', '3'].map((lvl) => {
          const isActive = activeLevel === lvl;
          const label = 
            lvl === 'all' 
              ? 'ALL EXPERIENCES' 
              : lvl === '1' 
              ? 'LEVEL 1 // RESTORATIVE' 
              : lvl === '2' 
              ? 'LEVEL 2 // ACTIVE WILDERNESS' 
              : 'LEVEL 3 // HIGH GRAVITY';

          return (
            <button
              key={lvl}
              onClick={() => setActiveLevel(lvl)}
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
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'var(--colors-brand)';
                  e.currentTarget.style.color = '#fff';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'var(--colors-hairline-soft)';
                  e.currentTarget.style.color = 'var(--colors-ash)';
                }
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* ─── Grid Layout ─── */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', 
          gap: 'var(--spacing-lg)',
          marginBottom: 'var(--spacing-section)'
        }}
      >
        {filteredActivities.map((act) => {
          const imageUrl = act.image ? urlFor(act.image).url() : `/images/${act.slug?.current}.png`;

          return (
            <div 
              key={act._id} 
              className="feature-card-dark"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '0',
                overflow: 'hidden',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease',
                backgroundColor: 'var(--colors-canvas-soft)',
                border: '1px solid var(--colors-hairline-soft)',
                borderRadius: 'var(--rounded-marketing)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--colors-brand)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--colors-hairline-soft)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Image Frame */}
              <div 
                style={{ 
                  width: '100%', 
                  height: '220px', 
                  backgroundImage: `url(${imageUrl})`, 
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderBottom: '1px solid var(--colors-hairline-soft)'
                }}
              />

              {/* Content Block */}
              <div style={{ padding: 'var(--spacing-xl)', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <p 
                    className="typography-mono-eyebrow" 
                    style={{ 
                      color: 'var(--colors-brand)', 
                      fontSize: '11px', 
                      letterSpacing: '1px', 
                      marginBottom: '12px' 
                    }}
                  >
                    {getLevelLabel(act.adventureLevel)}
                  </p>
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
                <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
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

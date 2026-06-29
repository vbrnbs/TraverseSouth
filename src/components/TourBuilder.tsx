'use client';

import React, { useState, useRef } from 'react';
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
  levelLabel?: string;
  region?: string;
  ctaText?: string;
  secondaryCtaText?: string;
  image?: any;
  pricing?: {
    priceString?: string;
    minimumGroup?: string;
    inclusions?: string[];
  };
}

export function TourBuilder({ products, viewAllCard, isScrollable = false }: { products: ActivityProps[], viewAllCard?: any, isScrollable?: boolean }) {
  const [selectedActivity, setSelectedActivity] = useState<ActivityProps | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);

  const filteredActivities = isScrollable ? (products || []).slice(0, 4) : (products || []);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  React.useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => {
      window.removeEventListener('resize', checkScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [products, isScrollable]);

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

  const scrollContainer = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      const container = scrollRef.current;
      const scrollAmount = window.innerWidth * 0.8;
      const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

      const startScroll = container.scrollLeft;
      const distance = targetScroll - startScroll;
      const duration = 2000; // 1.2s for much slower and smoother scroll
      let startTime: number | null = null;

      const easeInOutCubic = (t: number) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        container.scrollLeft = startScroll + distance * easeInOutCubic(progress);

        if (progress < 1) {
          animationFrameId.current = requestAnimationFrame(animation);
        } else {
          animationFrameId.current = null;
          checkScroll();
        }
      };

      animationFrameId.current = requestAnimationFrame(animation);
    }
  };

  return (
    <div style={{ marginTop: 'var(--spacing-xl)', position: 'relative' }}>

      {/* Netflix-style scroll buttons */}
      {isScrollable && (
        <>
          <button
            onClick={() => scrollContainer('left')}
            style={{ position: 'absolute', left: '-32px', top: 0, bottom: 0, width: '160px', zIndex: 10, background: 'linear-gradient(to right, rgba(11,11,11,1) 0%, transparent 100%)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: '24px', opacity: 0, transition: 'opacity 0.2s', display: canScrollLeft ? 'flex' : 'none', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '16px' }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; scrollContainer('left'); }}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
          >
            &#10094;
          </button>

          <button
            onClick={() => scrollContainer('right')}
            style={{ position: 'absolute', right: '-32px', top: 0, bottom: 0, width: '160px', zIndex: 10, background: 'linear-gradient(to left, rgba(11,11,11,1) 0%, transparent 100%)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: '24px', opacity: 0, transition: 'opacity 0.2s', display: canScrollRight ? 'flex' : 'none', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '16px' }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; scrollContainer('right'); }}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
          >
            &#10095;
          </button>
        </>
      )}

      {/* ─── Horizontal Scrolling Flex Layout ─── */}
      <div className={isScrollable ? "hide-scrollbar" : ""} ref={scrollRef} onScroll={checkScroll} style={isScrollable ? {
        display: 'flex',
        flexWrap: 'nowrap',
        gap: 'var(--spacing-lg)',
        width: '100%',
        overflowX: 'auto',
        paddingBottom: '24px' // Extra padding so the hover animation doesn't get clipped
      } : {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 'var(--spacing-lg)',
        width: '100%',
        paddingBottom: '24px'
      }}>
        {filteredActivities.map((act) => {
          const imageUrl = act.image ? urlFor(act.image).url() : `/images/${act.slug?.current}.png`;

          return (
            <div
              key={act._id}
              className="feature-card-dark"
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: isScrollable ? '0 0 max(280px, calc((100vw - var(--layout-padding-left, 0px) - (4 * var(--spacing-lg))) / 4.5))' : 'unset',
                minHeight: '520px',
                padding: '0',
                overflow: 'hidden',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease',
                backgroundColor: 'var(--colors-canvas-soft)',
                border: '1px solid var(--colors-hairline-soft)',
                borderRadius: 'var(--rounded-marketing)'
              }}
            >
              {/* Image Frame with LQIP */}
              <div style={{
                width: '100%',
                height: '240px',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: 'var(--colors-hairline-soft)',
                borderBottom: '1px solid var(--colors-hairline-soft)'
              }}>
                {act.image && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${urlFor(act.image).width(20).blur(50).url()})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 0,
                  }} />
                )}
                <img
                  src={imageUrl}
                  alt={act.title || 'Adventure Image'}
                  loading="lazy"
                  className="card-image"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'relative',
                    zIndex: 1
                  }}
                />
              </div>

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
                      {act.levelLabel || getLevelLabel(act.adventureLevel)}
                    </p>
                    {act.region && (
                      <span className="typography-mono-micro" style={{ color: 'var(--colors-mute)', textTransform: 'uppercase' }}>
                        // {act.region}
                      </span>
                    )}
                  </div>
                  <h3
                    className="typography-heading-sm"
                    onClick={() => setSelectedActivity(act)}
                    style={{
                      marginBottom: '12px',
                      fontWeight: 500,
                      color: '#fff',
                      fontSize: '22px',
                      letterSpacing: '-0.4px',
                      cursor: 'pointer'
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
                    {act.subtitle}
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
                    {act.secondaryCtaText || 'View Itinerary'}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}

        {/* View All Card */}
        {viewAllCard && (
          <div
            className="feature-card-dark"
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: '0 0 max(280px, calc((100vw - var(--layout-padding-left, 0px) - (4 * var(--spacing-lg))) / 4.5))',
              minHeight: '480px',
              padding: 0,
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative'
            }}
            onClick={() => window.location.href = '/trips'}
          >
            {/* Background Image (Full Cover) */}
            {viewAllCard.image && (
              <div
                className="card-image"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${urlFor(viewAllCard.image).url()})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: 0,
                  opacity: 0.4
                }}
              />
            )}

            {/* Content overlay */}
            <div style={{ position: 'relative', zIndex: 1, padding: 'var(--spacing-xl)', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              {viewAllCard.title && (
                <h3 className="typography-h3" style={{ marginBottom: '16px' }}>
                  {viewAllCard.title}
                </h3>
              )}
              {viewAllCard.subtitle && (
                <p className="typography-body-sm" style={{ color: 'var(--colors-ash)', marginBottom: '32px' }}>
                  {viewAllCard.subtitle}
                </p>
              )}
              {viewAllCard.ctaText && (
                <Button variant="brand" style={{ width: '100%', maxWidth: '240px' }}>
                  {viewAllCard.ctaText}
                </Button>
              )}
            </div>
          </div>
        )}

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

'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { urlFor } from '@/sanity/client';
import { BookingModal } from './BookingModal';
import { ActivityCard, ActivityProps } from './ActivityCard';

export function ActivityGrid({ products, viewAllCard, isScrollable = false }: { products: ActivityProps[], viewAllCard?: any, isScrollable?: boolean }) {
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
      const duration = 3000; // 1.2s for much slower and smoother scroll
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

      {/* Netflix-style scroll buttons (Desktop medium+ screens only) */}
      {isScrollable && (
        <>
          <button
            onClick={() => scrollContainer('left')}
            className={`tour-builder-scroll-arrow ${canScrollLeft ? 'show-arrow' : ''}`}
            style={{ position: 'absolute', left: '-32px', top: 0, bottom: 0, width: '160px', zIndex: 10, background: 'linear-gradient(to right, rgba(11,11,11,1) 0%, transparent 100%)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: '24px', opacity: 0, transition: 'opacity 0.2s', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '16px' }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; scrollContainer('left'); }}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
          >
            &#10094;
          </button>

          <button
            onClick={() => scrollContainer('right')}
            className={`tour-builder-scroll-arrow ${canScrollRight ? 'show-arrow' : ''}`}
            style={{ position: 'absolute', right: '-32px', top: 0, bottom: 0, width: '160px', zIndex: 10, background: 'linear-gradient(to left, rgba(11,11,11,1) 0%, transparent 100%)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: '24px', opacity: 0, transition: 'opacity 0.2s', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '16px' }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; scrollContainer('right'); }}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
          >
            &#10095;
          </button>
        </>
      )}

      {/* ─── Horizontal Scrolling Flex Layout ─── */}
      <div className={isScrollable ? "hide-scrollbar tour-builder-scroll-container" : ""} ref={scrollRef} onScroll={checkScroll} style={isScrollable ? {
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
        {filteredActivities.map((act) => (
          <ActivityCard key={act._id} activity={act} isScrollable={isScrollable} />
        ))}

        {/* View All Card */}
        {viewAllCard && (
          <div
            className={`feature-card-dark ${isScrollable ? 'tour-builder-scroll-item' : ''}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: '0 0 max(280px, calc((100% - var(--layout-padding-left, 0px) - (4 * var(--spacing-lg))) / 4.5))',
              minHeight: '480px',
              padding: 0,
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative'
            }}
            onClick={() => window.location.href = '/trips'}
          >
            {/* Background Image with Low-Res Blur Placeholder & Next.js Image */}
            {viewAllCard.image && (
              <>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${urlFor(viewAllCard.image).width(20).blur(50).url()})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(15px)',
                    transform: 'scale(1.15)',
                    zIndex: 0,
                    opacity: 0.4
                  }}
                />
                <Image
                  src={urlFor(viewAllCard.image).url()}
                  alt={viewAllCard.title || 'View All Expeditions'}
                  fill
                  style={{ objectFit: 'cover', zIndex: 0, opacity: 0.4 }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </>
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

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/client';

export function AccordionGallery({ images, isWide }: { images?: any[]; isWide?: boolean }) {
  const hasImages = images && images.length > 0;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleCardClick = (index: number) => {
    if (activeIndex === index) {
      // Card is already open! This is where you can connect your future Enlarge / Modal Lightbox action
      console.log(`Sector 0${index + 1} clicked while active. Ready to Enlarge/Open!`);
    } else {
      setActiveIndex(index);
    }
  };
  
  return (
    <div className={`accordion-gallery ${isWide ? 'accordion-gallery-wide' : ''}`}>
      {hasImages ? (
        images.map((img: any, i: number) => (
          <div
            key={i}
            className={`accordion-item ${activeIndex === i ? 'is-active' : 'is-inactive'}`}
            style={{ position: 'relative', overflow: 'hidden' }}
            onClick={() => handleCardClick(i)}
            onMouseEnter={() => setActiveIndex(i)}
          >
            {/* Instant Low-Res Blur Placeholder */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${urlFor(img).width(20).blur(50).url()})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(15px)',
                transform: 'scale(1.15)',
                zIndex: 0,
              }}
            />
            {/* High-Resolution Optimized Image */}
            <Image
              src={urlFor(img).url()}
              alt={img.alt || `Sector 0${i + 1}`}
              fill
              style={{ objectFit: 'cover', zIndex: 1 }}
              sizes="(max-width: 768px) 85vw, 50vw"
            />
            <div className="accordion-overlay" style={{ zIndex: 2 }}>
              <span className="accordion-number">0{i + 1}</span>
              <span className="accordion-text">{img.alt || `Sector 0${i + 1}`}</span>
            </div>
          </div>
        ))
      ) : (
        <>
          {['Alpine Insertions', 'Marine Assets', 'Overland Traverse', 'Remote Outposts'].map((text, i) => {
            const bg = i === 0 || i === 3 ? 'glacier_landing' : i === 1 ? 'yacht_charter' : 'off_road';
            return (
              <div 
                key={i}
                className={`accordion-item ${activeIndex === i ? 'is-active' : 'is-inactive'}`}
                style={{ position: 'relative', overflow: 'hidden' }}
                onClick={() => handleCardClick(i)}
                onMouseEnter={() => setActiveIndex(i)}
              >
                {/* Instant Low-Res Blur Placeholder for fallback images */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(/images/${bg}.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(20px)',
                    transform: 'scale(1.15)',
                    opacity: 0.6,
                    zIndex: 0,
                  }}
                />
                {/* High-Resolution Fallback Image */}
                <Image
                  src={`/images/${bg}.png`}
                  alt={text}
                  fill
                  style={{ objectFit: 'cover', zIndex: 1 }}
                  sizes="(max-width: 768px) 85vw, 50vw"
                />
                <div className="accordion-overlay" style={{ zIndex: 2 }}>
                  <span className="accordion-number">0{i + 1}</span>
                  <span className="accordion-text">{text}</span>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

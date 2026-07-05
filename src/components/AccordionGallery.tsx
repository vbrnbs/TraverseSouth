'use client';

import React, { useState } from 'react';
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
            style={{ backgroundImage: `url(${urlFor(img).url()})` }}
            onClick={() => handleCardClick(i)}
            onMouseEnter={() => setActiveIndex(i)}
          >
            <div className="accordion-overlay">
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
                style={{ backgroundImage: `url(/images/${bg}.png)` }}
                onClick={() => handleCardClick(i)}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <div className="accordion-overlay">
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

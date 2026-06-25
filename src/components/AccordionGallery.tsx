'use client';

import React, { useEffect, useRef, useState } from 'react';
import { urlFor } from '@/sanity/client';

export function AccordionGallery({ images }: { images: any[] }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Only apply IntersectionObserver on mobile
    if (window.innerWidth > 768) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveIndex(index);
          }
        });
      },
      {
        root: null,
        // Trigger when the element crosses the vertical middle of the screen
        rootMargin: '-50% 0px -49% 0px',
        threshold: 0
      }
    );

    const currentItems = itemsRef.current;
    currentItems.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      currentItems.forEach((el) => {
        if (el) observer.unobserve(el);
      });
      observer.disconnect();
    };
  }, []);

  const hasImages = images && images.length > 0;
  
  return (
    <div className="accordion-gallery">
      {hasImages ? (
        images.map((img: any, i: number) => (
          <div
            key={i}
            ref={(el) => { itemsRef.current[i] = el; }}
            data-index={i}
            className={`accordion-item ${activeIndex === i ? 'is-active' : ''}`}
            style={{ backgroundImage: `url(${urlFor(img).url()})` }}
          >
            <div className="accordion-overlay">
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
                ref={(el) => { itemsRef.current[i] = el; }}
                data-index={i}
                className={`accordion-item ${activeIndex === i ? 'is-active' : ''}`}
                style={{ backgroundImage: `url(/images/${bg}.png)` }}
              >
                <div className="accordion-overlay"><span className="accordion-text">{text}</span></div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { urlFor } from '@/sanity/client';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export function AccordionGallery({ images }: { images: any[] }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Only apply scroll-based interaction on mobile
    if (window.innerWidth > 768) return;

    const itemCount = images && images.length > 0 ? images.length : 4;
    
    // Map the 0-1 progress to an array index
    const index = Math.min(
      Math.floor(latest * itemCount),
      itemCount - 1
    );
    
    // latest will be 0 before the container reaches center, and 1 after it passes
    if (latest > 0 && latest < 1) {
      setActiveIndex(index);
    } else {
      setActiveIndex(-1); // reset when completely out of bounds
    }
  });

  const handleMouseEnter = (index: number) => {
    if (window.innerWidth > 768) {
      setActiveIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 768) {
      setActiveIndex(-1);
    }
  };

  const hasImages = images && images.length > 0;
  
  const springConfig = { type: "spring" as const, stiffness: 300, damping: 30 };

  return (
    <div ref={containerRef} className="accordion-gallery" onMouseLeave={handleMouseLeave}>
      {hasImages ? (
        images.map((img: any, i: number) => (
          <motion.div
            layout
            transition={springConfig}
            key={i}
            data-index={i}
            onMouseEnter={() => handleMouseEnter(i)}
            className={`accordion-item ${activeIndex === i ? 'is-active' : ''}`}
            style={{ backgroundImage: `url(${urlFor(img).url()})` }}
          >
            <div className="accordion-overlay">
              <span className="accordion-text">{img.alt || `Sector 0${i + 1}`}</span>
            </div>
          </motion.div>
        ))
      ) : (
        <>
          {['Alpine Insertions', 'Marine Assets', 'Overland Traverse', 'Remote Outposts'].map((text, i) => {
            const bg = i === 0 || i === 3 ? 'glacier_landing' : i === 1 ? 'yacht_charter' : 'off_road';
            return (
              <motion.div 
                layout
                transition={springConfig}
                key={i}
                data-index={i}
                onMouseEnter={() => handleMouseEnter(i)}
                className={`accordion-item ${activeIndex === i ? 'is-active' : ''}`}
                style={{ backgroundImage: `url(/images/${bg}.png)` }}
              >
                <div className="accordion-overlay"><span className="accordion-text">{text}</span></div>
              </motion.div>
            );
          })}
        </>
      )}
    </div>
  );
}

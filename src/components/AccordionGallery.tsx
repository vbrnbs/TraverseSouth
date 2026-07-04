import React from 'react';
import { urlFor } from '@/sanity/client';

export function AccordionGallery({ images }: { images?: any[] }) {
  const hasImages = images && images.length > 0;
  
  return (
    <div className="accordion-gallery">
      {hasImages ? (
        images.map((img: any, i: number) => (
          <div
            key={i}
            className="accordion-item"
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
                className="accordion-item"
                style={{ backgroundImage: `url(/images/${bg}.png)` }}
              >
                <div className="accordion-overlay">
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

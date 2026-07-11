'use client';

import React from 'react';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/sanity/client';
import { portableTextComponents } from '@/components/PortableTextComponents';

export interface DayItem {
  dayNumber: string | number;
  title: string;
  description: string;
  logistics?: string;
}

export interface PackageTimelineProps {
  overview?: any;
  days?: DayItem[];
}

export function PackageTimeline({ overview, days = [] }: PackageTimelineProps) {
  return (
    <div className="package-timeline-container">
      {overview && (
        <>
          <p
            className="typography-mono-eyebrow"
            style={{ marginBottom: '16px', color: 'var(--colors-mute)' }}
          >
            // EXPEDITION CHARTER OVERVIEW
          </p>
          {Array.isArray(overview) ? (
            <div
              style={{
                fontSize: '18px',
                lineHeight: 1.7,
                color: 'var(--colors-ash)',
                marginBottom: 'var(--spacing-xxl)',
              }}
            >
              <PortableText value={overview} components={portableTextComponents} />
            </div>
          ) : (
            <p
              style={{
                fontSize: '20px',
                lineHeight: 1.7,
                color: 'var(--colors-ash)',
                marginBottom: 'var(--spacing-xxl)',
                letterSpacing: '-0.2px',
              }}
            >
              {overview}
            </p>
          )}
        </>
      )}

      {days && days.length > 0 && (
        <>
          <p
            className="typography-mono-eyebrow"
            style={{ marginBottom: 'var(--spacing-xl)', color: 'var(--colors-mute)' }}
          >
            // DAY-BY-DAY VISUAL TIMELINE
          </p>
          <div>
            {days.map((day) => (
              <div className="timeline-day" key={day.dayNumber}>
                <div className="day-badge">{day.dayNumber}</div>
                <h3 className="day-title">{day.title}</h3>
                <p className="day-description">{day.description}</p>
                {day.logistics && (
                  <div className="day-logistics">
                    <strong>LOGISTICAL ENVELOPE:</strong> {day.logistics}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

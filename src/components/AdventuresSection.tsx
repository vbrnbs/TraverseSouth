'use client';

import React from 'react';
import { ActivityGrid } from '@/components/ActivityGrid';

export interface AdventuresProps {
  eyebrow?: string;
  heading?: string;
  subtitle?: string;
  viewAllCard?: any;
}

export function AdventuresSection({
  data,
  activities = [],
}: {
  data?: AdventuresProps;
  activities?: any[];
}) {
  return (
    <section
      id="adventures"
      className="marketing-section-dark"
      style={{ borderTop: '1px solid var(--colors-hairline-soft)' }}
    >
      <div className="container" id="modules">
        <p
          className="typography-mono-eyebrow"
          style={{
            marginBottom: '24px',
            color: 'var(--colors-brand)',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
          }}
        >
          {data?.eyebrow || '// THE MANIFEST'}
        </p>
        <h2
          className="typography-display-xl"
          style={{ marginBottom: '16px', color: '#fff' }}
        >
          {data?.heading || 'Premium Adventures Grid'}
        </h2>
        <p
          className="typography-subtitle"
          style={{ maxWidth: '600px', color: 'var(--colors-ash)' }}
        >
          {data?.subtitle ||
            'Surgical day modules filterable by gravity and wilderness intensity.'}
        </p>
      </div>

      {/* Full Bleed Scrolling Row */}
      <div
        style={
          {
            '--layout-padding-left':
              'max(var(--spacing-lg), calc((100% - 1640px) / 2 + var(--spacing-lg)))',
            width: '100%',
            paddingLeft: 'var(--layout-padding-left)',
            paddingRight: 'var(--spacing-lg)',
          } as React.CSSProperties
        }
      >
        <ActivityGrid
          products={activities}
          viewAllCard={data?.viewAllCard}
          isScrollable={true}
        />
      </div>
    </section>
  );
}

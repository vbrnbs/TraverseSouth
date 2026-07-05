'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

export default function StudioPage() {
  return (
    <div className="sanity-studio-container" style={{ height: '100vh', position: 'relative' }}>
      <NextStudio config={config} />
    </div>
  );
}

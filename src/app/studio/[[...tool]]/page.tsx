'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

export default function StudioPage() {
  return (
    <div className="sanity-studio-container" style={{ marginTop: '72px', height: 'calc(100vh - 72px)', position: 'relative' }}>
      <NextStudio config={config} />
    </div>
  );
}

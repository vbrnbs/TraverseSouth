'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // 1. Ensure we only run on the client
    if (typeof window === 'undefined') return;

    // 2. Prevent double-tracking identical pathnames in rapid succession (e.g. strict mode rendering)
    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;

    // 3. Resolve session token
    let sessionToken = sessionStorage.getItem('ts_analytics_session');
    if (!sessionToken) {
      sessionToken = 'ts-sess-' + Math.random().toString(36).substring(2, 15) + '-' + Date.now().toString(36);
      sessionStorage.setItem('ts_analytics_session', sessionToken);
    }

    // 4. Capture current stats
    const payload = {
      pathname,
      referrer: document.referrer || 'Direct',
      language: navigator.language || 'unknown',
      screenSize: `${window.innerWidth}x${window.innerHeight}`,
      userAgent: navigator.userAgent || 'unknown',
      sessionToken,
    };

    // 5. Fire silent request in idle/background
    const dispatchTrack = () => {
      fetch('/api/traffic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        keepalive: true, // keeps request alive even if page unloads
      }).catch(err => {
        // Silent catch to prevent visual log errors for travelers
        console.debug('Traffic tracking suppressed', err);
      });
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => dispatchTrack());
    } else {
      setTimeout(dispatchTrack, 1);
    }
  }, [pathname]);

  // Render nothing visually
  return null;
}

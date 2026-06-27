'use client';

import { usePathname } from 'next/navigation';

/**
 * Wraps children and only renders them when the route is NOT
 * under /admin or /studio. Used to hide the global Header and
 * Footer on internal dashboard / studio pages.
 */
export function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isInternal = pathname?.startsWith('/admin') || pathname?.startsWith('/studio');

  if (isInternal) return null;
  return <>{children}</>;
}

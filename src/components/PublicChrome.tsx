'use client';

import { usePathname } from 'next/navigation';

interface PublicChromeProps {
  children: React.ReactNode;
  hideOnStudio?: boolean;
}

/**
 * Wraps children and renders them based on route rules.
 * Hides on /admin by default, and optionally on /studio.
 */
export function PublicChrome({ children, hideOnStudio = true }: PublicChromeProps) {
  const pathname = usePathname();
  
  if (pathname?.startsWith('/admin')) return null;
  if (hideOnStudio && pathname?.startsWith('/studio')) return null;

  return <>{children}</>;
}

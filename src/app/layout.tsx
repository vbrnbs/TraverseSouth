import type { Metadata } from 'next';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity/visual-editing';
import { Button } from '@/components/Button';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.traversesouth.co.nz/'),
  title: 'Traverse South | Private Heli-Ski, Mountaineering & Fiord Charters',
  description: 'Travel tailored to the South Island. A zero-friction, modular luxury portal for premium high-gravity adventures.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const isDraft = (await draftMode()).isEnabled;

  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable}`}>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0b0b0b', color: '#b9b9b9', margin: 0 }}>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        {pixelId && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${pixelId}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}

        <AnalyticsTracker />
        <Analytics />

        {/* Global Navigation Header */}
        <nav className="nav-bar-dark">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="brand-dot"></div>
            <a href="/" className="typography-heading-md" style={{ fontWeight: 500, letterSpacing: '-0.32px', fontSize: '20px', color: '#fff' }}>
              Traverse South
            </a>
          </div>
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center' }}>
            <a href="/#modules" className="nav-link">Expeditions</a>
            <a href="/#engine" className="nav-link">Experience Engine</a>
          </div>
          <div className="nav-actions">
            <Button variant="secondary-dark" href="/#engine">Curate Journey</Button>
          </div>
        </nav>

        {/* Page Content */}
        <div style={{ flex: 1 }}>
          {children}
        </div>

        {/* Global Footer */}
        <footer className="footer" style={{ borderTop: '1px solid var(--colors-hairline-soft)' }}>
          <div className="container">
            <div className="footer-grid">
              <div>
                <p className="typography-mono-caps" style={{ color: 'var(--colors-mute)', marginBottom: '16px' }}>EXPEDITIONS</p>
                <div className="footer-col-links">
                  <a href="/itinerary/fiordland" className="typography-caption">Fiordland sovereign</a>
                  <a href="/itinerary/qt-mtcook" className="typography-caption">Alpine Adrenaline</a>
                  <a href="/itinerary/relax" className="typography-caption">Active Restoration</a>
                </div>
              </div>
              <div>
                <p className="typography-mono-caps" style={{ color: 'var(--colors-mute)', marginBottom: '16px' }}>CONNECT</p>
                <div className="footer-col-links">
                  <a href="mailto:concierge@traversesouth.co.nz" className="typography-caption">concierge@traversesouth.co.nz</a>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                    <a href="https://instagram.com/traversesouth" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: 'var(--colors-ash)' }}>
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051c-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                    </a>
                    <a href="https://facebook.com/traversesouth" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: 'var(--colors-ash)' }}>
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                      </svg>
                    </a>
                    <a href="https://x.com/traversesouth" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)" style={{ color: 'var(--colors-ash)' }}>
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <p className="typography-mono-caps" style={{ color: 'var(--colors-mute)', marginBottom: '16px' }}>LEGAL</p>
                <div className="footer-col-links">
                  <a href="/legal" className="typography-caption">Legal & Terms Portal</a>
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              <p className="typography-caption" style={{ color: 'var(--colors-mute)' }}>© 2026 Traverse South. All rights reserved.</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="brand-dot"></div>
                <span style={{ fontWeight: 500, letterSpacing: '-0.32px', fontSize: '16px', color: '#fff' }}>Traverse South</span>
              </div>
            </div>
          </div>
        </footer>

        {isDraft && (
          <VisualEditing
            refresh={async () => {
              'use server';
              const { revalidatePath } = await import('next/cache');
              revalidatePath('/', 'layout');
            }}
          />
        )}
      </body>
    </html>
  );
}

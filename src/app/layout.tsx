import type { Metadata } from 'next';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity/visual-editing';
import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { PublicChrome } from '@/components/PublicChrome';


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

        {/* Global Navigation Header (hidden on /admin and /studio) */}
        <PublicChrome>
          <Header />
        </PublicChrome>

        {/* Page Content */}
        <div style={{ flex: 1 }}>
          {children}
        </div>

        {/* Global Footer (hidden on /admin and /studio) */}
        <PublicChrome>
        <footer className="footer" style={{ borderTop: '1px solid var(--colors-hairline-soft)', backgroundColor: '#0b0b0b', padding: 'var(--spacing-section) 0' }}>
          <div className="container">
            <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '64px' }}>
              <div>
                <p className="typography-mono-caps" style={{ color: 'var(--colors-mute)', marginBottom: '16px', fontSize: '11px', letterSpacing: '1.5px' }}>EXPEDITIONS</p>
                <div className="footer-col-links" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a href="/itinerary/fiordland" className="typography-caption" style={{ color: 'var(--colors-ash)', textDecoration: 'none' }}>Fiordland Sovereign</a>
                  <a href="/itinerary/qt-mtcook" className="typography-caption" style={{ color: 'var(--colors-ash)', textDecoration: 'none' }}>Alpine Adrenaline</a>
                  <a href="/itinerary/relax" className="typography-caption" style={{ color: 'var(--colors-ash)', textDecoration: 'none' }}>Active Restoration</a>
                </div>
              </div>
              
              <div>
                <p className="typography-mono-caps" style={{ color: 'var(--colors-mute)', marginBottom: '16px', fontSize: '11px', letterSpacing: '1.5px' }}>CONNECT</p>
                <div className="footer-col-links" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a href="mailto:concierge@traversesouth.co.nz" className="typography-caption" style={{ color: 'var(--colors-ash)', textDecoration: 'none' }}>concierge@traversesouth.co.nz</a>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                    <a href="https://instagram.com/traversesouth" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: 'var(--colors-ash)' }}>
                      Instagram
                    </a>
                    <a href="https://facebook.com/traversesouth" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: 'var(--colors-ash)' }}>
                      Facebook
                    </a>
                    <a href="https://x.com/traversesouth" target="_blank" rel="noopener noreferrer" aria-label="X" style={{ color: 'var(--colors-ash)' }}>
                      X
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <p className="typography-mono-caps" style={{ color: 'var(--colors-mute)', marginBottom: '16px', fontSize: '11px', letterSpacing: '1.5px' }}>LEGAL</p>
                <div className="footer-col-links" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a href="/legal" className="typography-caption" style={{ color: 'var(--colors-ash)', textDecoration: 'none' }}>Legal & Terms Portal</a>
                </div>
              </div>

              {/* Minimalist Newsletter Capture */}
              <div>
                <p className="typography-mono-caps" style={{ color: 'var(--colors-mute)', marginBottom: '16px', fontSize: '11px', letterSpacing: '1.5px' }}>// COMMUNICATIONS</p>
                <div style={{ maxWidth: '320px' }}>
                  <form style={{ display: 'flex', borderBottom: '1px solid var(--colors-hairline-soft)', paddingBottom: '8px' }}>
                    <input 
                      type="email" 
                      placeholder="Enter email manifest" 
                      required
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#fff', 
                        fontSize: '13px', 
                        fontFamily: 'inherit',
                        outline: 'none', 
                        flex: 1 
                      }} 
                    />
                    <button 
                      type="submit" 
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: 'var(--colors-brand)', 
                        cursor: 'pointer', 
                        fontSize: '16px', 
                        fontWeight: 'bold',
                        padding: '0 4px'
                      }}
                    >
                      →
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--colors-hairline-soft)', paddingTop: '32px' }}>
              <p className="typography-caption" style={{ color: 'var(--colors-mute)', margin: 0 }}>© 2026 Traverse South. All rights reserved.</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="brand-dot"></div>
                <span style={{ fontWeight: 500, letterSpacing: '-0.32px', fontSize: '16px', color: '#fff' }}>Traverse South</span>
              </div>
            </div>
          </div>
        </footer>
        </PublicChrome>

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

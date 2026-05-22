import type { Metadata } from 'next';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity/visual-editing';

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
  title: 'Traverse South | Go Beyond',
  description: 'Travel tailored to the South Island. A zero-friction, modular luxury portal.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const isDraft = (await draftMode()).isEnabled;

  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable}`}>
      <body>
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
        <AnalyticsTracker />
        <Analytics />
        {children}
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




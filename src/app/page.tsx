import React from 'react';
import { Button } from '@/components/Button';
import { sanityClient, previewClient, urlFor } from '@/sanity/client';
import { homepageQuery } from '@/sanity/queries';
import { ScrollObserver } from '@/components/ScrollObserver';
import { draftMode } from 'next/headers';

/* ═══════════════════════════════════════════════
   Server Component — fetches 100% dynamically from
   Sanity Studio at request/build time.
   ═══════════════════════════════════════════════ */

export default async function Home() {
  let data: any = null;
  const isDraft = (await draftMode()).isEnabled;
  const client = isDraft ? previewClient : sanityClient;

  try {
    data = await client.fetch(homepageQuery, {}, { cache: isDraft ? 'no-store' : 'force-cache' });
  } catch (error) {
    console.error('Error fetching homepage data from Sanity:', error);
  }

  if (!data) {
    return (
      <div style={{ background: '#0b0b0b', color: '#fff', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '8px', fontWeight: 500, letterSpacing: '-0.32px' }}>Traverse South</h1>
          <p style={{ color: '#888', fontSize: '14px' }}>Connecting to Sanity Studio. Please verify that your dataset is populated and the server is online.</p>
        </div>
      </div>
    );
  }

  const { hero, mission, categories, engine, footer } = data;


  return (
    <main>
      <ScrollObserver />
      {/* ═══════════════════════════════════════
          Navigation
          ═══════════════════════════════════════ */}
      <nav className="nav-bar-dark">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="brand-dot"></div>
          <span className="typography-heading-md" style={{ fontWeight: 500, letterSpacing: '-0.32px', fontSize: '20px' }}>Traverse South</span>
        </div>
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center' }}>
          <a href="#modules" className="nav-link">Modules</a>
          <a href="#mission" className="nav-link">Philosophy</a>
          <a href="#engine" className="nav-link">Build Your Own</a>
        </div>
        <div className="nav-actions" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="secondary-dark">Client Login</Button>
          <Button variant="primary">Curate Trip</Button>
        </div>
      </nav>

      {/* ═══════════════════════════════════════
          01. Hero
          ═══════════════════════════════════════ */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="typography-mono-eyebrow" style={{ marginBottom: '24px', color: 'var(--colors-mute)' }}>
            {hero.eyebrow}
          </p>
          <h1 className="typography-display-mega" style={{ maxWidth: '1200px', marginBottom: '32px' }}>
            {hero.headline}
          </h1>
          <p className="typography-subtitle" style={{ maxWidth: '560px', color: 'var(--colors-ash)', marginBottom: '40px' }}>
            {hero.subtitle}
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Button variant="primary">{hero.primaryCta}</Button>
            <Button variant="secondary-dark">{hero.secondaryCta}</Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          02. Mission
          ═══════════════════════════════════════ */}
      <section id="mission" className="marketing-section-dark">
        <div className="container">
          <p className="typography-mono-eyebrow" style={{ marginBottom: '24px', color: 'var(--colors-mute)', textAlign: 'center' }}>
            {mission.eyebrow}
          </p>
          <h2 className="typography-display-sm" style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 0' }}>
            {mission.headline}
          </h2>

          <div className="photo-deck">
            {(mission?.photoDeck || []).map((item: any) => (
              <div className="photo-deck-item" key={item.label}>
                <div 
                  className="photo-deck-image"
                  style={{
                    backgroundImage: `url(${item.image ? urlFor(item.image).url() : ''})`
                  }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <h3 className="typography-display-sm" style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
            {mission.bodyText}
          </h3>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          03. Modules
          ═══════════════════════════════════════ */}
      <section id="modules" className="marketing-section-light" style={{ padding: 0 }}>
        <div style={{ padding: 'var(--spacing-section-lg) var(--spacing-lg) var(--spacing-xl)' }}>
          <div className="container">
            <p className="typography-mono-eyebrow" style={{ marginBottom: '24px', color: 'var(--colors-mute)' }}>
              // THE MODULES
            </p>
            <h2 className="typography-display-xl" style={{ marginBottom: '16px' }}>
              Stack perfectly into a 3-week expedition.
            </h2>
            <p className="typography-subtitle" style={{ maxWidth: '600px' }}>
              Three distinct regional packages, each approximately one week. Combine all three for the Ultimate New Zealand experience.
            </p>
          </div>
        </div>

        <div className="category-grid">
          {(categories || []).map((cat: any, i: number) => {
            const slugMap: Record<string, string> = {
              'Fiordland': 'fiordland',
              'Fiordland Sanctuary': 'fiordland',
              'QT & Mt. Cook': 'qt-mtcook',
              'Alpine Adrenaline': 'qt-mtcook',
              'Relax & Recover': 'relax',
              'Active Restoration': 'relax'
            };
            const slug = slugMap[cat.title] || cat.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            return (
              <a href={`/packages/${slug}`} className="category-block" key={cat.title}>
                <p className="typography-mono-eyebrow category-block-eyebrow">{cat.eyebrow}</p>
                <h3 className="typography-display-md category-block-title">{cat.title}</h3>
                <p className="typography-body category-block-description">{cat.description}</p>

                <div className="category-modules">
                  {cat.modules?.map((mod: any) => (
                    <div className="category-module-item" key={mod.number}>
                      <span className="typography-mono-micro">{mod.number}</span>
                      <span className="typography-body-sm">{mod.label}</span>
                    </div>
                  ))}
                </div>

                <span className="category-block-cta">
                  {cat.ctaText} <span>→</span>
                </span>

                <div className="category-block-image">
                  <div 
                    className="category-image-container"
                    style={{
                      backgroundImage: `url(${cat.image ? urlFor(cat.image).url() : ''})`
                    }}
                  >
                    {cat.imageCaption}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          04. Build Your Own
          ═══════════════════════════════════════ */}
      <section id="engine" className="engine-section">
        <div className="container">
          <div className="engine-grid">
            <div>
              <p className="typography-mono-eyebrow" style={{ marginBottom: '24px', color: 'var(--colors-mute)' }}>
                {engine.eyebrow}
              </p>
              <h2 className="typography-display-xl" style={{ marginBottom: '24px' }}>
                {engine.headline}
              </h2>
              <p className="typography-subtitle" style={{ color: 'var(--colors-ash)', marginBottom: '40px', maxWidth: '480px' }}>
                {engine.description}
              </p>
              <Button variant="brand">{engine.ctaText}</Button>
            </div>

            <div className="engine-visual">
              <div className="studio-window-chrome">
                <div className="studio-window-dot red"></div>
                <div className="studio-window-dot yellow"></div>
                <div className="studio-window-dot green"></div>
              </div>
              <p className="typography-mono-caps" style={{ color: 'var(--colors-mute)', marginBottom: '24px' }}>
                // LIVE SWAP ENGINE
              </p>
              {engine.swaps?.map((swap: any) => (
                <div className="engine-swap-row" key={swap.from}>
                  <span className="typography-body-sm engine-swap-from">{swap.from}</span>
                  <span className="engine-swap-arrow">→</span>
                  <span className="typography-body-sm engine-swap-to">{swap.to}</span>
                </div>
              ))}
              <div style={{ marginTop: '24px' }}>
                <p className="typography-body-sm" style={{ color: 'var(--colors-success)' }}>{engine.validationMessage}</p>
                <p className="typography-meta" style={{ color: 'var(--colors-mute)', marginTop: '8px' }}>{engine.pricingNote}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          Footer
          ═══════════════════════════════════════ */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            {footer.columns?.map((col: any) => (
              <div key={col.heading}>
                <p className="typography-mono-caps" style={{ color: 'var(--colors-mute)', marginBottom: '16px' }}>{col.heading}</p>
                <div className="footer-col-links">
                  {col.links?.map((link: any) => (
                    <a href={link.href} className="typography-caption" style={{ color: 'var(--colors-ash)' }} key={link.label}>{link.label}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="footer-bottom">
            <p className="typography-caption" style={{ color: 'var(--colors-mute)' }}>{footer.copyright}</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="brand-dot"></div>
              <span style={{ fontWeight: 500, letterSpacing: '-0.32px', fontSize: '16px' }}>Traverse South</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

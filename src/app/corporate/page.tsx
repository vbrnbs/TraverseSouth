import React from 'react';
import { Metadata } from 'next';
import { EmailInquiry, PackageSelectButton } from '@/components/EmailInquiry';
import { ReturnToMainLink } from '@/components/ReturnToMainLink';
import { CorporatePackages } from '@/components/CorporatePackages';
import { sanityClient, previewClient, urlFor } from '@/sanity/client';
import { corporatePageQuery } from '@/sanity/queries';
import { draftMode } from 'next/headers';

export const metadata: Metadata = {
  title: 'Corporate Workshops & Team Buildings | Traverse South',
  description: 'Where high-altitude adventure meets C-suite leadership. Bespoke multi-day wilderness journeys and turnkey infrastructure for executive teams, workshop creators, and speaker agencies across the Southern Alps.',
};

export const revalidate = 0;

/* ═══════════════════════════════════════════════════════════════════════════
   Server Component — fetches 100% dynamically from Sanity Studio (`corporatePage`).
   Design locked to exact layout specifications without SVG placeholders.
   ═══════════════════════════════════════════════════════════════════════════ */

export default async function CorporatePage() {
  let data: any = null;
  const isDraft = (await draftMode()).isEnabled;
  const client = isDraft ? previewClient : sanityClient;

  try {
    data = await client.fetch(corporatePageQuery, {}, { next: { revalidate: 0 } });
  } catch (error) {
    console.error('Error fetching corporatePage data from Sanity:', error);
  }

  /* Fallback values preserving exact content in case fields are unseeded in Studio */
  const hero = data?.hero || {
    eyebrow: '// SOUTHERN ALPS EXECUTIVE EXPEDITIONS',
    heading: 'Corporate Workshops & Team Buildings.',
    subtitle: 'Where high-altitude adventure meets C-suite leadership. Bespoke multi-day wilderness journeys and turnkey infrastructure for executive teams, workshop creators, and speaker agencies across the Southern Alps.',
    ctaButton: { label: 'Inquire Now →', href: '#manifest' },
  };

  const workshops = data?.workshopsSection || {
    eyebrow: '// CORE LEADERSHIP FRAMEWORKS',
    heading: 'Types of Workshops & Frameworks We Offer:',
    description: 'We pair world-class facilitators and agencies with our South Island infrastructure across six foundational performance domains. Focused, short, and uncompromising:',
    cards: [
      {
        eyebrow: '01 /',
        title: 'Risk Management',
        description: 'Navigating extreme volatility, crisis leadership, and high-consequence risk governance.',
      },
      {
        eyebrow: '02 /',
        title: 'Decision Making',
        description: 'Strategic execution, cognitive clarity, and judgment under severe uncertainty and fatigue.',
      },
      {
        eyebrow: '03 /',
        title: 'Team Coherence',
        description: 'Forging unbreakable interpersonal trust and role alignment across C-suite boards.',
      },
      {
        eyebrow: '04 /',
        title: 'Innovation Under Duress',
        description: 'Engineering-grade lateral thinking and problem-solving when systems are pressured.',
      },
      {
        eyebrow: '05 /',
        title: 'Resilience',
        description: 'Autonomic nervous system regulation, stress architecture mastery, and recovery protocols.',
      },
      {
        eyebrow: '06 /',
        title: 'Limiting Beliefs',
        description: 'Shattering perceived personal and organizational limitations through visceral physical challenge.',
      },
    ],
  };

  const infrastructure = data?.infrastructureSection || {
    leftColumn: {
      eyebrow: '// THE HUMAN ELEMENT',
      heading: 'Co-Design Hand-in-Hand with Facilitators.',
      description: 'We don\'t replace your executive coach or workshop creator — we amplify them. Our specialized ops team works directly with speaker agencies, facilitators, and internal HR leaders to map curriculum timing directly onto physical wilderness challenges.',
      bulletPoints: [
        { title: 'Seamless Curriculum Integration', text: 'We map your workshop agenda, reflection hours, and keynote timing to our alpine logistics so transitions feel effortless.' },
        { title: 'Dedicated Wilderness Lodge Venues', text: 'From backcountry huts to private ultra-luxury mountain stations equipped with high-speed Starlink and dedicated meeting spaces.' },
        { title: 'Elite Facilitator Support Protocol', text: 'Facilitators focus 100% on group dynamics while our guides handle terrain safety, gourmet meals, and equipment.' },
      ],
    },
    rightColumn: {
      eyebrow: '// ZERO LOGISTICS FRICTION',
      heading: 'Sovereign Operations & Turnkey Execution.',
      description: 'Southern Alps weather is volatile, and complex logistics can derail even the best workshops. We act as your private operations safeguard, handling every detail around the activity so you and your participants never deal with admin or disruption.',
      bulletPoints: [
        { title: 'Dedicated Ops Agent on Standby', text: 'Live satellite monitoring and real-time contingency routing. If weather shifts, we execute seamless alternative plans instantly.' },
        { title: 'Private Aviation & Transport Charter', text: 'Turnkey helicopter insertions, jet boat transfers, and luxury ground transport managed under one unified schedule.' },
        { title: 'Single Consolidated Corporate Invoice', text: 'One straightforward contract and billing structure covering all guides, lodging, aviation, gear, and dining.' },
      ],
    },
  };

  const advantage = data?.advantageSection || {
    sectionTitle: 'Traverse South Advantage',
    columns: [
      { title: 'The Zero-Admin Protocol', description: 'All ground logistics, aviation charters, and private alpine lodges bundled cleanly into a single, cohesive corporate invoice.' },
      { title: 'Seamless Weather Pivot', description: 'When winds ground helicopters, our Ops Agent restructures your alpine route to private lodges or saunas in under 60 minutes.' },
      { title: 'Boardroom to Backcountry', description: 'Private wilderness lodges equipped with high-speed Starlink and executive boardroom setups — blending focus with recovery.' },
    ],
  };

  const packages = data?.packagesSection || {
    eyebrow: '// TURNKEY LOGISTICAL PACKAGES',
    heading: 'Curated Packages for Executive Offsites.',
    description: 'Pre-engineered logistical packages built to host high-gravity leadership curricula. Whether you are an executive team or a workshop facilitator, each tier includes complete ground logistics, private guiding, and adaptable schedule structure.',
    packagesList: [
      {
        tierEyebrow: 'PACKAGE 01 // REGIONAL & ACTIVE TEAMS',
        title: 'Base Adventure Package',
        description: 'High-energy outdoor challenges combined with luxury Queenstown apartment lodging and dedicated workshop spaces. Ideal for active leadership teams and regional offsites.',
        isFeaturedDarkTheme: false,
        packageId: 'Base Adventure Package',
        buttonLabel: 'Select Base Package →',
        inclusions: [
          'Luxury Apartment Lodging (Single Occupancy Executive Rooms)',
          'Private Guided Packrafting & Backcountry River Challenges',
          'Helicopter Mountain Insertion & Alpine Ridgeline Trekking',
          'All Dedicated Private Ground Transfers & Logistics',
        ],
      },
      {
        tierEyebrow: 'PACKAGE 02 // BOARD & LEADERSHIP TEAMS',
        title: 'Core Executive Offsite Package',
        description: 'Our benchmark executive alignment package. Private wilderness lodge isolation, alpine insertions, dedicated boardroom facilities, private chefs, and wood-fired backcountry saunas.',
        isFeaturedDarkTheme: true,
        packageId: 'Core Executive Offsite Package',
        buttonLabel: 'Select Core Offsite Package →',
        inclusions: [
          'Exclusive Private Wilderness Lodge (Complete Isolation)',
          'Private Heli-Packrafting Expedition & Glacier Landing Access',
          'Backcountry Wood-Fired Sauna & Cold Plunge Sessions',
          'Private Chef for All Gourmet Meals & Wild Alpine Lunches',
          'Dedicated Boardroom Space & High-Speed Starlink Connectivity',
        ],
      },
      {
        tierEyebrow: 'PACKAGE 03 // C-SUITE & PE PARTNERS',
        title: 'Sovereign Expedition Package',
        description: 'Absolute privacy and complete isolation. Remote station lodging accessible only by air, private aviation fleets on-call, and fully bespoke 24/7 concierge monitoring for C-suite boards.',
        isFeaturedDarkTheme: false,
        packageId: 'Sovereign Expedition Package',
        buttonLabel: 'Select Sovereign Package →',
        inclusions: [
          'Private High-Country Station & Remote Alpine Lodge Exclusive Buyout',
          'On-Call Private Helicopter Fleet & Glacier Summit Insertions',
          'Bespoke Multi-Day Wilderness Progression & High-Consequence Scenarios',
          '24/7 Dedicated Ops Agent, Private Chefs & Concierge Team',
          'Complete White-Glove Privacy & Security Protocols',
        ],
      },
    ],
  };

  const inquiry = data?.inquirySection || {
    leftEditorial: {
      eyebrow: '// EXECUTIVE CONCIERGE ACCESS',
      heading: 'Initiate Your Corporate Manifest.',
      description: 'Every corporate offsite is custom-engineered to match your team\'s operational objectives, fitness profiles, and curriculum requirements. Whether you are an internal C-suite leader, executive coach, or speaker agency, initiate contact below to schedule a private consultation with our Experience Architect.',
      commitmentsBox: {
        eyebrow: '// OPERATIONAL COMMITMENTS',
        items: [
          '4-Hour Response SLA during NZ Business Hours',
          'Single Consolidated Corporate Invoice',
          'Direct Concierge & Ops Agent Access',
        ],
      },
    },
    formConfig: {
      formEyebrow: '// INITIALIZE CORPORATE RETREAT MANIFEST',
      formSubtitle: 'Configure your expedition requirements below. We handle all logistics, aviation, and lodging.',
      defaultSubject: 'Corporate Expedition & Retreat Inquiry',
      responseGuaranteeText: '✓ Response Guarantee: Within 4 hours during NZ business hours.',
    },
  };

  return (
    <main style={{ backgroundColor: '#0b0b0b', color: '#b9b9b9', minHeight: '100vh', paddingTop: '120px' }}>

      {/* ─── Hero Section (Full Width-Height with Studio Background Image) ─── */}
      <section className="marketing-section-dark" style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: '64px',
        borderBottom: '1px solid var(--colors-hairline-soft)'
      }}>
        {/* Full-Bleed Hero Background Image from Sanity Studio */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          {hero.backgroundImage ? (
            <img
              src={urlFor(hero.backgroundImage).url()}
              alt={hero.heading || 'Hero background'}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', backgroundColor: '#141414' }} />
          )}
        </div>

        {/* Dark Gradient Overlay for Legibility */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(11,11,11,0.45) 0%, rgba(11,11,11,0.88) 100%)',
          zIndex: 1
        }} />

        {/* Hero Content on Z-Index 2 */}
        <div className="container" style={{ maxWidth: '1200px', position: 'relative', zIndex: 2, width: '100%', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
          <div style={{ alignSelf: 'flex-start', marginBottom: 'auto', paddingTop: '16px' }}>
            <ReturnToMainLink />
          </div>

          <div style={{ margin: 'auto 0', maxWidth: '960px', paddingBottom: '32px' }}>
            {hero.eyebrow && (
              <p className="typography-mono-eyebrow" style={{ color: 'var(--colors-brand)', marginBottom: '16px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                {hero.eyebrow}
              </p>
            )}
            <h1 className="typography-display-xl" style={{ color: '#fff', marginBottom: '24px', letterSpacing: '-2.88px', lineHeight: '1.05' }}>
              {hero.heading}
            </h1>
            {hero.subtitle && (
              <p className="typography-subtitle" style={{ color: 'var(--colors-ash)', fontSize: '20px', lineHeight: 1.6, maxWidth: '840px', marginBottom: '40px', whiteSpace: 'pre-line' }}>
                {hero.subtitle}
              </p>
            )}

            {hero.ctaButton && (
              <div>
                <a
                  href={hero.ctaButton.href || '#manifest'}
                  className="button button-primary"
                  style={{ textDecoration: 'none', height: '48px', padding: '0 32px', display: 'inline-flex', alignItems: 'center' }}
                >
                  {hero.ctaButton.label || 'Inquire Now →'}
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Section 2: Human Element & Infrastructure (2-Column Split: Facilitators vs Zero Logistics Friction) ─── */}
      <section className="marketing-section-dark" style={{ padding: '96px 0', borderBottom: '1px solid var(--colors-hairline-soft)' }}>
        <div className="container" style={{ maxWidth: '1280px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '64px', alignItems: 'start' }}>

            {/* Column 1: The Human Element & Facilitator Synergy */}
            <div style={{
              // backgroundColor: 'var(--colors-canvas-soft)',
              // borderRadius: 'var(--rounded-marketing)',
              // border: '1px solid var(--colors-hairline-soft)',
              padding: '44px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%'
            }}>
              <div>
                {infrastructure.leftColumn?.eyebrow && (
                  <p className="typography-mono-eyebrow" style={{ color: 'var(--colors-brand)', marginBottom: '16px', letterSpacing: '1px' }}>
                    {infrastructure.leftColumn.eyebrow}
                  </p>
                )}
                <h2 className="typography-display-md" style={{ color: '#fff', letterSpacing: '-1.5px', lineHeight: '1.1', marginBottom: '20px' }}>
                  {infrastructure.leftColumn?.heading}
                </h2>
                {infrastructure.leftColumn?.description && (
                  <p className="typography-body" style={{ color: 'var(--colors-ash)', fontSize: '16px', lineHeight: 1.7, marginBottom: '32px', whiteSpace: 'pre-line' }}>
                    {infrastructure.leftColumn.description}
                  </p>
                )}
              </div>
            </div>

            {/* Column 2: Zero Logistics Friction & Sovereign Operations */}
            <div style={{
              // backgroundColor: 'var(--colors-canvas-soft)',
              // borderRadius: 'var(--rounded-marketing)',
              // border: '1px solid var(--colors-hairline-soft)',
              padding: '44px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%'
            }}>
              {/* Studio Image Box */}
              <div style={{
                // height: '240px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid var(--colors-hairline-soft)',
                position: 'relative'
              }}>
                {infrastructure.rightColumn?.image ? (
                  <img
                    src={urlFor(infrastructure.rightColumn.image).url()}
                    alt={infrastructure.rightColumn?.imageCaption || 'Logistics Infrastructure'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#141414' }} />
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Section 3: Types of Workshops & Frameworks We Offer ─── */}
      <section className="marketing-section-light" style={{ backgroundColor: 'var(--colors-canvas-light)', color: 'var(--colors-ink)', padding: '96px 0', borderBottom: '1px solid var(--colors-hairline)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ marginBottom: '56px', maxWidth: '800px' }}>
            {workshops.eyebrow && (
              <p className="typography-mono-eyebrow" style={{ color: 'var(--colors-brand)', marginBottom: '12px', letterSpacing: '1px' }}>
                {workshops.eyebrow}
              </p>
            )}
            <h2 className="typography-display-md" style={{ color: 'var(--colors-ink)', letterSpacing: '-1.68px', lineHeight: '1.1', marginBottom: '16px' }}>
              {workshops.heading}
            </h2>
            {workshops.description && (
              <p className="typography-body" style={{ color: 'var(--colors-slate-soft)', fontSize: '17px', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                {workshops.description}
              </p>
            )}
          </div>

          {/* Horizontal Editorial Syllabus List */}
          <div style={{ borderTop: '1px solid var(--colors-hairline)' }}>
            {(workshops.cards || []).map((card: any, idx: number) => {
              const numStr = String(idx + 1).padStart(2, '0');
              return (
                <div
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '24px',
                    padding: '28px 0',
                    borderBottom: '1px solid var(--colors-hairline)',
                    alignItems: 'baseline'
                  }}
                >
                  <div>
                    <span className="typography-mono-caps" style={{ color: 'var(--colors-brand)', fontWeight: 600, marginRight: '16px' }}>
                      {card.eyebrow ? (card.eyebrow.includes('/') ? card.eyebrow : `${card.eyebrow} /`) : `${numStr} /`}
                    </span>
                    <h3 className="typography-heading-sm" style={{ color: 'var(--colors-ink)', display: 'inline', fontSize: '22px' }}>
                      {card.title}
                    </h3>
                  </div>
                  <p className="typography-body" style={{ color: 'var(--colors-slate-soft)', margin: 0, lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Section 4: The Traverse South Advantage (Full-Bleed 3-Equal Split Section with Studio Images) ─── */}
      <section className="marketing-section-dark" style={{ padding: 0, width: '100%', overflow: 'hidden' }}>
        <div style={{ padding: '44px 24px', textAlign: 'center', backgroundColor: '#0b0b0b', borderBottom: '1px solid #1a1a1a' }}>
          <p className="typography-mono-caps" style={{ color: 'var(--colors-brand)', letterSpacing: '2px', fontSize: '14px', margin: 0, fontWeight: 600, textTransform: 'uppercase' }}>
            // {advantage.sectionTitle || 'Traverse South Advantage'} //
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', width: '100%', gap: 0 }}>
          {(advantage.columns || []).map((col: any, idx: number) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                minHeight: '620px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '48px 36px',
                overflow: 'hidden',
                borderRight: idx < (advantage.columns.length - 1) ? '1px solid #1a1a1a' : 'none'
              }}
            >
              <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                {col.backgroundImage ? (
                  <img
                    src={urlFor(col.backgroundImage).url()}
                    alt={col.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#141414' }} />
                )}
              </div>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(11,11,11,0.65) 0%, rgba(11,11,11,0.88) 100%)', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 className="typography-display-sm" style={{ color: '#fff', marginBottom: '20px', letterSpacing: '-1px' }}>
                  {col.title}
                </h3>
                <p className="typography-body" style={{ color: 'var(--colors-ash)', maxWidth: '360px', lineHeight: 1.6, margin: '0 auto', whiteSpace: 'pre-line' }}>
                  {col.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Section 5: Turnkey Logistical Packages (Light/Dark Card Themes with Studio Header Images) ─── */}
      <CorporatePackages data={packages} />

      {/* ─── Section 6: Manifest Compiler (Dark Theme Split Page Layout) ─── */}
      <section id="manifest" className="marketing-section-dark" style={{ padding: '96px 0', borderTop: '1px solid var(--colors-hairline-soft)' }}>
        <div className="container" style={{ maxWidth: '1280px' }}>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '64px', alignItems: 'stretch' }}>

            {/* Left Column: Editorial Inquiry Details & Commitments */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <div>
                {inquiry.leftEditorial?.eyebrow && (
                  <p className="typography-mono-eyebrow" style={{ color: 'var(--colors-brand)', marginBottom: '16px', letterSpacing: '1px' }}>
                    {inquiry.leftEditorial.eyebrow}
                  </p>
                )}
                <h2 className="typography-display-lg" style={{ color: '#fff', letterSpacing: '-2px', lineHeight: '1.1', marginBottom: '24px' }}>
                  {inquiry.leftEditorial?.heading}
                </h2>
                {inquiry.leftEditorial?.description && (
                  <p className="typography-body" style={{ color: 'var(--colors-ash)', fontSize: '18px', lineHeight: 1.6, marginBottom: '36px', whiteSpace: 'pre-line' }}>
                    {inquiry.leftEditorial.description}
                  </p>
                )}
              </div>

              <div style={{ backgroundColor: 'var(--colors-canvas-soft)', padding: '32px', borderRadius: 'var(--rounded-marketing)', border: '1px solid var(--colors-hairline-soft)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 className="typography-mono-caps" style={{ color: '#fff', fontSize: '13px', letterSpacing: '1px', margin: 0 }}>
                  {inquiry.leftEditorial?.commitmentsBox?.eyebrow || '// OUR OPERATIONAL COMMITMENTS'}
                </h3>
                {(inquiry.leftEditorial?.commitmentsBox?.items || []).map((item: string, idx: number) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{ color: 'var(--colors-brand)', fontWeight: 'bold', fontSize: '16px' }}>✓</span>
                    <div>
                      <p style={{ color: '#fff', fontSize: '15px', fontWeight: 600, margin: '0 0 4px 0' }}>{item}</p>
                    </div>
                  </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                  <span style={{ color: 'var(--colors-brand)', fontWeight: 'bold', fontSize: '16px' }}>✓</span>
                  <div>
                    <p style={{ color: '#fff', fontSize: '15px', fontWeight: 600, margin: '0 0 4px 0' }}>Direct Concierge Access</p>
                    <p style={{ color: 'var(--colors-ash)', fontSize: '14px', margin: 0 }}>Prefer direct mail? Reach our executive desk immediately at <a href="mailto:contact@traversesouth.co.nz" style={{ color: '#fff', textDecoration: 'underline' }}>contact@traversesouth.co.nz</a>.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: EmailInquiry Form Component */}
            <div style={{ width: '100%', height: '100%' }}>
              <EmailInquiry
                variant="group-business"
                defaultSubject={inquiry.formConfig?.defaultSubject || 'Corporate Executive Alignment & Workshop Inquiry'}
              />
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

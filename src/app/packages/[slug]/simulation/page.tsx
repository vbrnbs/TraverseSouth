'use client';

import React, { useState, use } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { packagesData } from '@/data/packagesData';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CheckoutSimulationPage({ params }: PageProps) {
  const router = useRouter();
  const { slug } = use(params);
  const detail = packagesData[slug];

  if (!detail) {
    notFound();
  }

  // Interactive form states
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  // Processing states
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const steps = [
    'Verifying account details...',
    'Rerouting secure escrow node...',
    'Securing high-altitude aviation slots...',
    'Allocating wilderness safety guides...',
    'Generating encrypted boarding clearance...'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName || !cardNumber) {
      alert('Please populate the required guest information.');
      return;
    }

    setIsProcessing(true);
    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        setProcessStep(currentStep);
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        setIsSuccess(true);
      }
    }, 900);
  };

  // Generate a mock secure transit token and flight code
  const flightCode = `TS-${slug.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
  const coordinates = slug === 'fiordland' 
    ? '44.6414° S, 167.8974° E' 
    : slug === 'qt-mtcook' 
      ? '43.7342° S, 170.0962° E' 
      : '45.0312° S, 168.6626° E';
  const heliModel = slug === 'fiordland' 
    ? 'AS350 B3 Squirrel' 
    : slug === 'qt-mtcook' 
      ? 'Eurocopter EC130' 
      : 'MD500 Private Turbine';
  
  return (
    <main style={{ backgroundColor: '#0b0b0b', color: '#fff', minHeight: '100vh', padding: 'var(--spacing-xl) var(--spacing-lg)' }}>
      
      {/* Dynamic Embedded CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .checkout-container {
          max-width: 1100px;
          margin: 60px auto;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: var(--spacing-xxl);
        }
        .form-card {
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--colors-hairline-soft);
          padding: var(--spacing-xl);
          border-radius: var(--rounded-app-lg);
        }
        .summary-card {
          border-left: 1px solid var(--colors-hairline-soft);
          padding-left: var(--spacing-xl);
          height: fit-content;
        }
        .input-group {
          margin-bottom: var(--spacing-lg);
        }
        .input-label {
          font-family: var(--font-ibm-plex-mono), monospace;
          font-size: 11px;
          color: var(--colors-mute);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: block;
          margin-bottom: 6px;
        }
        .text-input {
          width: 100%;
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--colors-hairline-soft);
          color: #fff;
          padding: 12px var(--spacing-md);
          font-size: 14px;
          border-radius: var(--rounded-app-md);
          outline: none;
          transition: border-color 0.2s ease;
        }
        .text-input:focus {
          border-color: var(--colors-brand);
        }
        .submit-btn {
          width: 100%;
          height: 48px;
          background-color: var(--colors-brand);
          color: #fff;
          border: none;
          borderRadius: var(--rounded-app-md);
          font-family: var(--font-ibm-plex-mono), monospace;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }
        .submit-btn:hover {
          background-color: #d85348;
          transform: translateY(-1px);
        }
        .pass-container {
          max-width: 750px;
          margin: 60px auto;
          background: linear-gradient(135deg, #111 0%, #171717 100%);
          border: 2px solid var(--colors-brand);
          border-radius: 20px;
          padding: var(--spacing-xxl);
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }
        .pass-container::before {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(243,100,88,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        @media (max-width: 900px) {
          .checkout-container {
            grid-template-columns: 1fr;
            gap: var(--spacing-xl);
          }
          .summary-card {
            border-left: none;
            padding-left: 0;
            border-top: 1px solid var(--colors-hairline-soft);
            padding-top: var(--spacing-xl);
          }
        }
      ` }} />

      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--colors-hairline-soft)', paddingBottom: '20px', maxWidth: '1100px', margin: '0 auto' }}>
        <Link href={`/packages/${slug}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--colors-ash)' }}>
          <span style={{ fontSize: '18px' }}>←</span>
          <span style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Cancel Expedition Charter</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="brand-dot" style={{ backgroundColor: 'var(--colors-brand)', width: '8px', height: '8px', borderRadius: '50%', marginRight: '8px' }}></div>
          <span style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>TS / SECURE BILLING ENGINE</span>
        </div>
      </div>

      {!isSuccess ? (
        <div className="checkout-container">
          {/* Main payment form */}
          <div className="form-card">
            <h2 style={{ fontFamily: 'var(--font-waldenburg), serif', fontSize: '32px', fontWeight: 'normal', marginBottom: '24px', letterSpacing: '-0.8px' }}>
              Confirm Expedition Booking
            </h2>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="input-group">
                  <label className="input-label">Expedition Commander (Full Name) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Marcus Vance"
                    className="text-input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Secure Contact Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g., marcus@vancecap.com"
                    className="text-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Crisis Alert Mobile Phone</label>
                <input
                  type="tel"
                  placeholder="+64 21 000 0000"
                  className="text-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div style={{ margin: '32px 0 20px 0', borderTop: '1px solid var(--colors-hairline-soft)', paddingTop: '24px' }}>
                <h4 style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: '11px', color: 'var(--colors-brand)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
                  // PAYMENT INSTRUMENT DEPLOYMENT
                </h4>
              </div>

              <div className="input-group">
                <label className="input-label">Credit Card Number *</label>
                <input
                  type="text"
                  required
                  placeholder="4000 1234 5678 9010"
                  className="text-input"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="input-group">
                  <label className="input-label">Expiration Date *</label>
                  <input
                    type="text"
                    required
                    placeholder="MM / YY"
                    className="text-input"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Security Code (CVC) *</label>
                  <input
                    type="text"
                    required
                    placeholder="000"
                    className="text-input"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ marginTop: '32px' }}>
                <button type="submit" className="submit-btn" disabled={isProcessing}>
                  {isProcessing ? 'Processing Transaction...' : `Authorize Billing Account →`}
                </button>
              </div>
            </form>
          </div>

          {/* Checkout pricing and inclusions summary */}
          <div className="summary-card">
            <span className="typography-mono-eyebrow" style={{ color: 'var(--colors-brand)' }}>
              // EXPEDITION SUMMARY
            </span>
            <h3 style={{ fontFamily: 'var(--font-waldenburg), serif', fontSize: '28px', fontWeight: 'normal', margin: '8px 0 16px 0', letterSpacing: '-0.5px' }}>
              {detail.title}
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--colors-ash)', lineHeight: 1.6, marginBottom: '24px' }}>
              {detail.subtitle}
            </p>

            <div style={{ backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid var(--colors-hairline-soft)', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', color: 'var(--colors-mute)' }}>Package Base Rate</span>
                <span style={{ fontSize: '14px', fontWeight: 500 }}>{detail.pricing.priceString.split(' / ')[0]}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--colors-hairline-soft)', paddingTop: '12px', marginTop: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: 500 }}>Charter Total (NZD)</span>
                <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--colors-brand)' }}>
                  {detail.pricing.priceString.split(' / ')[0]}
                </span>
              </div>
            </div>

            <div>
              <span className="typography-mono-eyebrow" style={{ color: 'var(--colors-mute)', display: 'block', marginBottom: '12px' }}>
                // VERIFIED INCLUSIONS:
              </span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {detail.pricing.inclusions.slice(0, 4).map((inc, i) => (
                  <li key={i} style={{ fontSize: '13px', color: 'var(--colors-ash)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--colors-brand)' }}>✓</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        /* SUCCESS STATE: EXPEDITION CHARTER BOARDING PASS */
        <div className="pass-container">
          <div style={{ borderBottom: '1px dashed rgba(255,255,255,0.2)', paddingBottom: '24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: '11px', color: 'var(--colors-brand)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                // TRAVERSE SOUTH CHARTER PASS
              </span>
              <h2 style={{ fontFamily: 'var(--font-waldenburg), serif', fontSize: '36px', fontWeight: 'normal', margin: '4px 0 0 0', letterSpacing: '-1px' }}>
                Expedition Active
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: '10px', color: 'var(--colors-mute)' }}>CHARTER REFERENCE</span>
              <span style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: '16px', fontWeight: 600, color: '#fff', letterSpacing: '1px' }}>
                {flightCode}
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: '10px', color: 'var(--colors-mute)' }}>COMMANDER</span>
              <div style={{ fontSize: '16px', fontWeight: 500, color: '#fff', marginTop: '4px' }}>{fullName}</div>
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: '10px', color: 'var(--colors-mute)' }}>ROUTE PROFILE</span>
              <div style={{ fontSize: '16px', fontWeight: 500, color: '#fff', marginTop: '4px' }}>{detail.title}</div>
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: '10px', color: 'var(--colors-mute)' }}>LOGISTICAL STATUS</span>
              <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--colors-brand)', marginTop: '4px' }}>VERIFIED & CLEARED</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', borderBottom: '1px dashed rgba(255,255,255,0.2)', paddingBottom: '24px', marginBottom: '24px' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: '10px', color: 'var(--colors-mute)' }}>INSERTION COORDINATES</span>
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#fff', marginTop: '4px', fontFamily: 'var(--font-ibm-plex-mono), monospace' }}>
                {coordinates}
              </div>
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: '10px', color: 'var(--colors-mute)' }}>ASSIGNED ROTORCRAFT</span>
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#fff', marginTop: '4px' }}>
                {heliModel}
              </div>
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: '10px', color: 'var(--colors-mute)' }}>CREW ENVELOPE</span>
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#fff', marginTop: '4px' }}>
                Private Guided Group
              </div>
            </div>
          </div>

          {/* Immersive details: recommended packing checklist & briefing summary */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
            <div>
              <h4 style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: '11px', color: 'var(--colors-brand)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                // EXPEDITION COMMAND SECURITY COVENANT
              </h4>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--colors-ash)', margin: 0 }}>
                You will be contacted by our **Growth Concierge** within the next 45 minutes via your verified secure email (`{email}`) to coordinate bespoke gear fittings, specialized dietary profiles, and finalize the private charter flight manifest timings. Keep your secure device close.
              </p>
            </div>

            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '24px' }}>
              <h4 style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: '11px', color: 'var(--colors-mute)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                // REQUIRED GEAR ALIGNMENT
              </h4>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li style={{ fontSize: '12px', color: 'var(--colors-ash)' }}>• Gore-Tex Alpine Outerwear</li>
                <li style={{ fontSize: '12px', color: 'var(--colors-ash)' }}>• Technical Glacial Eyewear</li>
                <li style={{ fontSize: '12px', color: 'var(--colors-ash)' }}>• Backcountry First-Response Pack</li>
              </ul>
            </div>
          </div>

          {/* Barcode representation using CSS hairlines */}
          <div style={{ marginTop: '36px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ height: '36px', width: '100%', maxWidth: '400px', display: 'flex', gap: '3px', marginBottom: '8px' }}>
              {Array.from({ length: 48 }).map((_, i) => (
                <div 
                  key={i} 
                  style={{
                    backgroundColor: '#fff',
                    flexGrow: 1,
                    width: `${Math.random() > 0.4 ? (Math.random() > 0.6 ? 3 : 1) : 2}px`,
                    opacity: Math.random() > 0.15 ? 0.85 : 0.2
                  }} 
                />
              ))}
            </div>
            <span style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: '9px', color: 'var(--colors-mute)', letterSpacing: '3px' }}>
              TS-SYSTEM-SECURE-HANDSHAKE-SUCCESS
            </span>
          </div>

          {/* Return Home Button */}
          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <Link href="/" className="submit-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '200px' }}>
              Return to Lodge
            </Link>
          </div>
        </div>
      )}

      {/* Redirecting transaction backdrop spinner */}
      {isProcessing && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(11, 11, 11, 0.95)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '2px solid rgba(243, 100, 88, 0.1)',
            borderTop: '2px solid var(--colors-brand)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '32px'
          }} />
          <p style={{
            fontFamily: 'var(--font-ibm-plex-mono), monospace',
            fontSize: '11px',
            color: 'var(--colors-brand)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '12px'
          }}>
            // TRANSACTION ROUTING IN PROGRESS
          </p>
          <h3 style={{
            fontFamily: 'var(--font-waldenburg), serif',
            fontSize: '28px',
            fontWeight: 'normal',
            textAlign: 'center',
            maxWidth: '500px',
            lineHeight: 1.4
          }}>
            {steps[processStep]}
          </h3>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}} />
        </div>
      )}

    </main>
  );
}

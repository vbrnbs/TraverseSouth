'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './Button';

interface EmailInquiryProps {
  variant?: 'tailor-made' | 'group-business';
  defaultSubject?: string;
  defaultPackage?: string;
}

export function PackageSelectButton({ packageName, label, className, style }: { packageName: string; label: string; className?: string; style?: React.CSSProperties }) {
  return (
    <a
      href={`?package=${encodeURIComponent(packageName)}#manifest`}
      onClick={(e) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('selectPackage', { detail: packageName }));
        const manifestEl = document.getElementById('manifest');
        if (manifestEl) {
          manifestEl.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = 'manifest';
        }
      }}
      className={className}
      style={style}
    >
      {label}
    </a>
  );
}

export function EmailInquiry({ variant = 'tailor-made', defaultSubject = 'Expedition Inquiry', defaultPackage = '' }: EmailInquiryProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [targetWindow, setTargetWindow] = useState('');
  const [intensity, setIntensity] = useState('2');
  const [groupSize, setGroupSize] = useState('');
  const [needsFacilitator, setNeedsFacilitator] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(defaultPackage);
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const checkUrl = () => {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        let pkg = params.get('package');
        if (!pkg && window.location.hash.includes('package=')) {
          const match = window.location.hash.match(/package=([^&]+)/);
          if (match) pkg = decodeURIComponent(match[1].replace(/\+/g, ' '));
        }
        if (pkg) {
          if (pkg.toLowerCase().includes('base')) setSelectedPackage('Base Adventure Package');
          else if (pkg.toLowerCase().includes('core')) setSelectedPackage('Core Executive Offsite Package');
          else if (pkg.toLowerCase().includes('sovereign')) setSelectedPackage('Sovereign Expedition Package');
          else setSelectedPackage(pkg);
        }
      }
    };
    checkUrl();

    const handleCustomSelect = (e: any) => {
      if (e.detail) setSelectedPackage(e.detail);
    };

    window.addEventListener('selectPackage', handleCustomSelect);
    window.addEventListener('hashchange', checkUrl);
    return () => {
      window.removeEventListener('selectPackage', handleCustomSelect);
      window.removeEventListener('hashchange', checkUrl);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const mailtoUrl = `mailto:contact@traversesouth.co.nz?subject=${encodeURIComponent(defaultSubject)}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nSelected Package: ${selectedPackage || 'None specified'}\nTarget Window: ${targetWindow}\n${variant === 'group-business' ? `Group Size: ${groupSize}\nNeeds Workshop Facilitator: ${needsFacilitator ? 'Yes' : 'No'}\n` : `Intensity Level: Level ${intensity}\n`}\nNotes/Requirements:\n${notes}`
  )}`;

  if (isSubmitted) {
    return (
      <div
        style={{
          backgroundColor: 'var(--colors-canvas-soft)',
          border: '1px solid var(--colors-brand)',
          padding: '40px',
          borderRadius: 'var(--rounded-marketing)',
          maxWidth: '640px',
          margin: '0 auto',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          animation: 'fadeIn 0.3s ease-out forwards'
        }}
      >
        <span style={{ color: 'var(--colors-brand)', fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: '11px', display: 'block', marginBottom: '8px' }}>
          // INQUIRY LOGGED SUCCESSFULLY
        </span>
        <h3 style={{ color: '#fff', fontSize: '24px', marginBottom: '16px', fontWeight: 500 }}>
          Manifest Details Received
        </h3>
        <p style={{ color: 'var(--colors-ash)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
          Thank you, <strong style={{ color: '#fff' }}>{name}</strong>. Our logistics concierge is reviewing your requirements.
        </p>
        <div style={{ backgroundColor: '#000', padding: '16px', borderRadius: '8px', border: '1px solid var(--colors-hairline-soft)', marginBottom: '24px' }}>
          <p style={{ color: 'var(--colors-brand)', fontSize: '13px', fontWeight: 600, margin: 0, fontFamily: 'var(--font-ibm-plex-mono), monospace' }}>
            ✓ Response Guarantee: Within 4 hours during NZ business hours.
          </p>
        </div>
        <p style={{ color: 'var(--colors-mute)', fontSize: '13px' }}>
          Need immediate assistance? Email us directly at <a href={mailtoUrl} style={{ color: '#fff', textDecoration: 'underline' }}>contact@traversesouth.co.nz</a>.
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', width: '100%', height: '100%' }}>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: 'var(--colors-canvas-soft)',
          border: '1px solid var(--colors-hairline-soft)',
          padding: '40px',
          borderRadius: 'var(--rounded-marketing)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          height: '100%',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <h3 className="typography-mono-caps" style={{ color: 'var(--colors-brand)', fontSize: '12px', letterSpacing: '1px', marginBottom: '8px' }}>
            // {variant === 'group-business' ? 'INITIALIZE CORPORATE RETREAT MANIFEST' : 'INITIALIZE BESPOKE TRIP COMPILER'}
          </h3>
          <p style={{ color: 'var(--colors-ash)', fontSize: '14px', margin: 0 }}>
            Configure your expedition requirements below. We handle all logistics, aviation, and lodging.
          </p>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '11px', color: 'var(--colors-mute)', marginBottom: '8px', fontFamily: 'var(--font-ibm-plex-mono), monospace', textTransform: 'uppercase' }}>FULL NAME</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            // placeholder="e.g. Alistair Sterling"
            style={{ width: '100%', padding: '14px', backgroundColor: '#000', border: '1px solid var(--colors-hairline-soft)', color: '#fff', borderRadius: '6px', outline: 'none', fontSize: '15px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '11px', color: 'var(--colors-mute)', marginBottom: '8px', fontFamily: 'var(--font-ibm-plex-mono), monospace', textTransform: 'uppercase' }}>EMAIL ADDRESS</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // placeholder="e.g. alistair@sterling.com"
            style={{ width: '100%', padding: '14px', backgroundColor: '#000', border: '1px solid var(--colors-hairline-soft)', color: '#fff', borderRadius: '6px', outline: 'none', fontSize: '15px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '11px', color: 'var(--colors-mute)', marginBottom: '8px', fontFamily: 'var(--font-ibm-plex-mono), monospace', textTransform: 'uppercase' }}>SELECTED PACKAGE</label>
          <select
            value={selectedPackage}
            onChange={(e) => setSelectedPackage(e.target.value)}
            style={{ width: '100%', padding: '14px', backgroundColor: '#000', border: '1px solid var(--colors-hairline-soft)', color: '#fff', borderRadius: '6px', outline: 'none', fontSize: '15px', height: '50px' }}
          >
            <option value="">-- Select a Package (Optional) --</option>
            <option value="Base Adventure Package">Base Adventure Package</option>
            <option value="Core Executive Offsite Package">Core Executive Offsite Package</option>
            <option value="Sovereign Expedition Package">Sovereign Expedition Package</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--colors-mute)', marginBottom: '8px', fontFamily: 'var(--font-ibm-plex-mono), monospace', textTransform: 'uppercase' }}>TARGET EXPEDITION WINDOW</label>
            <input
              type="text"
              value={targetWindow}
              onChange={(e) => setTargetWindow(e.target.value)}
              placeholder="e.g. Feb 2027"
              style={{ width: '100%', padding: '14px', backgroundColor: '#000', border: '1px solid var(--colors-hairline-soft)', color: '#fff', borderRadius: '6px', outline: 'none', fontSize: '15px' }}
            />
          </div>

          {variant === 'group-business' ? (
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--colors-mute)', marginBottom: '8px', fontFamily: 'var(--font-ibm-plex-mono), monospace', textTransform: 'uppercase' }}>ESTIMATED GROUP SIZE</label>
              <input
                type="text"
                value={groupSize}
                onChange={(e) => setGroupSize(e.target.value)}
                placeholder="e.g. 12 Executives"
                style={{ width: '100%', padding: '14px', backgroundColor: '#000', border: '1px solid var(--colors-hairline-soft)', color: '#fff', borderRadius: '6px', outline: 'none', fontSize: '15px' }}
              />
            </div>
          ) : (
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--colors-mute)', marginBottom: '8px', fontFamily: 'var(--font-ibm-plex-mono), monospace', textTransform: 'uppercase' }}>ADVENTURE INTENSITY LEVEL</label>
              <select
                value={intensity}
                onChange={(e) => setIntensity(e.target.value)}
                style={{ width: '100%', padding: '14px', backgroundColor: '#000', border: '1px solid var(--colors-hairline-soft)', color: '#fff', borderRadius: '6px', outline: 'none', fontSize: '15px', height: '50px' }}
              >
                <option value="1">Moderate</option>
                <option value="2">Active</option>
                <option value="3">Challenging</option>
              </select>
            </div>
          )}
        </div>

        {variant === 'group-business' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#000', padding: '16px', borderRadius: '6px', border: '1px solid var(--colors-hairline-soft)' }}>
            <input
              type="checkbox"
              id="facilitator"
              checked={needsFacilitator}
              onChange={(e) => setNeedsFacilitator(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: 'var(--colors-brand)', cursor: 'pointer' }}
            />
            <label htmlFor="facilitator" style={{ color: '#fff', fontSize: '14px', cursor: 'pointer', userSelect: 'none' }}>
              Give me a quote on facilitator and coach costs.
            </label>
          </div>
        )}

        <div>
          <label style={{ display: 'block', fontSize: '11px', color: 'var(--colors-mute)', marginBottom: '8px', fontFamily: 'var(--font-ibm-plex-mono), monospace', textTransform: 'uppercase' }}>
            {variant === 'group-business' ? 'CORPORATE OBJECTIVES & SPECIFIC LOGISTICS' : 'EXPEDITION DETAILS & PREFERENCES'}
          </label>
          <textarea
            rows={5}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={variant === 'group-business' ? "Describe your workshop goals, private coach requirements, or lodge preferences..." : "Describe your desired location, lodge preferences, activities, dietary needs, and any other requests..."}
            style={{ width: '100%', padding: '14px', backgroundColor: '#000', border: '1px solid var(--colors-hairline-soft)', color: '#fff', borderRadius: '6px', outline: 'none', fontFamily: 'inherit', fontSize: '15px' }}
          />
        </div>

        <div style={{ marginTop: '8px' }}>
          <button
            type="submit"
            className="button button-brand"
            style={{
              width: '100%',
              height: '52px',
              fontWeight: 600,
              fontFamily: 'var(--font-ibm-plex-mono), monospace',
              fontSize: '13px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer'
            }}
          >
            Submit Manifest Inquiry →
          </button>
        </div>
      </form>
    </div>
  );
}

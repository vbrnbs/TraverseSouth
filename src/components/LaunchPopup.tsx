'use client';

import React, { useState, useEffect } from 'react';

interface PopupData {
  enabled?: boolean;
  eyebrow?: string;
  heading?: string;
  description?: string;
  inputPlaceholder?: string;
  ctaText?: string;
  successMessage?: string;
  delaySeconds?: number;
  countdownDays?: number;
}

export function LaunchPopup({ data }: { data?: PopupData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const enabled = data?.enabled !== false;
  const delaySeconds = data?.delaySeconds !== undefined ? data.delaySeconds : 2;
  const eyebrow = data?.eyebrow || '// SEASON 2026 LAUNCH';
  const heading = data?.heading || '10% Off Founding Itineraries';
  const description = data?.description || 'Receive 10% Off';
  const inputPlaceholder = data?.inputPlaceholder || 'Your email address...';
  const ctaText = data?.ctaText || 'CLAIM 10% OFF →';
  const successMessage = data?.successMessage || 'Your boarding pass & 10% code are confirmed.';
  const initialDays = data?.countdownDays !== undefined ? data.countdownDays : 30;

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: initialDays > 0 ? initialDays - 1 : 29,
    hours: 18,
    minutes: 44,
    seconds: 52,
  });

  // Live ticking countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: 23, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // In development (localhost), always show on page refresh so you can easily test and inspect!
    if (process.env.NODE_ENV !== 'development') {
      const isDismissed = sessionStorage.getItem('traverse_popup_closed');
      if (isDismissed === 'true') return;
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [enabled, delaySeconds]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('traverse_popup_closed', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      sessionStorage.setItem('traverse_popup_closed', 'true');
    }, 800);
  };

  if (!isOpen || !enabled) return null;

  return (
    <>
      <style jsx>{`
        @keyframes popupBackdropFade {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes popupTicketSlide {
          0% { opacity: 0; transform: scale(0.94) translateY(16px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        /* True Horizontal Boarding Pass Sleeve (Wide & Low Height) */
        .boarding-sleeve-wrapper {
          display: grid;
          grid-template-columns: 1fr 310px;
          max-width: 880px;
          width: 100%;
          background: rgba(14, 14, 14, 0.75);
          backdrop-filter: blur(36px);
          -webkit-backdrop-filter: blur(36px);
          border-radius: 16px;
          box-shadow: 0 32px 80px rgba(0, 0, 0, 0.85), 0 0 40px rgba(243, 100, 88, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.18);
          position: relative;
          animation: popupTicketSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          overflow: hidden;
        }
        /* Perforated Cutout Notches at top and bottom seam */
        .sleeve-notch-top, .sleeve-notch-bottom {
          position: absolute;
          right: 310px;
          width: 22px;
          height: 22px;
          background: transparent;
          border-radius: 50%;
          z-index: 20;
          transform: translateX(50%);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.8);
        }
        .sleeve-notch-top { top: -12px; }
        .sleeve-notch-bottom { bottom: -12px; }
        
        .countdown-box {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          padding: 8px 12px;
          text-align: center;
          min-width: 60px;
        }
        .countdown-number {
          font-size: 24px;
          font-weight: 700;
          color: #fff;
          line-height: 1;
          font-family: var(--font-outfit), var(--font-inter), sans-serif;
          letter-spacing: -0.5px;
        }
        .countdown-label {
          font-size: 9px;
          color: var(--colors-ash);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 4px;
          font-family: var(--font-ibm-plex-mono), monospace;
        }
        @media (max-width: 820px) {
          .boarding-sleeve-wrapper {
            grid-template-columns: 1fr;
            max-width: 480px;
          }
          .sleeve-notch-top, .sleeve-notch-bottom, .sleeve-barcode {
            display: none !important;
          }
        }
        .input-glow:focus {
          border-color: #f36458 !important;
          box-shadow: 0 0 16px rgba(243, 100, 88, 0.25) !important;
        }
      `}</style>

      {/* Pure Blur Backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          animation: 'popupBackdropFade 0.35s ease-out forwards',
        }}
        onClick={handleClose}
      >
        {/* Horizontal Airline Boarding Pass Sleeve */}
        <div className="boarding-sleeve-wrapper" onClick={(e) => e.stopPropagation()}>

          {/* Perforated Seam Cutout Notches */}
          <div className="sleeve-notch-top" />
          <div className="sleeve-notch-bottom" />

          {/* ══════════════════════════════════════════════════════════════
              LEFT SIDE: WIDE & COMPACT SLEEVE BODY
              ══════════════════════════════════════════════════════════════ */}
          <div style={{ display: 'flex', flexDirection: 'column', borderRight: '2px dashed rgba(255, 255, 255, 0.18)' }}>

            {/* Slim Red Header Bar */}
            <div
              style={{
                backgroundColor: '#f36458',
                padding: '10px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#fff',
                fontFamily: 'var(--font-outfit), sans-serif',
                fontWeight: 600,
                fontSize: '13px',
                letterSpacing: '1px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>✈</span>
                <span>TRAVERSE SOUTH EXPEDITIONS</span>
              </div>
              <span style={{ fontSize: '11px', opacity: 0.9, fontFamily: 'var(--font-ibm-plex-mono), monospace' }}>
                {eyebrow}
              </span>
            </div>

            {/* Compact Sleeve Body Content */}
            <div style={{ padding: '20px 24px', display: 'flex', gap: '20px', alignItems: 'center', flex: 1 }}>

              {/* Far Left Barcode */}
              <div className="sleeve-barcode" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.6, borderRight: '1px solid rgba(255, 255, 255, 0.1)', paddingRight: '16px' }}>
                <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: 'monospace', fontSize: '18px', letterSpacing: '2px', color: '#fff', lineHeight: 1 }}>
                  ||| | || |||| | ||| || ||||
                </div>
              </div>

              {/* Compact Flight Info & Countdown in Horizontal Hierarchy */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>

                {/* Row 1: Horizontal Flight Arc + Passenger Details in one line */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div>
                      <span style={{ fontSize: '9px', color: 'var(--colors-ash)', fontFamily: 'var(--font-ibm-plex-mono), monospace', display: 'block', textTransform: 'uppercase' }}>FROM</span>
                      <span style={{ fontSize: '18px', fontWeight: 700, color: '#f36458', fontFamily: 'var(--font-outfit), sans-serif' }}>YOUR REALITY</span>
                    </div>
                    <span style={{ color: '#f36458', fontSize: '16px' }}>✈</span>
                    <div>
                      <span style={{ fontSize: '9px', color: 'var(--colors-ash)', fontFamily: 'var(--font-ibm-plex-mono), monospace', display: 'block', textTransform: 'uppercase' }}>TO</span>
                      <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-outfit), sans-serif' }}>SOUTH ISLAND WILDERNESS, NZ</span>
                    </div>
                  </div>

                  {/* Compact Metadata Badge */}
                  <div style={{ display: 'flex', gap: '16px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '6px 12px', borderRadius: '6px' }}>
                    <div>
                      <span style={{ fontSize: '8px', color: 'var(--colors-ash)', fontFamily: 'var(--font-ibm-plex-mono), monospace', display: 'block' }}>FLIGHT</span>
                      <span style={{ fontSize: '11px', color: '#fff', fontWeight: 600 }}>TS-2026</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '8px', color: 'var(--colors-ash)', fontFamily: 'var(--font-ibm-plex-mono), monospace', display: 'block' }}>CLASS</span>
                      <span style={{ fontSize: '11px', color: '#f36458', fontWeight: 600 }}>VIP 10% OFF</span>
                    </div>
                  </div>
                </div>

                {/* Row 2: Horizontal 30-Day Countdown Banner */}
                <div style={{ background: 'rgba(243, 100, 88, 0.08)', border: '1px solid rgba(243, 100, 88, 0.25)', borderRadius: '12px', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ display: 'inline-block', backgroundColor: '#f36458', color: '#fff', fontSize: '9px', fontWeight: 700, padding: '2px 8px', borderRadius: '100px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'var(--font-ibm-plex-mono), monospace' }}>
                      ⚡ LAUNCHING SOON
                    </span>
                    <h3 style={{ fontSize: '16px', color: '#fff', fontWeight: 600, margin: 0, fontFamily: 'var(--font-outfit), sans-serif', whiteSpace: 'pre-line' }}>
                      {heading}
                    </h3>
                  </div>

                  {/* Compact Countdown Boxes */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div className="countdown-box">
                      <div className="countdown-number">{String(timeLeft.days).padStart(2, '0')}</div>
                      <div className="countdown-label">Days</div>
                    </div>
                    <span style={{ fontSize: '18px', color: '#f36458', fontWeight: 700 }}>:</span>
                    <div className="countdown-box">
                      <div className="countdown-number">{String(timeLeft.hours).padStart(2, '0')}</div>
                      <div className="countdown-label">Hrs</div>
                    </div>
                    <span style={{ fontSize: '18px', color: '#f36458', fontWeight: 700 }}>:</span>
                    <div className="countdown-box">
                      <div className="countdown-number">{String(timeLeft.minutes).padStart(2, '0')}</div>
                      <div className="countdown-label">Mins</div>
                    </div>
                    <span style={{ fontSize: '18px', color: '#f36458', fontWeight: 700 }}>:</span>
                    <div className="countdown-box">
                      <div className="countdown-number" style={{ color: '#f36458' }}>{String(timeLeft.seconds).padStart(2, '0')}</div>
                      <div className="countdown-label">Secs</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              RIGHT SIDE: THE ACTION SLEEVE STUB
              ══════════════════════════════════════════════════════════════ */}
          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', background: 'rgba(10, 10, 10, 0.4)' }}>

            {/* Slim Red Header Bar */}
            <div
              style={{
                backgroundColor: '#f36458',
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#fff',
                fontFamily: 'var(--font-outfit), sans-serif',
                fontWeight: 600,
                fontSize: '13px',
                letterSpacing: '1px',
              }}
            >
              <span>BOARDING STUB</span>
              <span style={{ fontSize: '11px', opacity: 0.9 }}>10% OFF</span>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: '44px',
                right: '12px',
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'var(--colors-ash)',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.color = 'var(--colors-ash)';
              }}
              title="Close Pop-up"
            >
              ✕
            </button>

            {/* Compact Stub Content Area */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>

              {!isSubmitted ? (
                <div>
                  <div style={{ marginBottom: '14px', paddingRight: '18px' }}>
                    <span style={{ fontSize: '10px', color: '#f36458', fontFamily: 'var(--font-ibm-plex-mono), monospace', fontWeight: 600, letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>
                      // CLAIM YOUR PASS
                    </span>
                    <h4 style={{ fontSize: '18px', fontWeight: 600, color: '#fff', lineHeight: 1.2, margin: 0, fontFamily: 'var(--font-outfit), sans-serif', whiteSpace: 'pre-line' }}>
                      {description}
                    </h4>
                  </div>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={inputPlaceholder}
                      className="input-glow"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '13px',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        fontFamily: 'inherit',
                      }}
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        backgroundColor: '#f36458',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        cursor: isSubmitting ? 'wait' : 'pointer',
                        fontFamily: 'var(--font-ibm-plex-mono), monospace',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 6px 18px rgba(243, 100, 88, 0.3)',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting) e.currentTarget.style.backgroundColor = '#ff4b3e';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitting) e.currentTarget.style.backgroundColor = '#f36458';
                      }}
                    >
                      {isSubmitting ? 'SECURING...' : ctaText}
                    </button>
                  </form>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '10px 0', animation: 'fadeIn 0.3s ease-out' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      color: '#10B981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      margin: '0 auto 10px auto',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                    }}
                  >
                    ✓
                  </div>
                  <h4 style={{ fontSize: '17px', fontWeight: 600, color: '#fff', marginBottom: '4px', fontFamily: 'var(--font-outfit), sans-serif' }}>
                    10% Off Secured
                  </h4>
                  <p style={{ color: 'var(--colors-ash)', fontSize: '12px', lineHeight: 1.4, marginBottom: '14px', whiteSpace: 'pre-line' }}>
                    {successMessage}
                  </p>
                  <button
                    onClick={handleClose}
                    style={{
                      padding: '10px 16px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      borderRadius: '6px',
                      fontSize: '10px',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-ibm-plex-mono), monospace',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    Return to Homepage
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

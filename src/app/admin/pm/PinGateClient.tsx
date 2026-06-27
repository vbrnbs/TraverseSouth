'use client';

import { useState, useCallback } from 'react';

export function PinGateClient() {
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInput = useCallback(async (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setError(false);

    // Auto-focus next input
    if (value && index < 3) {
      const next = document.getElementById(`pin-${index + 1}`);
      next?.focus();
    }

    // Auto-submit when all 4 digits entered
    if (value && index === 3 && newPin.every(d => d !== '')) {
      setLoading(true);
      try {
        const res = await fetch('/api/admin/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pin: newPin.join('') }),
        });
        if (res.ok) {
          // Reload to hit the Server Component now that we have the cookie
          window.location.reload();
        } else {
          setError(true);
          setPin(['', '', '', '']);
          setTimeout(() => document.getElementById('pin-0')?.focus(), 100);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  }, [pin]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      const prev = document.getElementById(`pin-${index - 1}`);
      prev?.focus();
      const newPin = [...pin];
      newPin[index - 1] = '';
      setPin(newPin);
    }
  }, [pin]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '24px',
      backgroundColor: '#0b0b0b',
    }}>
      {/* Branding */}
      <div style={{ marginBottom: '48px', textAlign: 'center' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '16px',
          justifyContent: 'center',
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#f36458',
          }} />
          <span style={{
            fontWeight: 600,
            letterSpacing: '-0.32px',
            fontSize: '18px',
            color: '#fff',
            fontFamily: 'var(--font-inter), sans-serif',
          }}>Traverse South</span>
        </div>
        <p style={{
          fontFamily: 'var(--font-ibm-plex-mono), monospace',
          fontSize: '11px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#797979',
        }}>
          PM DASHBOARD
        </p>
      </div>

      {/* PIN Input */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '24px',
      }}>
        {pin.map((digit, i) => (
          <input
            key={i}
            id={`pin-${i}`}
            type="tel"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInput(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            autoFocus={i === 0}
            disabled={loading}
            style={{
              width: '56px',
              height: '64px',
              textAlign: 'center',
              fontSize: '24px',
              fontWeight: 600,
              color: '#fff',
              backgroundColor: error ? 'rgba(243, 100, 88, 0.08)' : '#212121',
              border: `1.5px solid ${error ? '#f36458' : '#353535'}`,
              borderRadius: '6px',
              outline: 'none',
              fontFamily: 'var(--font-ibm-plex-mono), monospace',
              transition: 'border-color 0.2s, background-color 0.2s',
              caretColor: '#f36458',
            }}
            onFocus={(e) => {
              if (!error) e.currentTarget.style.borderColor = '#f36458';
            }}
            onBlur={(e) => {
              if (!error) e.currentTarget.style.borderColor = '#353535';
            }}
          />
        ))}
      </div>

      {/* Status */}
      <p style={{
        fontSize: '13px',
        color: error ? '#f36458' : '#797979',
        fontFamily: 'var(--font-inter), sans-serif',
        height: '20px',
        transition: 'color 0.2s',
      }}>
        {loading ? 'Verifying…' : error ? 'Invalid PIN. Try again.' : 'Enter your 4-digit PIN'}
      </p>
    </div>
  );
}

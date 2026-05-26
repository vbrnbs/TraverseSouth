'use client';

import React, { useState } from 'react';
import { Button } from '@/components/Button';

export function TourBuilder({ products }: { products: any[] }) {
  const [adventureLevel, setAdventureLevel] = useState<number>(7);
  const [daysStay, setDaysStay] = useState<number>(5);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const safeProducts = products || [];

  const selectedProducts = safeProducts.filter(p => selectedIds.includes(p._id));
  const currentDuration = selectedProducts.reduce((sum, p) => sum + (p.durationDays || 1), 0);

  const exactMatches = safeProducts.filter(p => (p.adventureScore || 5) === adventureLevel);
  const lowerMatches = safeProducts
    .filter(p => (p.adventureScore || 5) < adventureLevel)
    .sort((a, b) => (b.adventureScore || 5) - (a.adventureScore || 5));
  const higherMatches = safeProducts
    .filter(p => (p.adventureScore || 5) > adventureLevel)
    .sort((a, b) => (a.adventureScore || 5) - (b.adventureScore || 5));

  const handleToggle = (id: string, duration: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(x => x !== id));
    } else {
      if (currentDuration + duration > daysStay) {
        alert("Cannot add this module. It exceeds your selected length of stay.");
        return;
      }
      setSelectedIds([...selectedIds, id]);
    }
  };

  const renderProductCard = (p: any, compact: boolean = false) => {
    const isSelected = selectedIds.includes(p._id);
    const duration = p.durationDays || 1;
    const disabled = !isSelected && (currentDuration + duration > daysStay);

    return (
      <div 
        key={p._id} 
        style={{
          border: isSelected ? '1px solid var(--colors-brand)' : '1px solid #222',
          background: isSelected ? '#1a1010' : '#111',
          padding: compact ? '12px' : '16px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          transition: 'all 0.2s ease',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}
        onClick={() => {
          if (!disabled || isSelected) handleToggle(p._id, duration);
        }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span className="typography-mono-micro" style={{ color: 'var(--colors-brand)' }}>Level {p.adventureScore || 5}</span>
            <span className="typography-mono-micro" style={{ color: 'var(--colors-mute)' }}>{duration} Days</span>
          </div>
          <h4 style={{ fontSize: compact ? '16px' : '18px', fontWeight: 500, marginBottom: '8px' }}>{p.title}</h4>
        </div>
        <Button variant={isSelected ? "primary" : "secondary-dark"} style={{ width: '100%', marginTop: '16px', padding: compact ? '6px' : '8px', fontSize: compact ? '12px' : '14px' }}>
          {isSelected ? "Remove" : "Add to Itinerary"}
        </Button>
      </div>
    );
  };

  return (
    <div className="tour-builder" style={{ width: '100%', marginTop: '24px', display: 'flex', gap: '48px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      
      {/* ─── LEFT COLUMN: BROWSE & FILTER ─── */}
      <div style={{ flex: '1 1 600px' }}>
        
        {/* Controls */}
        <div style={{ marginBottom: '40px', display: 'flex', gap: '32px', flexWrap: 'wrap', background: '#111', padding: '24px', border: '1px solid #222' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label className="typography-mono-eyebrow" style={{ display: 'block', marginBottom: '16px', color: 'var(--colors-mute)' }}>
              TARGET ADVENTURE LEVEL: <span style={{ color: 'var(--colors-brand)' }}>{adventureLevel}</span>
            </label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={adventureLevel} 
              onChange={(e) => setAdventureLevel(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--colors-brand)' }}
            />
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label className="typography-mono-eyebrow" style={{ display: 'block', marginBottom: '16px', color: 'var(--colors-mute)' }}>
              LENGTH OF STAY (DAYS)
            </label>
            <input 
              type="number" 
              min="1" 
              max="14" 
              value={daysStay} 
              onChange={(e) => setDaysStay(Number(e.target.value))}
              style={{ 
                width: '100%', 
                background: '#0b0b0b', 
                border: '1px solid #333', 
                color: '#fff', 
                padding: '8px 12px',
                fontFamily: 'inherit'
              }}
            />
          </div>
        </div>

        {/* Exact Matches */}
        <div style={{ marginBottom: '48px' }}>
          <p className="typography-mono-caps" style={{ color: 'var(--colors-mute)', marginBottom: '16px' }}>
            // EXACT MATCHES (LEVEL {adventureLevel})
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {exactMatches.map(p => renderProductCard(p, false))}
            {exactMatches.length === 0 && (
              <p style={{ color: 'var(--colors-ash)', fontSize: '14px' }}>No exact matches at this level. Check the alternatives below.</p>
            )}
          </div>
        </div>

        {/* Lower & Higher Branches */}
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px' }}>
            <p className="typography-mono-caps" style={{ color: 'var(--colors-mute)', marginBottom: '16px' }}>
              // DIAL IT DOWN (LOWER INTENSITY)
            </p>
            {lowerMatches.map(p => renderProductCard(p, true))}
            {lowerMatches.length === 0 && (
              <p style={{ color: 'var(--colors-ash)', fontSize: '14px' }}>No lower intensity options available.</p>
            )}
          </div>
          
          <div style={{ flex: '1 1 280px' }}>
            <p className="typography-mono-caps" style={{ color: 'var(--colors-mute)', marginBottom: '16px' }}>
              // PUSH THE LIMITS (HIGHER INTENSITY)
            </p>
            {higherMatches.map(p => renderProductCard(p, true))}
            {higherMatches.length === 0 && (
              <p style={{ color: 'var(--colors-ash)', fontSize: '14px' }}>You are at the maximum intensity.</p>
            )}
          </div>
        </div>
      </div>

      {/* ─── RIGHT COLUMN: SELECTED ITINERARY ─── */}
      <div style={{ flex: '0 0 400px', position: 'sticky', top: '24px', background: '#111', border: '1px solid #222', padding: '32px', display: 'flex', flexDirection: 'column' }}>
        <p className="typography-mono-caps" style={{ color: 'var(--colors-brand)', marginBottom: '8px' }}>
          // COMPILED ITINERARY
        </p>
        <h3 className="typography-display-sm" style={{ marginBottom: '24px', fontSize: '24px' }}>
          {currentDuration} / {daysStay} Days Filled
        </h3>
        
        <div style={{ borderBottom: '1px solid #222', marginBottom: '24px', paddingBottom: '8px' }}>
          {selectedProducts.length === 0 ? (
            <p style={{ color: 'var(--colors-ash)', fontSize: '14px', fontStyle: 'italic', marginBottom: '16px' }}>
              Your itinerary is empty. Select modules from the left to build your expedition.
            </p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {selectedProducts.map(p => (
                <li key={p._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 500, margin: 0 }}>{p.title}</p>
                    <p style={{ fontSize: '12px', color: 'var(--colors-mute)', margin: 0 }}>Level {p.adventureScore || 5}</p>
                  </div>
                  <span className="typography-mono-micro" style={{ color: 'var(--colors-ash)' }}>{p.durationDays || 1}d</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div style={{ marginTop: 'auto' }}>
          <p className="typography-meta" style={{ color: 'var(--colors-mute)', marginBottom: '16px' }}>
            Requires secure checkout to lock in dates and guide availability.
          </p>
          <Button variant="primary" style={{ width: '100%' }} onClick={() => alert("Checkout flow coming soon!")}>
            Proceed to Checkout →
          </Button>
        </div>
      </div>

    </div>
  );
}

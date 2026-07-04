'use client';

import React from 'react';

export interface SupplierItem {
  label?: string;
  name: string;
  credential?: string;
}

export interface PackageSuppliersProps {
  suppliers?: SupplierItem[];
}

export function PackageSuppliers({ suppliers = [] }: PackageSuppliersProps) {
  if (!suppliers || suppliers.length === 0) return null;

  return (
    <div className="supplier-grid">
      <div style={{ gridColumn: '1 / -1', marginBottom: 'var(--spacing-md)' }}>
        <p className="typography-mono-eyebrow" style={{ color: 'var(--colors-mute)' }}>
          // SUPPLIER DECOUPLING & CERTIFICATIONS
        </p>
        <h4
          style={{
            fontSize: '20px',
            fontWeight: 500,
            marginTop: '8px',
            color: '#fff',
          }}
        >
          Our Exclusive Operator Access network
        </h4>
      </div>
      {suppliers.map((sup) => (
        <div className="supplier-card" key={sup.name}>
          {sup.label && <div className="supplier-label">{sup.label}</div>}
          <div className="supplier-name">{sup.name}</div>
          {sup.credential && (
            <div className="supplier-credential">{sup.credential}</div>
          )}
        </div>
      ))}
    </div>
  );
}

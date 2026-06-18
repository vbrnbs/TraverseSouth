'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { BookingModal } from './BookingModal';

interface ItineraryBookingProps {
  activity: {
    _id: string;
    title: string;
    slug: { current: string };
    eyebrow?: string;
    subtitle?: string;
    description?: string;
    adventureLevel: number;
    ctaText?: string;
    image?: any;
    pricing?: {
      priceString?: string;
      minimumGroup?: string;
      inclusions?: string[];
    };
  };
}

export function ItineraryBooking({ activity }: ItineraryBookingProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        variant="brand" 
        style={{ 
          height: '48px', 
          padding: '0 36px', 
          fontSize: '14px', 
          fontWeight: 600,
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}
        onClick={() => setIsOpen(true)}
      >
        Request Manifest Booking →
      </Button>

      {isOpen && (
        <BookingModal 
          activity={activity} 
          onClose={() => setIsOpen(false)} 
        />
      )}
    </>
  );
}

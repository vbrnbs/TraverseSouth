'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { BookingModal } from './BookingModal';
import { BookingCalendar } from './BookingCalendar';

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
  showCalendar?: boolean;
}

export function ItineraryBooking({ activity, showCalendar = true }: ItineraryBookingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const d = new Date();
    d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7 || 7));
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [selectedTime, setSelectedTime] = useState<string>('10:30 AM');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {showCalendar && (
        <div style={{ marginBottom: '32px', width: '100%', maxWidth: '560px' }}>
          <BookingCalendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            selectedTime={selectedTime}
            onSelectTime={setSelectedTime}
          />
        </div>
      )}

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
        {activity.ctaText || 'Book Trip →'}
      </Button>

      {isOpen && (
        <BookingModal
          activity={activity}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          selectedTime={selectedTime}
          onSelectTime={setSelectedTime}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

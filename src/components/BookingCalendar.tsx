'use client';

import React, { useState } from 'react';

export interface BookingCalendarProps {
  selectedDate?: Date;
  onSelectDate?: (date: Date) => void;
  selectedTime?: string;
  onSelectTime?: (time: string) => void;
  className?: string;
}

const TIME_SLOTS = [
  '09:00 AM',
  '10:30 AM',
  '01:00 PM',
  '02:30 PM',
  '04:00 PM'
];

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function BookingCalendar({
  selectedDate: propSelectedDate,
  onSelectDate,
  selectedTime: propSelectedTime,
  onSelectTime,
  className = ''
}: BookingCalendarProps) {
  // Internal state fallback if uncontrolled
  const [internalDate, setInternalDate] = useState<Date>(() => {
    const d = new Date();
    d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7 || 7)); // Next Saturday
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [internalTime, setInternalTime] = useState<string>('10:30 AM');

  const selectedDate = propSelectedDate || internalDate;
  const selectedTime = propSelectedTime || internalTime;

  const handleDateSelect = (d: Date) => {
    setInternalDate(d);
    if (onSelectDate) onSelectDate(d);
  };

  const handleTimeSelect = (t: string) => {
    setInternalTime(t);
    if (onSelectTime) onSelectTime(t);
  };

  // View month state (defaults to selected date's month/year)
  const [viewYear, setViewYear] = useState(selectedDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(selectedDate.getMonth());

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  // Generate grid days
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  // Adjust for Monday start (0 = Mon, 6 = Sun)
  const startDayIndex = (firstDayOfMonth + 6) % 7;
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const days: { date: Date; isCurrentMonth: boolean; isPast: boolean }[] = [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Previous month trailing days
  for (let i = startDayIndex - 1; i >= 0; i--) {
    const d = new Date(viewYear, viewMonth - 1, daysInPrevMonth - i);
    d.setHours(0, 0, 0, 0);
    days.push({ date: d, isCurrentMonth: false, isPast: d < today });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(viewYear, viewMonth, i);
    d.setHours(0, 0, 0, 0);
    days.push({ date: d, isCurrentMonth: true, isPast: d < today });
  }

  // Next month leading days to fill 42 cells (6 rows of 7)
  const remainingCells = 42 - days.length;
  for (let i = 1; i <= remainingCells; i++) {
    const d = new Date(viewYear, viewMonth + 1, i);
    d.setHours(0, 0, 0, 0);
    days.push({ date: d, isCurrentMonth: false, isPast: false });
  }

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  return (
    <div
      className={className}
      style={{
        backgroundColor: '#0b0b0b',
        border: '1px solid var(--colors-hairline-soft)',
        borderRadius: 'var(--rounded-marketing)',
        padding: '24px',
        color: '#fff',
        fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
        width: '100%',
        maxWidth: '560px',
        boxSizing: 'border-box'
      }}
    >
      {/* Top Header */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <p
          className="typography-mono-eyebrow"
          style={{
            color: 'var(--colors-brand)',
            fontSize: '11px',
            letterSpacing: '1.5px',
            margin: '0 0 4px 0',
            textTransform: 'uppercase'
          }}
        >
          // BOOKING CALENDAR
        </p>
      </div>

      {/* Month Navigation */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}
      >
        <button
          type="button"
          onClick={handlePrevMonth}
          style={{
            background: '#161616',
            border: '1px solid #2a2a2a',
            borderRadius: '6px',
            color: '#fff',
            padding: '6px 14px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background 0.2s, border-color 0.2s'
          }}
          aria-label="Previous Month"
        >
          &#8249;
        </button>

        <span
          style={{
            fontSize: '18px',
            fontWeight: 600,
            letterSpacing: '-0.3px',
            color: '#fff'
          }}
        >
          {MONTHS[viewMonth]} {viewYear}
        </span>

        <button
          type="button"
          onClick={handleNextMonth}
          style={{
            background: '#161616',
            border: '1px solid #2a2a2a',
            borderRadius: '6px',
            color: '#fff',
            padding: '6px 14px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background 0.2s, border-color 0.2s'
          }}
          aria-label="Next Month"
        >
          &#8250;
        </button>
      </div>

      {/* Weekdays Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '6px',
          marginBottom: '8px'
        }}
      >
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            style={{
              color: 'var(--colors-mute)',
              fontSize: '12px',
              textAlign: 'center',
              fontWeight: 500,
              paddingBottom: '4px',
              fontFamily: 'var(--font-ibm-plex-mono), monospace'
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '6px',
          marginBottom: '24px'
        }}
      >
        {days.map((dayObj, idx) => {
          const isSelected = isSameDay(dayObj.date, selectedDate);
          const isDisabled = dayObj.isPast;

          return (
            <button
              key={idx}
              type="button"
              disabled={isDisabled}
              onClick={() => {
                if (!isDisabled) {
                  handleDateSelect(dayObj.date);
                  // Sync month view if clicking a day from adjacent month
                  if (!dayObj.isCurrentMonth) {
                    setViewMonth(dayObj.date.getMonth());
                    setViewYear(dayObj.date.getFullYear());
                  }
                }
              }}
              style={{
                aspectRatio: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: isSelected ? 700 : 500,
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s ease',
                backgroundColor: isSelected
                  ? 'var(--colors-brand)'
                  : dayObj.isCurrentMonth
                  ? '#161616'
                  : '#101010',
                color: isSelected
                  ? '#ffffff'
                  : isDisabled
                  ? '#444444'
                  : dayObj.isCurrentMonth
                  ? '#eeeeee'
                  : '#666666',
                border: isSelected
                  ? '1px solid var(--colors-brand)'
                  : '1px solid #222222',
                opacity: isDisabled ? 0.4 : 1,
                boxShadow: isSelected ? '0 0 12px rgba(243, 100, 88, 0.4)' : 'none'
              }}
            >
              {dayObj.date.getDate()}
            </button>
          );
        })}
      </div>

      {/* Selected Date Banner */}
      <div
        style={{
          padding: '12px 16px',
          backgroundColor: 'rgba(243, 100, 88, 0.08)',
          border: '1px solid rgba(243, 100, 88, 0.25)',
          borderRadius: '8px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px'
        }}
      >
        <span
          style={{
            fontSize: '12px',
            color: 'var(--colors-ash)',
            fontFamily: 'var(--font-ibm-plex-mono), monospace'
          }}
        >
          SELECTED:
        </span>
        <span
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--colors-brand)',
            textTransform: 'uppercase'
          }}
        >
          {selectedDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </span>
      </div>

      {/* Time Slots */}
      <div>
        <p
          className="typography-mono-caps"
          style={{
            color: 'var(--colors-mute)',
            marginBottom: '10px',
            fontSize: '11px',
            letterSpacing: '1px'
          }}
        >
          // AVAILABLE TIME SLOTS
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
            gap: '8px'
          }}
        >
          {TIME_SLOTS.map((time) => {
            const isSelectedTime = time === selectedTime;
            return (
              <button
                key={time}
                type="button"
                onClick={() => handleTimeSelect(time)}
                style={{
                  padding: '8px 4px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: isSelectedTime ? 600 : 500,
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.15s ease',
                  fontFamily: 'var(--font-ibm-plex-mono), monospace',
                  backgroundColor: isSelectedTime ? 'var(--colors-brand)' : '#161616',
                  color: isSelectedTime ? '#ffffff' : '#bbbbbb',
                  border: isSelectedTime
                    ? '1px solid var(--colors-brand)'
                    : '1px solid #2a2a2a'
                }}
              >
                {time}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

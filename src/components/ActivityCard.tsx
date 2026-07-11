'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { urlFor } from '@/sanity/client';

export interface ActivityProps {
  _id: string;
  title: string;
  slug: { current: string };
  eyebrow?: string;
  subtitle?: string;
  description?: string;
  adventureLevel: number;
  levelLabel?: string;
  region?: string;
  ctaText?: string;
  image?: any;
  pricing?: {
    priceString?: string;
    minimumGroup?: string;
    inclusions?: string[];
  };
}

export function ActivityCard({
  activity,
  isScrollable = false,
}: {
  activity: ActivityProps;
  isScrollable?: boolean;
}) {
  const imageUrl = activity.image
    ? urlFor(activity.image).url()
    : `/images/${activity.slug?.current}.png`;

  const getLevelLabel = (level: any) => {
    const map: Record<string, string> = {
      '1': 'BEGINNER',
      '2': 'INTERMEDIATE',
      '3': 'ADVANCED',
      '4': 'EXTREME',
    };
    return map[String(level)] || String(level || 'BEGINNER');
  };

  return (
    <div
      className={`feature-card-dark ${isScrollable ? 'tour-builder-scroll-item' : ''}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: isScrollable
          ? '0 0 max(280px, calc((100% - var(--layout-padding-left, 0px) - (4 * var(--spacing-lg))) / 4.5))'
          : 'unset',
        minHeight: '520px',
        padding: '0',
        overflow: 'hidden',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease',
        backgroundColor: 'var(--colors-canvas-soft)',
        border: '1px solid var(--colors-hairline-soft)',
        borderRadius: 'var(--rounded-marketing)',
      }}
    >
      {/* Image Frame with LQIP */}
      <Link
        href={`/trips/${activity.slug?.current}`}
        style={{ display: 'block', textDecoration: 'none' }}
      >
        <div
          style={{
            width: '100%',
            height: '240px',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: 'var(--colors-hairline-soft)',
            borderBottom: '1px solid var(--colors-hairline-soft)',
          }}
        >
          {/* Instant Low-Res Blur Placeholder */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: activity.image
                ? `url(${urlFor(activity.image).width(20).blur(50).url()})`
                : `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(15px)',
              transform: 'scale(1.15)',
              zIndex: 0,
            }}
          />
          <Image
            fill
            src={imageUrl}
            alt={activity.title || 'Adventure Image'}
            className="card-image"
            style={{
              objectFit: 'cover',
              zIndex: 1,
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      {/* Content Block */}
      <div
        style={{
          padding: 'var(--spacing-xl)',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px',
            }}
          >
            <p
              className="typography-mono-eyebrow"
              style={{
                color: 'var(--colors-brand)',
                fontSize: '11px',
                letterSpacing: '1px',
                margin: 0,
              }}
            >
              {activity.eyebrow || activity.levelLabel || getLevelLabel(activity.adventureLevel)}
            </p>
            {activity.region && (
              <span
                className="typography-mono-micro"
                style={{ color: 'var(--colors-mute)', textTransform: 'uppercase' }}
              >
                // {activity.region}
              </span>
            )}
          </div>
          <Link
            href={`/trips/${activity.slug?.current}`}
            style={{ textDecoration: 'none' }}
          >
            <h3
              className="typography-heading-sm"
              style={{
                marginBottom: '12px',
                fontWeight: 500,
                color: '#fff',
                fontSize: '22px',
                letterSpacing: '-0.4px',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
              }}
            >
              {activity.title}
            </h3>
          </Link>
          <p
            className="typography-body-sm"
            style={{
              color: 'var(--colors-ash)',
              lineHeight: '1.6',
              marginBottom: '24px',
            }}
          >
            {activity.subtitle}
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', marginTop: 'auto', paddingTop: '16px' }}>
          <Button
            variant="brand"
            style={{ flex: 1, height: '40px', padding: '0', fontSize: '13px' }}
            href={`/trips/${activity.slug?.current}`}
          >
            View Trip
          </Button>
        </div>
      </div>
    </div>
  );
}

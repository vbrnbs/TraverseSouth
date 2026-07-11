import React from 'react';
import Link from 'next/link';
import { urlFor } from '@/sanity/client';

export const portableTextComponents = {
  marks: {
    link: ({ children, value }: any) => {
      const href = value?.href || '#';
      const target = value?.blank ? '_blank' : '_blank';
      const rel = target === '_blank' ? 'noopener noreferrer' : undefined;
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          style={{
            color: 'var(--colors-brand, #f36458)',
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
          }}
        >
          {children}
        </a>
      );
    },
    activityLink: ({ children, value }: any) => {
      const slug = value?.slug || value?.reference?.slug?.current;
      if (!slug) return <span>{children}</span>;
      return (
        <Link
          href={`/trips/${slug}`}
          style={{
            color: 'var(--colors-brand, #f36458)',
            fontWeight: 500,
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
            transition: 'opacity 0.2s',
          }}
        >
          {children}
        </Link>
      );
    },
    internalActivityLink: ({ children, value }: any) => {
      const slug = value?.slug || value?.reference?.slug?.current;
      if (!slug) return <span>{children}</span>;
      return (
        <Link
          href={`/trips/${slug}`}
          style={{
            color: 'var(--colors-brand, #f36458)',
            fontWeight: 500,
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
          }}
        >
          {children}
        </Link>
      );
    },
    internalDestinationLink: ({ children, value }: any) => {
      const slug = value?.slug || value?.reference?.slug?.current;
      if (!slug) return <span>{children}</span>;
      return (
        <Link
          href={`/destinations/${slug}`}
          style={{
            color: 'var(--colors-link-blue-soft, #55beff)',
            fontWeight: 500,
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
          }}
        >
          {children}
        </Link>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1
        className="typography-display-sm"
        style={{ color: '#fff', marginTop: '40px', marginBottom: '20px' }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2
        className="typography-heading-md"
        style={{ color: '#fff', marginTop: '36px', marginBottom: '16px' }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3
        className="typography-heading-sm"
        style={{ color: '#fff', marginTop: '28px', marginBottom: '12px' }}
      >
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p
        className="typography-body"
        style={{
          color: 'var(--colors-ash, #b9b9b9)',
          lineHeight: '1.8',
          marginBottom: '24px',
          fontSize: '17px',
        }}
      >
        {children}
      </p>
    ),
  },
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      const imageUrl = urlFor(value).url();
      return (
        <figure style={{ margin: '36px 0' }}>
          <img
            src={imageUrl}
            alt={value.alt || 'Content image'}
            style={{
              width: '100%',
              maxHeight: '540px',
              objectFit: 'cover',
              borderRadius: '8px',
              border: '1px solid var(--colors-hairline-soft, #353535)',
              display: 'block',
            }}
          />
          {value.caption && (
            <figcaption
              style={{
                fontFamily: 'var(--font-ibm-plex-mono), monospace',
                fontSize: '12px',
                color: 'var(--colors-mute, #797979)',
                marginTop: '10px',
              }}
            >
              // {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    iframe: ({ value }: any) => {
      if (!value?.url) return null;
      return (
        <div style={{ margin: '36px 0' }}>
          <iframe
            src={value.url}
            title={value.title || 'Embedded content'}
            style={{
              width: '100%',
              height: `${value.height || 450}px`,
              border: '1px solid var(--colors-hairline-soft, #353535)',
              borderRadius: '8px',
              backgroundColor: '#111',
            }}
            allowFullScreen
          />
        </div>
      );
    },
  },
};

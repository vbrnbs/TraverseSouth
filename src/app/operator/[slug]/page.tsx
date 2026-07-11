import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { PortableText } from '@portabletext/react';
import { sanityClient, previewClient, urlFor } from '@/sanity/client';
import { OperatorGallery } from '@/components/OperatorGallery';
import { ActivityCardSmall } from '@/components/ActivityCardSmall';
import { ReturnToMainLink } from '@/components/ReturnToMainLink';
import { portableTextComponents } from '@/components/PortableTextComponents';

import { operatorDetailQuery as operatorQuery } from '@/sanity/queries';

export const revalidate = 60;

interface OperatorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: OperatorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const isDraft = (await draftMode()).isEnabled;
  const client = isDraft ? previewClient : sanityClient;

  const operator = await client.fetch(operatorQuery, { slug });
  if (!operator) {
    return {
      title: 'Operator Not Found | Traverse South',
    };
  }

  return {
    title: `${operator.companyName} | Vetted Expedition Operator | Traverse South`,
    description: `Official profile and expedition details for ${operator.companyName}, a vetted South Island wilderness operator.`,
  };
}

export default async function OperatorDetailPage({ params }: OperatorPageProps) {
  const { slug } = await params;
  const isDraft = (await draftMode()).isEnabled;
  const client = isDraft ? previewClient : sanityClient;

  const operator = await client.fetch(operatorQuery, { slug });

  if (!operator) {
    notFound();
  }

  const logoUrl = operator.logo ? urlFor(operator.logo).url() : null;

  const galleryImages =
    operator.gallery?.map((img: any) => ({
      url: urlFor(img).url(),
      alt: img.alt || operator.companyName,
    })) || [];

  return (
    <main
      style={{
        backgroundColor: '#0b0b0b',
        color: '#ffffff',
        minHeight: '100vh',
        paddingTop: '110px',
        paddingBottom: '120px',
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Navigation Breadcrumb */}
        <ReturnToMainLink />

        {/* Operator Hero Header */}
        <header
          style={{
            borderBottom: '1px solid var(--colors-hairline-soft, #353535)',
            paddingBottom: '40px',
            marginBottom: '40px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-ibm-plex-mono), monospace',
              fontSize: '11px',
              color: 'var(--colors-mute, #797979)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              display: 'block',
              marginBottom: '16px',
            }}
          >
            // ADVENTURE OPERATOR
          </span>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              {logoUrl && (
                <div
                  style={{
                    width: '76px',
                    height: '76px',
                    borderRadius: '12px',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                    border: '1px solid var(--colors-hairline-soft, #353535)',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={logoUrl}
                    alt={`${operator.companyName} logo`}
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </div>
              )}

              <div>
                <h1
                  style={{
                    fontFamily: 'var(--font-waldenburg), serif',
                    fontSize: '48px',
                    fontWeight: 'normal',
                    letterSpacing: '-1.5px',
                    margin: 0,
                    lineHeight: 1.1,
                  }}
                >
                  {operator.companyName}
                </h1>
              </div>
            </div>

            {operator.website && (
              <a
                href={operator.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--colors-hairline-soft, #353535)',
                  color: '#ffffff',
                  padding: '12px 20px',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-ibm-plex-mono), monospace',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  textDecoration: 'none',
                }}
              >
                Official Website ↗
              </a>
            )}
          </div>
        </header>

        {/* Interactive Clickable Image Gallery (Directly Under Header) */}
        <OperatorGallery images={galleryImages} companyName={operator.companyName} />

        {/* Operator Details Content (Portable Text) */}
        <section style={{ marginBottom: '64px' }}>
          {operator.content && operator.content.length > 0 ? (
            <div
              style={{
                fontSize: '17px',
                lineHeight: 1.7,
                color: '#e0e0e0',
                width: '100%',
              }}
            >
              <PortableText value={operator.content} components={portableTextComponents} />
            </div>
          ) : (
            <p style={{ color: 'var(--colors-mute, #797979)', fontStyle: 'italic' }}>
              Detailed operator overview arriving soon.
            </p>
          )}
        </section>

        {/* Operated Activities */}
        {operator.activities && operator.activities.length > 0 && (
          <section
            style={{
              borderTop: '1px solid var(--colors-hairline-soft, #353535)',
              paddingTop: '48px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-ibm-plex-mono), monospace',
                fontSize: '11px',
                color: 'var(--colors-mute, #797979)',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                display: 'block',
                marginBottom: '24px',
              }}
            >
              // CHECK OUT OTHER TOURS OFFERED BY {operator.companyName.toUpperCase()}
            </span>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '16px',
              }}
            >
              {operator.activities.map((act: any, idx: number) => {
                const actImage = act.image ? urlFor(act.image).url() : `/images/${act.slug?.current}.png`;
                return (
                  <ActivityCardSmall
                    key={act._id || idx}
                    title={act.title}
                    slug={act.slug?.current || ''}
                    subtitle={act.subtitle}
                    image={actImage}
                    duration={act.duration}
                    priceString={act.pricing?.priceString}
                  />
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

import { defineType, defineField } from 'sanity';

export const hero = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'headline', title: 'Headline', type: 'text', rows: 3 }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Description Section',
      type: 'text',
      rows: 5,
      description: 'The hero description. Hit Enter / Return to insert new lines or paragraphs.',
    }),
    defineField({ name: 'primaryCta', title: 'Primary CTA Text', type: 'string' }),
    defineField({
      name: 'riskReversals',
      title: 'Risk Reversals (Badges)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Short trust badges displayed directly below the CTA (e.g., "Zero-Admin Weather Refunds").'
    }),
    defineField({
      name: 'muxVideo',
      title: 'Mux Video',
      type: 'mux.video',
      description: 'Upload or select a video to stream via Mux.',
    }),
  ],
});

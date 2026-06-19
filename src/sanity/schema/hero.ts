import { defineType, defineField } from 'sanity';

export const hero = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'text', rows: 3 }),
    defineField({ name: 'primaryCta', title: 'Primary CTA Text', type: 'string' }),
    defineField({ name: 'secondaryCta', title: 'Secondary CTA Text', type: 'string' }),
    defineField({
      name: 'muxVideo',
      title: 'Mux Video',
      type: 'mux.video',
      description: 'Upload or select a video to stream via Mux.',
    }),
  ],
});

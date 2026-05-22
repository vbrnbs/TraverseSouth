import { defineType, defineField } from 'sanity';

export const engine = defineType({
  name: 'engine',
  title: 'Build Your Own Section',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'ctaText', title: 'CTA Text', type: 'string' }),
    defineField({
      name: 'swaps',
      title: 'Example Swaps',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'swap',
          title: 'Swap',
          fields: [
            defineField({ name: 'from', title: 'From', type: 'string' }),
            defineField({ name: 'to', title: 'To', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({ name: 'validationMessage', title: 'Validation Message', type: 'string' }),
    defineField({ name: 'pricingNote', title: 'Pricing Note', type: 'string' }),
  ],
});

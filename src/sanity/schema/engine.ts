import { defineType, defineField } from 'sanity';

export const engine = defineType({
  name: 'engine',
  title: 'Build Your Own Section',
  type: 'object',
  fields: [
    defineField({ name: 'builderEyebrow', title: 'Builder Eyebrow', type: 'string', initialValue: '// THE ITINERARY COMPILER' }),
    defineField({ name: 'builderHeadline', title: 'Builder Headline', type: 'string', initialValue: 'Compile Your Custom Expedition' }),
    defineField({ name: 'builderSubtitle', title: 'Builder Subtitle', type: 'text', rows: 2, initialValue: 'Configure your adventure parameters below. Our engine will dynamically sort available modules for you to build the ultimate South Island itinerary.' }),
    defineField({ name: 'eyebrow', title: 'Logistics Eyebrow', type: 'string' }),
    defineField({ name: 'headline', title: 'Logistics Headline', type: 'string' }),
    defineField({ name: 'description', title: 'Logistics Description', type: 'text', rows: 3 }),
    defineField({ name: 'ctaText', title: 'Logistics CTA Text', type: 'string' }),
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

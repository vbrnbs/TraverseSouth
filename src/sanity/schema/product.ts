import { defineType, defineField } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Product (Module)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., "Heli-Ski"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (Matches Shopify Handle)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'CRITICAL: This must EXACTLY match the Handle in Shopify to sync pricing correctly.',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'e.g., "05 // HIGH ALTITUDE"',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'e.g., "Private charter heli-skiing into untouched alpine powder."',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'A premium, detailed description of this activity.',
    }),
    defineField({
      name: 'image',
      title: 'Feature Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Upload a premium high-resolution photograph.',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      description: 'e.g., "Book Now" or "Reserve Dates"',
      initialValue: 'Book Now',
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing & Inclusions Structure',
      type: 'object',
      fields: [
        defineField({ name: 'priceString', title: 'Fallback Price String', type: 'string', description: 'e.g., "$1,000 NZD / person"' }),
        defineField({ name: 'minimumGroup', title: 'Minimum Group Size', type: 'string', description: 'e.g., "Tailored for private groups of 2 to 6 guests"' }),
        defineField({
          name: 'inclusions',
          title: 'Package Inclusions List',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),
  ],
});

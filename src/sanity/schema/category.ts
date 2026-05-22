import { defineType, defineField } from 'sanity';

export const category = defineType({
  name: 'category',
  title: 'Module Category',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'e.g., "01 // DEEP WILDERNESS"',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., "Fiordland"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'A premium, detailed description of this regional module.',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      description: 'e.g., "Explore Fiordland"',
    }),
    defineField({
      name: 'imageCaption',
      title: 'Image Caption',
      type: 'string',
      description: 'e.g., "Milford Sound // Private Charter"',
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Upload a premium high-resolution background photograph for this regional module.',
    }),
    defineField({
      name: 'modules',
      title: 'Included Modules',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'moduleItem',
          title: 'Module Item',
          fields: [
            defineField({ name: 'number', title: 'Number', type: 'string', description: 'e.g., "01"' }),
            defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g., "Private Heli-Transit"' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'subtitle',
      title: 'Package Subtitle',
      type: 'string',
      description: 'e.g., "High-Altitude Air Insertion & Deep Fjord Catamaran Charter"',
    }),
    defineField({
      name: 'days',
      title: 'Itinerary Days',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'itineraryDay',
          title: 'Itinerary Day',
          fields: [
            defineField({ name: 'dayNumber', title: 'Day Number / Range', type: 'string', description: 'e.g., "Day 1-2"' }),
            defineField({ name: 'title', title: 'Day Title', type: 'string' }),
            defineField({ name: 'description', title: 'Day Description', type: 'text', rows: 4 }),
            defineField({ name: 'logistics', title: 'Logistical Envelope', type: 'string', description: 'e.g., "Transit parameters, guides, safety etc."' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'suppliers',
      title: 'Exclusive Supplier Access Network',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'supplierNetwork',
          title: 'Supplier Partner',
          fields: [
            defineField({ name: 'label', title: 'Label / Role', type: 'string', description: 'e.g., "Aviation Operator"' }),
            defineField({ name: 'name', title: 'Partner Name', type: 'string' }),
            defineField({ name: 'credential', title: 'Partner Credential', type: 'string', description: 'e.g., "CAA Part 135 Certified"' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing & Inclusions Structure',
      type: 'object',
      fields: [
        defineField({ name: 'priceString', title: 'Fallback Price String', type: 'string', description: 'e.g., "$18,500 NZD / person"' }),
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


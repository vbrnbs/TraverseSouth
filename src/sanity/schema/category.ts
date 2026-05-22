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
  ],
});

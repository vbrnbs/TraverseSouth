import { defineType, defineField } from 'sanity';

export const mission = defineType({
  name: 'mission',
  title: 'Mission Section',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'headline', title: 'Headline', type: 'text', rows: 3 }),
    defineField({ name: 'bodyText', title: 'Body Text', type: 'text', rows: 5 }),
    defineField({
      name: 'photoDeck',
      title: 'Photo Deck',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'photoItem',
          title: 'Photo Item',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g., "// FIORDLAND HELI"' }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
          ],
        },
      ],
      description: 'Upload the featured high-resolution photographs displayed under the mission headline.',
    }),
  ],
});

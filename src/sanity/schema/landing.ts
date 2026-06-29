import { defineType, defineField } from 'sanity';

export const landing = defineType({
  name: 'landing',
  title: 'Landing',
  type: 'document',
  fields: [
    // ─── Hero ───
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
    }),

    // ─── Adventures Grid (The Manifest) ───
    defineField({
      name: 'adventures',
      title: 'Adventures Section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'subtitle', title: 'Subtitle', type: 'text' },
        {
          name: 'viewAllCard',
          title: 'View All Card (Last Grid Item)',
          type: 'object',
          fields: [
            { name: 'title', title: 'Card Title', type: 'string' },
            { name: 'subtitle', title: 'Card Subtitle', type: 'string' },
            { name: 'ctaText', title: 'Button Text', type: 'string' },
            { name: 'image', title: 'Background Image', type: 'image', options: { hotspot: true } }
          ]
        }
      ]
    }),
    defineField({
      name: 'featuredActivities',
      title: 'Featured Activities',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'activity' }] }],
      description: 'Manually select and order the specific activities you want displayed on the homepage.',
    }),

    // ─── Our Mission ───
    defineField({
      name: 'mission',
      title: 'Our Mission',
      type: 'mission',
    }),

    // ─── Curated Content ───
    defineField({
      name: 'featuredItineraries',
      title: 'Featured Itineraries',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'itinerary' }] }],
      description: 'Manually select and order the specific itineraries you want displayed on the homepage.',
    }),

    // ─── Footer ───
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'footer',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Landing' };
    },
  },
});

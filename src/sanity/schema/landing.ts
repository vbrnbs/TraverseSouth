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

    // ─── Our Mission ───
    defineField({
      name: 'mission',
      title: 'Our Mission',
      type: 'mission',
    }),

    // ─── Curated Content ───
    defineField({
      name: 'featuredActivities',
      title: 'Featured Activities',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'activity' }] }],
      description: 'Manually select and order the specific activities you want displayed on the homepage.',
    }),
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

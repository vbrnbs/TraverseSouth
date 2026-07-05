import { defineType, defineField } from 'sanity';

export const landing = defineType({
  name: 'landing',
  title: 'Landing Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '1. Hero Section', default: true },
    { name: 'adventures', title: '2. Adventures Grid' },
    { name: 'itineraries', title: '3. Itineraries Waitlist' },
    { name: 'mission', title: '4. Our Mission' },
    { name: 'popup', title: '5. Waitlist Pop-up' },
    { name: 'footer', title: '6. Footer' },
  ],
  fields: [
    // ─── Hero ───
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
      group: 'hero',
    }),

    // ─── Adventures Grid (The Manifest) ───
    defineField({
      name: 'adventures',
      title: 'Adventures Section',
      type: 'object',
      group: 'adventures',
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
      group: 'adventures',
      of: [{ type: 'reference', to: [{ type: 'activity' }] }],
      description: 'Manually select and order the specific activities you want displayed on the homepage.',
    }),

    // ─── Itineraries Waitlist Section ───
    defineField({
      name: 'itinerariesPageRef',
      title: 'Itineraries Subpage Reference (Single Source of Truth)',
      type: 'reference',
      to: [{ type: 'page' }],
      group: 'itineraries',
      description: '⚡ MIRRORED FROM ITINERARIES SUBPAGE: Click the card below (or the 3 dots -> "Open in tab") to view and edit the wording and background image directly on your original Itineraries Subpage! Both the homepage and /itineraries menu page pull from this single document.',
    }),

    // ─── Our Mission ───
    defineField({
      name: 'mission',
      title: 'Our Mission',
      type: 'mission',
      group: 'mission',
    }),

    // ─── Curated Content ───
    defineField({
      name: 'featuredItineraries',
      title: 'Featured Itineraries',
      type: 'array',
      group: 'itineraries',
      of: [{ type: 'reference', to: [{ type: 'itinerary' }] }],
      description: 'Manually select and order the specific itineraries you want displayed on the homepage.',
    }),

    // ─── Launching Soon Pop-up ───
    defineField({
      name: 'popup',
      title: 'Launching Soon / Waitlist Pop-up',
      type: 'popup',
      group: 'popup',
    }),

    // ─── Footer ───
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'footer',
      group: 'footer',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Landing Page Sections' };
    },
  },
});

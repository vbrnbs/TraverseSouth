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

    // ─── Itineraries Waitlist Section ───
    defineField({
      name: 'itinerariesSection',
      title: 'Itineraries Waitlist Section (Synced with Itineraries Page)',
      type: 'object',
      description: '⚡ Synced bi-directionally with the standalone "Itineraries" Page document under Homepage & Pages. Editing here updates both the homepage and the /itineraries menu page.',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: '// EXPEDITION BLUEPRINTS' },
        { name: 'title', title: 'Heading', type: 'string', initialValue: 'Multi-Day Sovereign Journeys' },
        { name: 'subtitle', title: 'Subtitle', type: 'text', initialValue: 'Expertly curated narratives combining private aviation, elite guides, and ultra-luxe lodges. We are currently hand-selecting our founding expedition routes for the upcoming season.' },
        { name: 'ctaText', title: 'CTA Button Text', type: 'string', initialValue: 'Get Early Access →' },
        { name: 'image', title: 'Background Image', type: 'image', options: { hotspot: true } }
      ]
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

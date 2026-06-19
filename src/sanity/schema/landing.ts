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

import { defineType, defineField } from 'sanity';

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    // ─── Hero ───
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
    }),

    // ─── Mission ───
    defineField({
      name: 'mission',
      title: 'Mission Section',
      type: 'mission',
    }),

    // ─── Categories ───
    defineField({
      name: 'categories',
      title: 'Module Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }],
        },
      ],
    }),

    // ─── Engine ───
    defineField({
      name: 'engine',
      title: 'Build Your Own Section',
      type: 'engine',
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
      return { title: 'Homepage' };
    },
  },
});

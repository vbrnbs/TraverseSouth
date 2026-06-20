import { defineType, defineField } from 'sanity';

export const howItWorks = defineType({
  name: 'howItWorks',
  title: 'How It Works',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: '// THE PROCESS'
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Keep it effortless and simple (e.g., "Just 3 simple steps").'
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Step Title', type: 'string' }),
            defineField({ name: 'description', title: 'Step Description', type: 'text', rows: 3 })
          ]
        }
      ],
      validation: (Rule) => Rule.max(4).error('Hormozi Rule: No more than 4 steps to reduce perceived effort.'),
      description: 'Explain logistics in 3-4 simple steps.'
    }),
  ],
});

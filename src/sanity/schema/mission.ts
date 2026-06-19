import { defineType, defineField } from 'sanity';

export const mission = defineType({
  name: 'mission',
  title: 'Our Mission',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      description: 'e.g. "// OUR MISSION"',
      initialValue: '// OUR MISSION'
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main section heading.'
    }),
    defineField({
      name: 'imageGallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            })
          ]
        }
      ],
      description: 'Add as many images as you want to showcase the mission.'
    }),
    defineField({
      name: 'bodyText',
      title: 'Body Text',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'The main manifesto or mission text.'
    })
  ]
});

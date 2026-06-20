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
      description: 'Add images to visually showcase the mission (e.g. glacier landings, wild rivers).'
    }),
    defineField({
      name: 'badges',
      title: 'Badges, Awards & Operator Logos',
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
      description: 'Upload logos of your operators, awards, or trust badges. They will display in a smoothly moving marquee slip.'
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

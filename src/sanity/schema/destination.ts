import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'destination',
    title: 'Destination',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Destination Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'region',
            title: 'Region',
            type: 'string',
            options: {
                list: [
                    { title: 'Otago', value: 'otago' },
                    { title: 'Southland', value: 'southland' },
                    { title: 'Canterbury', value: 'canterbury' },
                    { title: 'West Coast', value: 'west-coast' },
                    { title: 'Marlborough', value: 'marlborough' },
                    { title: 'Tasman', value: 'tasman' },
                ],
            },
        }),
        defineField({
            name: 'description',
            title: 'Short Description',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.max(200).warning('Keep descriptions under 200 characters for UI cards.'),
        }),
        defineField({
            name: 'featuredImage',
            title: 'Featured Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: 'Main header banner image when viewing this destination.',
        }),
        defineField({
            name: 'gallery',
            title: 'Image Gallery',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            description: 'Gallery of images showcasing this destination.',
        }),
        defineField({
            name: 'body',
            title: 'Body Content',
            type: 'array',
            of: [{ type: 'block' }],
        }),
    ],
})
import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'itinerary',
    title: 'Itinerary',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Itinerary Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'eyebrow',
            title: 'Eyebrow Tag',
            type: 'string',
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle / Tagline',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Detailed Description',
            type: 'text',
        }),
        defineField({
            name: 'image',
            title: 'Primary Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'activities',
            title: 'Included Activities',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'activity' }],
                },
            ],
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: 'pricing',
            title: 'Pricing Details Override',
            type: 'object',
            fields: [
                { name: 'priceString', title: 'Price String', type: 'string' },
                { name: 'minimumGroup', title: 'Minimum Group Note', type: 'string' },
                { name: 'inclusions', title: 'Inclusions', type: 'array', of: [{ type: 'string' }] },
            ]
        })
    ]
})

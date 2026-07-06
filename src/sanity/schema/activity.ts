import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'activity',
    title: 'Activity',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Activity Title',
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
            options: {
                list: [
                    { title: 'LEVEL 1 // MODERATE', value: 'LEVEL 1 // MODERATE' },
                    { title: 'LEVEL 2 // INTENSE', value: 'LEVEL 2 // INTENSE' },
                    { title: 'LEVEL 3 // EXTREME', value: 'LEVEL 3 // EXTREME' },
                ],
            },
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle / Tagline',
            type: 'string',
        }),
        defineField({
            name: 'duration',
            title: 'Duration (e.g. 1 Day, Half Day, 4 Hours)',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Detailed Description',
            type: 'text',
        }),
        defineField({
            name: 'adventureLevel',
            title: 'Adventure Level (1-3)',
            type: 'number',
            validation: (Rule) => Rule.required().min(1).max(3).integer(),
        }),
        defineField({
            name: 'levelLabel',
            title: 'Level Label (e.g. LEVEL 2 // ACTIVE WILDERNESS)',
            type: 'string',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
        }),
        defineField({
            name: 'region',
            title: 'Destination',
            type: 'reference',
            to: [{ type: 'destination' }],
        }),
        defineField({
            name: 'ctaText',
            title: 'Primary CTA Text',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Primary Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'pricing',
            title: 'Pricing Details',
            type: 'object',
            fields: [
                { name: 'priceString', title: 'Price String', type: 'string' },
                { name: 'minimumGroup', title: 'Minimum Group Note', type: 'string' },
                { name: 'inclusions', title: 'Inclusions', type: 'array', of: [{ type: 'string' }] },
            ]
        }),
        defineField({
            name: 'operator',
            title: 'Operator',
            type: 'reference',
            to: [{ type: 'operator' }],
            description: 'Select the vetted local operator for this activity.',
        }),
    ]
})


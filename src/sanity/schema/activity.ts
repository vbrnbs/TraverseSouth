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
            name: 'adventureLevel',
            title: 'Adventure Level (1-3)',
            type: 'number',
            validation: (Rule) => Rule.required().min(1).max(3).integer(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
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
            name: 'ctaText',
            title: 'CTA Text',
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
            name: 'suppliers',
            title: 'Supplier Network',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'supplierItem',
                    title: 'Supplier',
                    fields: [
                        { name: 'label', title: 'Supplier Label', type: 'string' },
                        { name: 'name', title: 'Supplier Name', type: 'string' },
                        { name: 'credential', title: 'Supplier Credential', type: 'string' },
                    ]
                }
            ]
        })
    ]
})
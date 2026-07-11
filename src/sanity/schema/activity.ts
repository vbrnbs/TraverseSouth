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
            type: 'array',
            description: 'Portable Text field supporting text, links, images, iframes, activity references, and destination references.',
            of: [
                {
                    type: 'block',
                    marks: {
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'Link',
                                fields: [
                                    {
                                        name: 'href',
                                        type: 'url',
                                        title: 'URL',
                                    },
                                    {
                                        name: 'blank',
                                        type: 'boolean',
                                        title: 'Open in new tab',
                                        initialValue: true,
                                    },
                                ],
                            },
                            {
                                name: 'internalActivityLink',
                                type: 'object',
                                title: 'Link to Activity',
                                fields: [
                                    {
                                        name: 'reference',
                                        type: 'reference',
                                        title: 'Activity',
                                        to: [{ type: 'activity' }],
                                    },
                                ],
                            },
                            {
                                name: 'internalDestinationLink',
                                type: 'object',
                                title: 'Link to Destination',
                                fields: [
                                    {
                                        name: 'reference',
                                        type: 'reference',
                                        title: 'Destination',
                                        to: [{ type: 'destination' }],
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative Text',
                        },
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Caption',
                        },
                    ],
                },
                {
                    type: 'object',
                    name: 'iframe',
                    title: 'Iframe Embed',
                    fields: [
                        {
                            name: 'url',
                            type: 'url',
                            title: 'Iframe URL',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'height',
                            type: 'number',
                            title: 'Height (px)',
                            initialValue: 450,
                        },
                        {
                            name: 'title',
                            type: 'string',
                            title: 'Title / Description',
                        },
                    ],
                },
                {
                    type: 'reference',
                    name: 'activityEmbed',
                    title: 'Embedded Activity Card',
                    to: [{ type: 'activity' }],
                },
                {
                    type: 'reference',
                    name: 'destinationEmbed',
                    title: 'Embedded Destination Card',
                    to: [{ type: 'destination' }],
                },
            ],
        }),
        defineField({
            name: 'adventureLevel',
            title: 'Adventure Level',
            type: 'string',
            options: {
                list: [
                    { title: 'BEGINNER', value: 'BEGINNER' },
                    { title: 'INTERMEDIATE', value: 'INTERMEDIATE' },
                    { title: 'ADVANCED', value: 'ADVANCED' },
                    { title: 'EXTREME', value: 'EXTREME' },
                ],
                layout: 'dropdown',
            },
            initialValue: 'BEGINNER',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'adventureHighlights',
            title: 'Adventure Highlights',
            type: 'array',
            description: 'Key bullet points / highlights for this activity.',
            of: [{ type: 'string' }],
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
        defineField({
            name: 'relatedActivities',
            title: 'Related Activities',
            type: 'array',
            description: 'References to other related activities.',
            of: [{ type: 'reference', to: [{ type: 'activity' }] }],
        }),
    ]
})


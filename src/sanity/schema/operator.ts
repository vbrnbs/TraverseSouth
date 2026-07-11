import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'operator',
    title: 'Operator',
    type: 'document',
    fields: [
        defineField({
            name: 'companyName',
            title: 'Company Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'companyName',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'logo',
            title: 'Company Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: 'Upload the operator company logo.',
        }),
        defineField({
            name: 'primaryContact',
            title: 'Primary Contact Person',
            type: 'string',
        }),
        defineField({
            name: 'phone',
            title: 'Operations Phone',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'Operations Email',
            type: 'string',
            validation: (Rule) => Rule.email(),
        }),
        defineField({
            name: 'website',
            title: 'Website',
            type: 'url',
            description: 'Official website URL for the operator.',
            validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
        }),
        defineField({
            name: 'content',
            title: 'Operator Details & Content',
            type: 'array',
            description: 'Portable Text field supporting text, links, images, iframes, and activity references.',
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
            name: 'activities',
            title: 'Operated Activities',
            type: 'array',
            description: 'List of activities offered or operated by this operator.',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'activity' }],
                },
            ],
        }),
        defineField({
            name: 'destinations',
            title: 'Operating Destinations',
            type: 'array',
            description: 'List of destinations covered by this operator.',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'destination' }],
                },
            ],
        }),
        defineField({
            name: 'cancellationPolicy',
            title: 'Cancellation Policy',
            type: 'array',
            description: 'Cancellation terms, weather disruption protocol, and refund policies for this operator.',
            of: [
                {
                    type: 'block',
                },
            ],
        }),
        defineField({
            name: 'gallery',
            title: 'Image Gallery',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            description: 'Gallery of images showcasing this operator.',
        }),
        defineField({
            name: 'safetyCertification',
            title: 'Safety Management Plan / Audit (PDF)',
            type: 'file',
            options: {
                accept: '.pdf',
            },
        }),
    ],
    preview: {
        select: {
            title: 'companyName',
            subtitle: 'primaryContact',
            media: 'logo',
        },
        prepare({ title, subtitle, media }) {
            return {
                title: title || 'Unnamed Operator',
                subtitle: subtitle ? `Contact: ${subtitle}` : 'Local Vetted Operator',
                media,
            };
        },
    },
})
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
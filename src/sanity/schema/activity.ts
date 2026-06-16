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
            name: 'intensityLevel',
            title: 'Intensity Level',
            type: 'string',
            options: {
                list: [
                    { title: 'Low', value: 'low' },
                    { title: 'Moderate', value: 'moderate' },
                    { title: 'High', value: 'high' },
                    { title: 'Extreme', value: 'extreme' },
                ],
                layout: 'radio', // Renders as radio buttons for quick editing
            },
        }),
        defineField({
            name: 'requiredGear',
            title: 'Required Gear',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'overview',
            title: 'Activity Overview',
            type: 'array',
            of: [{ type: 'block' }],
        }),
    ],
})
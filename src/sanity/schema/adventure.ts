import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'adventure',
    title: 'Adventure Package',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Adventure Title',
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
            name: 'destination',
            title: 'Primary Destination',
            type: 'reference',
            to: [{ type: 'destination' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'includedActivities',
            title: 'Included Activities',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'activity' }],
                },
            ],
        }),
        defineField({
            name: 'primaryOperator',
            title: 'Primary Operator Logistics',
            type: 'reference',
            to: [{ type: 'operator' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'duration',
            title: 'Duration (Days)',
            type: 'number',
            validation: (Rule) => Rule.required().min(1).integer(),
        }),
        defineField({
            name: 'difficultyRating',
            title: 'Overall Difficulty Rating',
            type: 'string',
            options: {
                list: [
                    { title: 'Easy', value: 'easy' },
                    { title: 'Moderate', value: 'moderate' },
                    { title: 'Challenging', value: 'challenging' },
                    { title: 'Expert', value: 'expert' },
                ],
            },
        }),
        defineField({
            name: 'itinerary',
            title: 'Day-by-Day Itinerary',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'itineraryDay',
                    title: 'Itinerary Day',
                    fields: [
                        { name: 'dayNumber', title: 'Day Number', type: 'number' },
                        { name: 'heading', title: 'Day Title/Heading', type: 'string' },
                        { name: 'description', title: 'Day Description', type: 'text' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'gallery',
            title: 'Image Gallery',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            description: 'Showcase what the multi-day trip looks like.',
        }),
    ],
})
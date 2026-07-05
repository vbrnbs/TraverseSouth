import { defineType, defineField } from 'sanity';

export const popup = defineType({
  name: 'popup',
  title: 'Launching Soon / Waitlist Pop-up',
  type: 'object',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enable Waitlist Pop-up',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to enable or disable the popup across the website.',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: '// SEASON 2026 LAUNCH',
      description: 'Displayed in the top-right of the left red header banner.',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'text',
      rows: 2,
      initialValue: '10% Off Founding Itineraries',
      description: 'Displayed above the countdown timer boxes on the left ticket sleeve.',
    }),
    defineField({
      name: 'description',
      title: 'Description (Right Stub Heading)',
      type: 'text',
      rows: 3,
      initialValue: 'Receive 10% Off',
      description: 'Displayed as the heading inside the right-hand boarding stub above the email input.',
    }),
    defineField({
      name: 'inputPlaceholder',
      title: 'Email Input Placeholder',
      type: 'string',
      initialValue: 'Your email address...',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'CLAIM 10% OFF →',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'string',
      initialValue: 'Your boarding pass & 10% code are confirmed.',
    }),
    defineField({
      name: 'delaySeconds',
      title: 'Appear Delay (Seconds)',
      type: 'number',
      initialValue: 2,
      description: 'Number of seconds to wait before popping up after page load.',
    }),
    defineField({
      name: 'countdownDays',
      title: 'Countdown Timer (Days)',
      type: 'number',
      initialValue: 30,
      description: 'Number of days starting value on the countdown clock.',
    }),
  ],
});

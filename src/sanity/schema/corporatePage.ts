import { defineType, defineField } from 'sanity';

export const corporatePage = defineType({
  name: 'corporatePage',
  title: 'Corporate Workshops Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '1. Hero Section', default: true },
    { name: 'workshops', title: '2. Types of Workshops' },
    { name: 'infrastructure', title: '3. Human Element & Infrastructure' },
    { name: 'advantage', title: '4. Traverse South Advantage' },
    { name: 'packages', title: '5. Logistical Packages' },
    { name: 'inquiry', title: '6. Manifest & Inquiry Form' },
  ],
  fields: [
    /* ─────────────────────────────────────────────────────────────
       GROUP 1: HERO SECTION
       ───────────────────────────────────────────────────────────── */
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      group: 'hero',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow Text', type: 'string', initialValue: '// SOUTHERN ALPS EXECUTIVE EXPEDITIONS' },
        { name: 'heading', title: 'Main Heading', type: 'string', initialValue: 'Corporate Workshops & Team Buildings.' },
        { name: 'subtitle', title: 'Subtitle Description', type: 'text', rows: 3 },
        {
          name: 'ctaButton',
          title: 'CTA Button',
          type: 'object',
          fields: [
            { name: 'label', title: 'Button Label', type: 'string', initialValue: 'Inquire Now →' },
            { name: 'href', title: 'Target ID / URL', type: 'string', initialValue: '#manifest' },
          ],
        },
        { name: 'backgroundImage', title: 'Hero Background Image', type: 'image', options: { hotspot: true }, description: 'Upload a high-res alpine photo to replace the topographical SVG placeholder.' },
      ],
    }),

    /* ─────────────────────────────────────────────────────────────
       GROUP 2: TYPES OF WORKSHOPS (3-Column Module Cards)
       ───────────────────────────────────────────────────────────── */
    defineField({
      name: 'workshopsSection',
      title: 'Types of Workshops Section',
      type: 'object',
      group: 'workshops',
      fields: [
        { name: 'eyebrow', title: 'Section Eyebrow', type: 'string', initialValue: '// CURATED EXPEDITION WORKSHOP MODULES' },
        { name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Executive Alignment & Leadership Curricula.' },
        { name: 'description', title: 'Section Description', type: 'text', rows: 3 },
        {
          name: 'cards',
          title: 'Workshop Module Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'workshopCard',
              fields: [
                { name: 'eyebrow', title: 'Card Eyebrow', type: 'string', initialValue: 'MODULE 01 // STRATEGIC ALIGNMENT' },
                { name: 'title', title: 'Workshop Title', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 4 },
                {
                  name: 'tags',
                  title: 'Curriculum & Activity Tags',
                  type: 'array',
                  of: [{ type: 'string' }],
                  options: { layout: 'tags' },
                },
              ],
            },
          ],
        },
      ],
    }),

    /* ─────────────────────────────────────────────────────────────
       GROUP 3: HUMAN ELEMENT & INFRASTRUCTURE (2-Column Split)
       ───────────────────────────────────────────────────────────── */
    defineField({
      name: 'infrastructureSection',
      title: 'Human Element & Zero-Logistics Friction',
      type: 'object',
      group: 'infrastructure',
      fields: [
        {
          name: 'leftColumn',
          title: 'Left Column: Co-Design & Facilitator Synergy',
          type: 'object',
          fields: [
            { name: 'eyebrow', title: 'Eyebrow Text', type: 'string', initialValue: '// THE HUMAN ELEMENT' },
            { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Co-Design Hand-in-Hand with Facilitators.' },
            { name: 'description', title: 'Description', type: 'text', rows: 4 },
          ],
        },
        {
          name: 'rightColumn',
          title: 'Right Column: Zero Logistics Friction',
          type: 'object',
          fields: [
            { name: 'image', title: 'Column Image (4:5 Ratio)', type: 'image', options: { hotspot: true } },
            { name: 'imageCaption', title: 'Image Caption / Badge', type: 'string' },
          ],
        },
      ],
    }),

    /* ─────────────────────────────────────────────────────────────
       GROUP 4: TRAVERSE SOUTH ADVANTAGE (Full-Bleed 3-Equal Split)
       ───────────────────────────────────────────────────────────── */
    defineField({
      name: 'advantageSection',
      title: 'Traverse South Advantage Section',
      type: 'object',
      group: 'advantage',
      fields: [
        { name: 'sectionTitle', title: 'Top Section Header', type: 'string', initialValue: 'Traverse South Advantage' },
        {
          name: 'columns',
          title: 'Full-Bleed Advantage Columns',
          type: 'array',
          validation: (Rule) => Rule.min(3).max(3),
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Advantage Title', type: 'string' },
                { name: 'description', title: 'Concise Description (< Half Length)', type: 'text', rows: 3 },
                { name: 'backgroundImage', title: 'Column Background Image', type: 'image', options: { hotspot: true } },
              ],
            },
          ],
        },
      ],
    }),

    /* ─────────────────────────────────────────────────────────────
       GROUP 5: TURNKEY LOGISTICAL PACKAGES (3 Tier Cards)
       ───────────────────────────────────────────────────────────── */
    defineField({
      name: 'packagesSection',
      title: 'Turnkey Logistical Packages',
      type: 'object',
      group: 'packages',
      fields: [
        { name: 'eyebrow', title: 'Section Eyebrow', type: 'string', initialValue: '// TURNKEY LOGISTICAL PACKAGES' },
        { name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Curated Packages for Executive Offsites.' },
        { name: 'description', title: 'Section Description', type: 'text', rows: 3 },
        {
          name: 'packagesList',
          title: 'Package Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'packageCard',
              fields: [
                { name: 'tierEyebrow', title: 'Tier Eyebrow', type: 'string', initialValue: 'PACKAGE 01 // REGIONAL & ACTIVE TEAMS' },
                { name: 'title', title: 'Package Title', type: 'string', initialValue: 'Base Adventure Package' },
                { name: 'description', title: 'Description', type: 'text', rows: 3 },
                {
                  name: 'isFeaturedDarkTheme',
                  title: 'Featured Dark Theme Inversion',
                  type: 'boolean',
                  description: 'Turn ON for Core Executive Offsite Package to invert the card to black background.',
                  initialValue: false,
                },
                {
                  name: 'packageId',
                  title: 'Package Identifier (for Form Selection)',
                  type: 'string',
                  description: 'Exact string selected when button is clicked (e.g. "Base Adventure Package").',
                },
                { name: 'buttonLabel', title: 'CTA Button Text', type: 'string', initialValue: 'Select Base Package →' },
                { name: 'headerImage', title: 'Card Upper-Half Background Image', type: 'image', options: { hotspot: true } },
                {
                  name: 'inclusions',
                  title: 'Structural Inclusions Checklist',
                  type: 'array',
                  of: [{ type: 'string' }],
                },
              ],
            },
          ],
        },
      ],
    }),

    /* ─────────────────────────────────────────────────────────────
       GROUP 6: MANIFEST & INQUIRY FORM (Equal Height Split Grid)
       ───────────────────────────────────────────────────────────── */
    defineField({
      name: 'inquirySection',
      title: 'Inquiry Manifest Section',
      type: 'object',
      group: 'inquiry',
      fields: [
        {
          name: 'leftEditorial',
          title: 'Left Editorial Column',
          type: 'object',
          fields: [
            { name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: '// EXECUTIVE CONCIERGE ACCESS' },
            { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Initiate Your Corporate Manifest.' },
            { name: 'description', title: 'Description', type: 'text', rows: 4 },
            {
              name: 'commitmentsBox',
              title: 'Operational Commitments Box',
              type: 'object',
              fields: [
                { name: 'eyebrow', title: 'Box Eyebrow', type: 'string', initialValue: '// OPERATIONAL COMMITMENTS' },
                {
                  name: 'items',
                  title: 'Commitment Points',
                  type: 'array',
                  of: [{ type: 'string' }],
                },
              ],
            },
          ],
        },
        {
          name: 'formConfig',
          title: 'Right Column: Email Inquiry Form Settings',
          type: 'object',
          fields: [
            { name: 'formEyebrow', title: 'Form Top Eyebrow', type: 'string', initialValue: '// INITIALIZE CORPORATE RETREAT MANIFEST' },
            { name: 'formSubtitle', title: 'Form Subtitle', type: 'string', initialValue: 'Configure your expedition requirements below. We handle all logistics, aviation, and lodging.' },
            { name: 'defaultSubject', title: 'Default Mailto Subject Line', type: 'string', initialValue: 'Corporate Expedition & Retreat Inquiry' },
            { name: 'responseGuaranteeText', title: 'Success Guarantee Text', type: 'string', initialValue: '✓ Response Guarantee: Within 4 hours during NZ business hours.' },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Corporate Workshops & Team Buildings Page' };
    },
  },
});

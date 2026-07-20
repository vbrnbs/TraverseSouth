import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'j996g8td',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-05-21',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const corporatePageSeed = {
  _id: 'corporatePage',
  _type: 'corporatePage',
  hero: {
    eyebrow: '// SOUTHERN ALPS EXECUTIVE EXPEDITIONS',
    heading: 'Corporate Workshops & Team Buildings.',
    subtitle: 'Where high-altitude adventure meets C-suite leadership. Bespoke multi-day wilderness journeys and turnkey infrastructure for executive teams, workshop creators, and speaker agencies across the Southern Alps.',
    ctaButton: {
      label: 'Inquire Now →',
      href: '#manifest',
    },
  },
  workshopsSection: {
    eyebrow: '// CORE LEADERSHIP FRAMEWORKS',
    heading: 'Types of Workshops & Frameworks We Offer:',
    description: 'We pair world-class facilitators and agencies with our South Island infrastructure across six foundational performance domains. Focused, short, and uncompromising:',
    cards: [
      {
        eyebrow: '01 /',
        title: 'Risk Management',
        description: 'Navigating extreme volatility, crisis leadership, and high-consequence risk governance.',
      },
      {
        eyebrow: '02 /',
        title: 'Decision Making',
        description: 'Strategic execution, cognitive clarity, and judgment under severe uncertainty and fatigue.',
      },
      {
        eyebrow: '03 /',
        title: 'Team Coherence',
        description: 'Forging unbreakable interpersonal trust and role alignment across C-suite boards.',
      },
      {
        eyebrow: '04 /',
        title: 'Innovation Under Duress',
        description: 'Engineering-grade lateral thinking and problem-solving when systems are pressured.',
      },
      {
        eyebrow: '05 /',
        title: 'Resilience',
        description: 'Autonomic nervous system regulation, stress architecture mastery, and recovery protocols.',
      },
      {
        eyebrow: '06 /',
        title: 'Limiting Beliefs',
        description: 'Shattering perceived personal and organizational limitations through visceral physical challenge.',
      },
    ],
  },
  infrastructureSection: {
    leftColumn: {
      eyebrow: '// THE HUMAN ELEMENT',
      heading: 'Co-Design Hand-in-Hand with Facilitators.',
      description: 'We don\'t replace your executive coach or workshop creator — we amplify them. Our specialized ops team works directly with speaker agencies, facilitators, and internal HR leaders to map curriculum timing directly onto physical wilderness challenges.',
      bulletPoints: [
        {
          title: 'Seamless Curriculum Integration',
          text: 'We map your workshop agenda, reflection hours, and keynote timing to our alpine logistics so transitions feel effortless.',
        },
        {
          title: 'Dedicated Wilderness Lodge Venues',
          text: 'From backcountry huts to private ultra-luxury mountain stations equipped with high-speed Starlink and dedicated meeting spaces.',
        },
        {
          title: 'Elite Facilitator Support Protocol',
          text: 'Facilitators focus 100% on group dynamics while our guides handle terrain safety, gourmet meals, and equipment.',
        },
      ],
      imageCaption: 'FACILITATOR CO-DESIGN SYNERGY',
    },
    rightColumn: {
      eyebrow: '// ZERO LOGISTICS FRICTION',
      heading: 'Sovereign Operations & Turnkey Execution.',
      description: 'Southern Alps weather is volatile, and complex logistics can derail even the best workshops. We act as your private operations safeguard, handling every detail around the activity so you and your participants never deal with admin or disruption.',
      bulletPoints: [
        {
          title: 'Dedicated Ops Agent on Standby',
          text: 'Live satellite monitoring and real-time contingency routing. If weather shifts, we execute seamless alternative plans instantly.',
        },
        {
          title: 'Private Aviation & Transport Charter',
          text: 'Turnkey helicopter insertions, jet boat transfers, and luxury ground transport managed under one unified schedule.',
        },
        {
          title: 'Single Consolidated Corporate Invoice',
          text: 'One straightforward contract and billing structure covering all guides, lodging, aviation, gear, and dining.',
        },
      ],
      imageCaption: 'TURBO-PROP & HELI LOGISTICS',
    },
  },
  advantageSection: {
    sectionTitle: 'Traverse South Advantage',
    columns: [
      {
        title: 'The Zero-Admin Protocol',
        description: 'All ground logistics, aviation charters, and private accommodations managed under a single itinerary and unified invoice.',
      },
      {
        title: 'Seamless Weather Pivot',
        description: 'Pre-mapped secondary and tertiary wilderness alternatives executed instantly when mountain conditions shift.',
      },
      {
        title: 'Boardroom to Backcountry',
        description: 'Complete isolation combined with executive-grade comforts, private chefs, and Starlink connectivity.',
      },
    ],
  },
  packagesSection: {
    eyebrow: '// TURNKEY LOGISTICAL PACKAGES',
    heading: 'Curated Packages for Executive Offsites.',
    description: 'Pre-engineered logistical packages built to host high-gravity leadership curricula. Whether you are an executive team or a workshop facilitator, each tier includes complete ground logistics, private guiding, and adaptable schedule structure.',
    packagesList: [
      {
        tierEyebrow: 'PACKAGE 01 // REGIONAL & ACTIVE TEAMS',
        title: 'Base Adventure Package',
        description: 'High-energy outdoor challenges combined with luxury Queenstown apartment lodging and dedicated workshop spaces. Ideal for active leadership teams and regional offsites.',
        isFeaturedDarkTheme: false,
        packageId: 'Base Adventure Package',
        buttonLabel: 'Select Base Package →',
        inclusions: [
          'Luxury Apartment Lodging (Single Occupancy Executive Rooms)',
          'Private Guided Packrafting & Backcountry River Challenges',
          'Helicopter Mountain Insertion & Alpine Ridgeline Trekking',
          'All Dedicated Private Ground Transfers & Logistics',
        ],
      },
      {
        tierEyebrow: 'PACKAGE 02 // BOARD & LEADERSHIP TEAMS',
        title: 'Core Executive Offsite Package',
        description: 'Our benchmark executive alignment package. Private wilderness lodge isolation, alpine insertions, dedicated boardroom facilities, private chefs, and wood-fired backcountry saunas.',
        isFeaturedDarkTheme: true,
        packageId: 'Core Executive Offsite Package',
        buttonLabel: 'Select Core Offsite Package →',
        inclusions: [
          'Exclusive Private Wilderness Lodge (Complete Isolation)',
          'Private Heli-Packrafting Expedition & Glacier Landing Access',
          'Backcountry Wood-Fired Sauna & Cold Plunge Sessions',
          'Private Chef for All Gourmet Meals & Wild Alpine Lunches',
          'Dedicated Boardroom Space & High-Speed Starlink Connectivity',
        ],
      },
      {
        tierEyebrow: 'PACKAGE 03 // C-SUITE & PE PARTNERS',
        title: 'Sovereign Expedition Package',
        description: 'Absolute privacy and complete isolation. Remote station lodging accessible only by air, private aviation fleets on-call, and fully bespoke 24/7 concierge monitoring for C-suite boards.',
        isFeaturedDarkTheme: false,
        packageId: 'Sovereign Expedition Package',
        buttonLabel: 'Select Sovereign Package →',
        inclusions: [
          'Private High-Country Station & Remote Alpine Lodge Exclusive Buyout',
          'On-Call Private Helicopter Fleet & Glacier Summit Insertions',
          'Bespoke Multi-Day Wilderness Progression & High-Consequence Scenarios',
          '24/7 Dedicated Ops Agent, Private Chefs & Concierge Team',
          'Complete White-Glove Privacy & Security Protocols',
        ],
      },
    ],
  },
  inquirySection: {
    leftEditorial: {
      eyebrow: '// EXECUTIVE CONCIERGE ACCESS',
      heading: 'Initiate Your Corporate Manifest.',
      description: 'Every corporate offsite is custom-engineered to match your team\'s operational objectives, fitness profiles, and curriculum requirements. Whether you are an internal C-suite leader, executive coach, or speaker agency, initiate contact below to schedule a private consultation with our Experience Architect.',
      commitmentsBox: {
        eyebrow: '// OPERATIONAL COMMITMENTS',
        items: [
          '4-Hour Response SLA during NZ Business Hours',
          'Single Consolidated Corporate Invoice',
          'Direct Concierge & Ops Agent Access',
        ],
      },
    },
    formConfig: {
      formEyebrow: '// INITIALIZE CORPORATE RETREAT MANIFEST',
      formSubtitle: 'Configure your expedition requirements below. We handle all logistics, aviation, and lodging.',
      defaultSubject: 'Corporate Expedition & Retreat Inquiry',
      responseGuaranteeText: '✓ Response Guarantee: Within 4 hours during NZ business hours.',
    },
  },
};

async function seed() {
  try {
    console.log('Seeding corporatePage document to Sanity Studio...');
    const result = await client.createOrReplace(corporatePageSeed);
    console.log('Successfully seeded or replaced document:', result._id);
  } catch (error) {
    console.error('Failed to seed corporatePage:', error);
  }
}

seed();

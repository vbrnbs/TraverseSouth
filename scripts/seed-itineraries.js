const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Read token from .env.local manually
const envPath = path.resolve('.env.local');
let token = null;
let projectId = 'j996g8td';
let dataset = 'production';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const tokenMatch = envContent.match(/SANITY_API_TOKEN\s*=\s*(.*)/);
  if (tokenMatch) token = tokenMatch[1].trim();
  const projectMatch = envContent.match(/NEXT_PUBLIC_SANITY_PROJECT_ID\s*=\s*(.*)/);
  if (projectMatch) projectId = projectMatch[1].trim();
  const datasetMatch = envContent.match(/NEXT_PUBLIC_SANITY_DATASET\s*=\s*(.*)/);
  if (datasetMatch) dataset = datasetMatch[1].trim();
}

if (!token) {
  console.error('Error: SANITY_API_TOKEN not found in .env.local');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-05-21',
  token,
  useCdn: false
});

async function run() {
  console.log('Fetching activities to map IDs...');
  const activities = await client.fetch('*[_type == "activity"]{_id, "slug": slug.current}');
  
  const activityMap = {};
  activities.forEach(act => {
    const id = act._id;
    // Prefer published version ID if it exists (no drafts. prefix)
    const cleanId = id.startsWith('drafts.') ? id.slice(7) : id;
    activityMap[act.slug] = cleanId;
  });

  console.log('Activity ID Mapping:', activityMap);

  // Define our 3 itineraries
  const itineraries = [
    {
      _id: 'itinerary-fiordland',
      _type: 'itinerary',
      title: 'Fiordland Sovereign Expedition',
      slug: { _type: 'slug', current: 'fiordland' },
      eyebrow: 'LEVEL 1 // RESTORATIVE',
      subtitle: 'A 24-meter deep-fiord private catamaran charter and pristine marine exploration.',
      description: 'Explore the absolute silence and grandeur of New Zealand\'s most remote wilderness. This restorative journey routes through the ancient sounds, waterfalls, and mist-laden peaks of Fiordland, offering an uncompromised escape from modern velocity.',
      activities: [
        { _type: 'reference', _ref: activityMap['yacht-charter'] }
      ].filter(ref => ref._ref),
      pricing: {
        priceString: '$8,500 NZD / day',
        minimumGroup: 'Exclusive charter for up to 6 guests',
        inclusions: [
          'Private 24-meter catamaran usage and onboard chef',
          'Rotorcraft transfers to and from Deep Cove',
          'Sea kayaking, marine spotting, and custom gear'
        ]
      }
    },
    {
      _id: 'itinerary-qt-mtcook',
      _type: 'itinerary',
      title: 'Alpine Adrenaline Expedition',
      slug: { _type: 'slug', current: 'qt-mtcook' },
      eyebrow: 'LEVEL 3 // HIGH GRAVITY',
      subtitle: 'Glacier climbing, heli-biking, and high-altitude landings across the Southern Alps.',
      description: 'Engineered for high-intensity seekers, this alpine manifest combines glacier mountaineering on Mt. Cook, technical switchback downhill single-track heli-biking, and glacier touchdown walks on Mt. Aspiring. A high-gravity stack optimized for absolute performance.',
      activities: [
        { _type: 'reference', _ref: activityMap['glacier-climb'] },
        { _type: 'reference', _ref: activityMap['glacier-landing'] },
        { _type: 'reference', _ref: activityMap['heli-biking'] }
      ].filter(ref => ref._ref),
      pricing: {
        priceString: 'Bespoke Package Quote',
        minimumGroup: 'Tailored for private groups of 2 to 4',
        inclusions: [
          'All aviation transit hours and mountain pilot guides',
          'Full-suspension Santa Cruz downhill bikes and technical gear',
          'IFMGA mountaineering safety guides and safety sweeping crew',
          'Otago Pinot Noir and summit glacier champagne tasting'
        ]
      }
    },
    {
      _id: 'itinerary-relax',
      _type: 'itinerary',
      title: 'Active Restoration Expedition',
      slug: { _type: 'slug', current: 'relax' },
      eyebrow: 'LEVEL 2 // ACTIVE WILDERNESS',
      subtitle: 'Backcountry helicopter fly-fishing and restricted high-country off-road Defender transits.',
      description: 'A balanced blueprint blending low-intensity master-guided fly-fishing in restricted basins with rugged, high-country Land Rover Defender off-road transits. Move seamlessly from remote riverbanks to isolated panoramic peaks.',
      activities: [
        { _type: 'reference', _ref: activityMap['fly-fishing'] },
        { _type: 'reference', _ref: activityMap['off-road'] }
      ].filter(ref => ref._ref),
      pricing: {
        priceString: '$4,500 NZD / person',
        minimumGroup: 'Private vehicles and charters for groups of 2 to 4',
        inclusions: [
          'Helicopter fly-fishing flight hours and master angler guide',
          'Custom Land Rover Defender 110 off-road usage and driver coach',
          'Orvis dry-fly rigs, waders, and private station concessions',
          'Gourmet field lunches and alpine espresso service'
        ]
      }
    }
  ];

  for (const it of itineraries) {
    if (it.activities.length === 0) {
      console.warn(`Warning: Itinerary ${it.title} has no resolved activities. Skipping.`);
      continue;
    }
    console.log(`Seeding itinerary: ${it.title}...`);
    await client.createOrReplace(it);
    console.log(`Seeded and published itinerary: ${it._id}`);
  }

  console.log('Seeding itineraries complete!');
}

run().catch((err) => {
  console.error('Error in script execution:', err);
  process.exit(1);
});

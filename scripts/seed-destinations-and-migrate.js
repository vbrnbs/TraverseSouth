const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../.env.local');
let token = process.env.SANITY_API_TOKEN || '';

if (!token && fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const match = envContent.match(/SANITY_API_TOKEN=([^\r\n]+)/);
  if (match) {
    token = match[1].trim();
  }
}

const client = createClient({
  projectId: 'j996g8td',
  dataset: 'production',
  apiVersion: '2026-05-21',
  token: token,
  useCdn: false,
});

const destinations = [
  { _id: 'destination-otago', _type: 'destination', name: 'Otago', slug: { _type: 'slug', current: 'otago' }, region: 'otago' },
  { _id: 'destination-southland', _type: 'destination', name: 'Southland', slug: { _type: 'slug', current: 'southland' }, region: 'southland' },
  { _id: 'destination-canterbury', _type: 'destination', name: 'Canterbury', slug: { _type: 'slug', current: 'canterbury' }, region: 'canterbury' },
  { _id: 'destination-west-coast', _type: 'destination', name: 'West Coast', slug: { _type: 'slug', current: 'west-coast' }, region: 'west-coast' },
  { _id: 'destination-marlborough', _type: 'destination', name: 'Marlborough', slug: { _type: 'slug', current: 'marlborough' }, region: 'marlborough' },
  { _id: 'destination-tasman', _type: 'destination', name: 'Tasman', slug: { _type: 'slug', current: 'tasman' }, region: 'tasman' }
];

async function run() {
  if (!token) {
    console.error('Error: SANITY_API_TOKEN not found in environment or .env.local');
    process.exit(1);
  }

  console.log('1. Seeding destinations into Sanity...');
  for (const dest of destinations) {
    try {
      await client.createIfNotExists(dest);
      console.log(`- Created/Verified destination: ${dest.name} (${dest.slug.current})`);
    } catch (err) {
      console.error(`Failed to create destination ${dest.name}:`, err);
    }
  }

  console.log('\n2. Fetching all activities from Sanity...');
  const activities = await client.fetch(`*[_type == "activity"]`);
  console.log(`Found ${activities.length} activities.`);

  for (const act of activities) {
    const currentRegion = act.region;
    
    // If region is a string (e.g. "otago"), migrate it to a reference
    if (currentRegion && typeof currentRegion === 'string') {
      const match = destinations.find(d => d.region === currentRegion.toLowerCase() || d.name.toLowerCase() === currentRegion.toLowerCase());
      if (match) {
        console.log(`Migrating activity "${act.title}" region string "${currentRegion}" -> reference to "${match.name}"`);
        try {
          await client
            .patch(act._id)
            .set({
              region: {
                _type: 'reference',
                _ref: match._id
              }
            })
            .commit();
          console.log(`Successfully migrated activity "${act.title}"`);
        } catch (err) {
          console.error(`Failed to migrate activity "${act.title}":`, err);
        }
      } else {
        console.log(`No destination match found for region string "${currentRegion}" in activity "${act.title}"`);
      }
    } else if (currentRegion && currentRegion._ref) {
      console.log(`Activity "${act.title}" already has a region reference: ${currentRegion._ref}`);
    } else {
      console.log(`Activity "${act.title}" has no region defined.`);
    }
  }

  console.log('\nMigration complete!');
}

run().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});

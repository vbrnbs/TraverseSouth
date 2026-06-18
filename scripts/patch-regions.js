const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Extract write token from local git-ignored .env file
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

const regions = {
  'activity-fly-fishing': 'otago',
  'activity-glacier-climb': 'canterbury',
  'activity-glacier-landing': 'otago',
  'activity-heli-biking': 'otago',
  'activity-off-road': 'otago',
  'activity-yacht-charter': 'southland'
};

async function patchRegions() {
  if (!token) {
    console.error('Error: SANITY_API_TOKEN not found. Cannot patch regions.');
    process.exit(1);
  }

  for (const [id, region] of Object.entries(regions)) {
    try {
      console.log(`Patching ${id} with region ${region}...`);
      await client
        .patch(id)
        .set({ region })
        .commit();
      console.log(`Successfully patched ${id}`);
    } catch (err) {
      console.error(`Failed to patch ${id}:`, err);
    }
  }
}

patchRegions();

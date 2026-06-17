const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Read token from .env.local manually to bypass dotenv dependency
const envPath = path.resolve('.env.local');
let token = null;
let projectId = 'j996g8td';
let dataset = 'production';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const tokenMatch = envContent.match(/SANITY_API_TOKEN\s*=\s*(.*)/);
  if (tokenMatch) {
    token = tokenMatch[1].trim();
  }
  const projectMatch = envContent.match(/NEXT_PUBLIC_SANITY_PROJECT_ID\s*=\s*(.*)/);
  if (projectMatch) {
    projectId = projectMatch[1].trim();
  }
  const datasetMatch = envContent.match(/NEXT_PUBLIC_SANITY_DATASET\s*=\s*(.*)/);
  if (datasetMatch) {
    dataset = datasetMatch[1].trim();
  }
}

if (!token) {
  console.error('Error: SANITY_API_TOKEN not found in .env.local');
  process.exit(1);
}

// Create authenticated client
const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-05-21',
  token,
  useCdn: false
});

async function uploadImage(filePath) {
  const resolvedPath = path.resolve(filePath);
  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`File does not exist at path: ${resolvedPath}`);
  }
  console.log(`Uploading asset: ${resolvedPath}`);
  const stream = fs.createReadStream(resolvedPath);
  const asset = await client.assets.upload('image', stream, {
    filename: path.basename(resolvedPath),
  });
  console.log(`Successfully uploaded. Asset ID: ${asset._id}`);
  return asset;
}

async function run() {
  console.log('Starting image asset upload for seeded activities...');

  const mappings = [
    { id: 'drafts.activity-yacht-charter', path: 'public/images/yacht_charter.png' },
    { id: 'drafts.activity-fly-fishing', path: 'public/images/fly_fishing.png' },
    { id: 'drafts.activity-off-road', path: 'public/images/off_road.png' },
    { id: 'drafts.activity-glacier-landing', path: 'public/images/glacier_landing.png' },
    { id: 'drafts.activity-heli-biking', path: 'public/images/heli_biking.png' },
    { id: 'drafts.activity-glacier-climb', path: 'public/images/glacier_climb.png' },
  ];

  for (const m of mappings) {
    try {
      const asset = await uploadImage(m.path);
      console.log(`Patching ${m.id} with image asset ${asset._id}...`);
      await client
        .patch(m.id)
        .set({
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
          },
        })
        .commit();
      console.log(`Successfully patched ${m.id}`);
    } catch (err) {
      console.error(`Error processing ${m.id}:`, err);
    }
  }

  console.log('Activity image uploads and patching complete!');
}

run().catch((err) => {
  console.error('Error in script execution:', err);
  process.exit(1);
});

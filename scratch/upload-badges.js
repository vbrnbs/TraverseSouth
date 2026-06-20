require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function uploadBadges() {
  try {
    const badgePaths = [
      path.join(__dirname, '../public/images/badge1.png'),
      path.join(__dirname, '../public/images/badge2.png'),
      path.join(__dirname, '../public/images/badge3.png'),
    ];

    const alts = [
      'Alpine Heli Co.',
      '5-Star Luxury Wilderness',
      'Oceanic Yacht Charters'
    ];

    const uploadedAssets = [];

    for (let i = 0; i < badgePaths.length; i++) {
      console.log(`Uploading ${badgePaths[i]}...`);
      const asset = await client.assets.upload('image', fs.createReadStream(badgePaths[i]), {
        filename: `badge${i + 1}.png`
      });
      uploadedAssets.push({ asset, alt: alts[i] });
      console.log(`Uploaded asset ${asset._id}`);
    }

    const badgesArray = uploadedAssets.map(({ asset, alt }, index) => ({
      _key: `badge_uploaded_${index}_${Date.now()}`,
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      },
      alt: alt
    }));

    console.log('Patching landing document...');
    const result = await client
      .patch('landing')
      .setIfMissing({ mission: {} })
      .set({ 'mission.badges': badgesArray })
      .commit();

    console.log('Successfully updated landing document:', result._id);
  } catch (error) {
    console.error('Error uploading badges:', error);
  }
}

uploadBadges();

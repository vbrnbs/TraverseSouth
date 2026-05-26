import { getCliClient } from 'sanity/cli';

const client = getCliClient();

async function run() {
  const patchData = {
    'engine.builderEyebrow': '// THE ITINERARY COMPILER',
    'engine.builderHeadline': 'Compile Your Custom Expedition',
    'engine.builderSubtitle': 'Configure your adventure parameters below. Our engine will dynamically sort available modules for you to build the ultimate South Island itinerary.'
  };

  try {
    await client.patch('homepage').set(patchData).commit();
    console.log(`Updated homepage`);
  } catch (e) {
    console.log('No published homepage found to update.');
  }

  try {
    await client.patch('drafts.homepage').set(patchData).commit();
    console.log(`Updated drafts.homepage`);
  } catch (e) {
    console.log('No draft homepage found to update.');
  }
}

run().catch(console.error);

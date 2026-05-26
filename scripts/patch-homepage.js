import { getCliClient } from 'sanity/cli';

const client = getCliClient();

async function run() {
  const homepage = await client.fetch(`*[_type == "homepage"][0]`);
  if (!homepage) {
    console.error('No homepage found');
    return;
  }
  
  await client.patch(homepage._id).set({
    'engine.builderEyebrow': '// THE ITINERARY COMPILER',
    'engine.builderHeadline': 'Compile Your Custom Expedition',
    'engine.builderSubtitle': 'Configure your adventure parameters below. Our engine will dynamically sort available modules for you to build the ultimate South Island itinerary.'
  }).commit();
  
  console.log(`Updated homepage ${homepage._id}`);
}

run().catch(console.error);

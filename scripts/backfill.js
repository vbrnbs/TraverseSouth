import { getCliClient } from 'sanity/cli';

const client = getCliClient();

const products = [
  { slug: 'off-road-drive', score: 6, days: 0.5 },
  { slug: 'glacier-climb-mountaineering', score: 10, days: 1 },
  { slug: 'fly-fishing', score: 3, days: 1 },
  { slug: 'packrafting', score: 7, days: 1 },
  { slug: 'heli-ski', score: 9, days: 1 },
  { slug: 'e-bike-wine', score: 2, days: 1 },
  { slug: 'dayhike', score: 5, days: 1 },
  { slug: 'routeburn', score: 8, days: 2 },
  { slug: 'luxury-tramp-heli-walk', score: 4, days: 1 },
  { slug: 'boat-tour', score: 1, days: 0.5 },
]

async function run() {
  const docs = await client.fetch(`*[_type == "product"]`);
  for (const p of products) {
    const doc = docs.find(d => d.slug.current === p.slug);
    if (doc) {
      await client.patch(doc._id).set({ adventureScore: p.score, durationDays: p.days }).commit();
      console.log(`Updated ${p.slug}`);
    } else {
      console.log(`Missing ${p.slug}`);
    }
  }
}

run().catch(console.error);

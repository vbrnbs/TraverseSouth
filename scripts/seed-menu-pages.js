import { getCliClient } from 'sanity/cli';

const client = getCliClient();

const pages = [
  {
    _id: 'page-adventures',
    title: 'Adventures',
    slug: { _type: 'slug', current: 'adventures' },
    seoDescription: 'Surgical day modules and high-gravity expeditions filterable by intensity across the South Island.',
    body: [
      {
        _key: 'block-adv-1',
        _type: 'block',
        style: 'normal',
        children: [{ _key: 'span-adv-1', _type: 'span', text: 'We represent a network of elite guides, aviation specialists, and marine charters. Explore our surgical day modules and high-gravity expeditions across the Southern Alps.' }]
      }
    ]
  },
  {
    _id: 'page-itineraries',
    title: 'Itineraries',
    slug: { _type: 'slug', current: 'itineraries' },
    seoDescription: 'Multi-day sovereign journeys and expedition blueprints. Expertly curated narratives combining private aviation, elite guides, and ultra-luxe lodges. Coming soon.',
    body: [
      {
        _key: 'block-itin-1',
        _type: 'block',
        style: 'normal',
        children: [{ _key: 'span-itin-1', _type: 'span', text: 'Expertly curated narratives combining private aviation, elite guides, and ultra-luxe lodges. We are currently hand-selecting our founding expedition routes.' }]
      }
    ]
  },
  {
    _id: 'page-tailor-made',
    title: 'Tailor-Made Trips',
    slug: { _type: 'slug', current: 'tailor-made' },
    seoDescription: 'We are happy to arrange any custom arrangements, including private aviation, transport, luxury accommodations and guided tours.',
    body: [
      {
        _key: 'block-tailor-1',
        _type: 'block',
        style: 'normal',
        children: [{ _key: 'span-tailor-1', _type: 'span', text: 'We are happy to arrange any arrangements, including transport, accommodation and tours — whether that is a private heli-transfer, a luxury lodge booking, or a comprehensive multi-day expedition.' }]
      }
    ]
  },
  {
    _id: 'page-group-business',
    title: 'Group & Business Trips',
    slug: { _type: 'slug', current: 'group-business' },
    seoDescription: 'Open for group and business trips. We provide private executive coaches and expert workshop facilitators for high-impact team building.',
    body: [
      {
        _key: 'block-group-1',
        _type: 'block',
        style: 'normal',
        children: [{ _key: 'span-group-1', _type: 'span', text: 'We are open for group and business trips. We can provide private luxury coaches, executive wilderness lodges, and expert workshop facilitators for high-impact team building and executive retreats.' }]
      }
    ]
  },
  {
    _id: 'page-about-us',
    title: 'About Us',
    slug: { _type: 'slug', current: 'about-us' },
    seoDescription: 'Removing friction from luxury wilderness travel in New Zealand.',
    body: [
      {
        _key: 'block-about-1',
        _type: 'block',
        style: 'normal',
        children: [{ _key: 'span-about-1', _type: 'span', text: 'Traverse South was founded in Queenstown with a singular vision: to remove the friction from luxury wilderness travel. We represent a collective of the South Island’s most elite guides, aviation specialists, and marine operators.' }]
      }
    ]
  }
];

async function run() {
  console.log('Seeding / updating navigation pages in Sanity...');
  for (const page of pages) {
    const existing = await client.fetch(`*[_type == "page" && slug.current == $slug][0]`, { slug: page.slug.current });
    
    if (existing) {
      await client.patch(existing._id).set({
        title: page.title,
        seoDescription: page.seoDescription,
        body: page.body
      }).commit();
      console.log(`Updated page: ${page.title} (${page.slug.current})`);
    } else {
      await client.createIfNotExists({
        _id: page._id,
        _type: 'page',
        title: page.title,
        slug: page.slug,
        seoDescription: page.seoDescription,
        body: page.body
      });
      console.log(`Created page: ${page.title} (${page.slug.current})`);
    }
  }
  console.log('Finished seeding pages!');
}

run().catch(err => {
  console.error('Error seeding pages:', err);
  process.exit(1);
});

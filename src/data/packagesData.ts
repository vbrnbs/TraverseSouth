export interface ItineraryDay {
  dayNumber: string;
  title: string;
  description: string;
  logistics: string;
}

export interface SupplierNetwork {
  label: string;
  name: string;
  credential: string;
}

export interface PackageDetail {
  slug: string;
  title: string;
  subtitle: string;
  overview: string;
  days: ItineraryDay[];
  suppliers: SupplierNetwork[];
  pricing: {
    priceString: string;
    minimumGroup: string;
    inclusions: string[];
  };
  ctaText?: string;
}

export const packagesData: Record<string, PackageDetail> = {
  fiordland: {
    slug: 'fiordland',
    title: 'Fiordland',
    subtitle: 'Fjord Catamaran Charter',
    overview: 'A seven-day private alpine and maritime expedition deep into Milford Sound. Gain vertical air access to high-altitude Darran Mountain glaciers via private turbine helicopter, navigate the absolute silence of the fjords aboard a 24-meter catamaran charter, and recover your biological baseline at a secluded, air-accessible geothermal eco-lodge.',
    ctaText: "I'm interested",
    days: [
      {
        dayNumber: 'Day 1–2',
        title: 'Turbine Heli-Transit & Milford Sound Private Charter',
        description: 'Launch from Queenstown via private AS350 helicopter to land directly aboard an exclusive 24-meter luxury catamaran deep within Milford Sound. Spend two days navigating towering granite fjords, dining on wild-food tasting menus prepared by your private chef, and sleeping in absolute fjord silence.',
        logistics: 'Transit: 42-minute rotor flight. Helicopter: AS350 B3 Squirrel. Marine: Exclusive charter, 24m Catamaran. Guides: Local Skipper & Master Angler.'
      },
      {
        dayNumber: 'Day 3–4',
        title: 'Glacial Heli-Hike & Ridge Traverse',
        description: 'Heli-drop onto Mount Tutoko’s high plateaus. Under elite IFMGA-certified mountain guides, traverse spectacular glacier fields and blue-ice ridges. For active water navigation, swap this alpine traverse for a guided Hollyford River swiftwater packrafting run.',
        logistics: 'Transit: Private heli-insertion. Terrain: Crevasse walking & alpine ridge traverse. Technical Swap: Optional grade-2 river packrafting. Safety: IFMGA Mountain Guides.'
      },
      {
        dayNumber: 'Day 5–7',
        title: 'Restricted High-Country Off-Road & Geothermal Eco-Lodge',
        description: 'Self-drive a custom Land Rover Defender 110 through restricted, non-public high-country mountain routes under elite guide instruction. Conclude at an off-grid architectural eco-villa, soaking in geothermal cedar pools overlooking the silent waters of the fjord.',
        logistics: 'Vehicles: Land Rover Defender 110 (custom off-road spec). Accommodation: Private eco-villa (100% solar & geothermal). Inclusions: Geothermal hot springs & private host.'
      }
    ],
    suppliers: [
      { label: 'Aviation Operator', name: 'Southern Alps Heli-Charters', credential: 'CAA Part 135 Certified // Class A Alpine Pilots' },
      { label: 'Marine Charter', name: 'Fiordland Sovereign Yachting', credential: 'Private Luxury Surveyed Vessel // 5-Star Onboard Chef' },
      { label: 'Backcountry Guides', name: 'Southern Alps Alpine & River Guides', credential: 'IFMGA Mountain & Certified Swiftwater Rescue Guides' }
    ],
    pricing: {
      priceString: '$18,500 NZD / person',
      minimumGroup: 'Tailored for private groups of 2 to 6 guests',
      inclusions: [
        'All private helicopter flight hours and pilot standby fees',
        'Private Milford Sound yacht charter and private onboard chef',
        'Top-tier alpine mountaineering and ridge-walking gear (or premium packrafting/drysuits for the swap)',
        'Custom Land Rover Defender self-drive vehicle hire and private driving guides',
        'Three nights of exclusive-use luxury eco-lodge accommodation',
        'All premium local wines, wild-caught seafood, and organic dining inclusions'
      ]
    }
  },
  'qt-mtcook': {
    slug: 'qt-mtcook',
    title: 'Alpine Adrenaline',
    subtitle: 'Glacier Crevasse Mountaineering & 800,000-Acre Heli-Skiing',
    overview: 'An intensive, high-performance expedition for freeriders and alpine enthusiasts. Acquire direct, unrestricted access to the most massive vertical fields in the Southern Alps, navigate complex blue ice formations, and cross the famed Harris Saddle with the highest-credentialed mountain guides in the Southern Hemisphere.',
    days: [
      {
        dayNumber: 'Day 1–2',
        title: 'Tasman Glacier Ice-Climbing & Crevasse Navigation',
        description: 'Heli-drop directly onto the active white expanse of the Tasman Glacier, New Zealand’s longest river of ice. Rope up with your personal IFMGA-certified alpine guide, strap on technical crampons, and spend two days ice-climbing towering frozen seracs, exploring hidden electric-blue ice caves, and learning crevasse rescue techniques. Retire each night to a glass-fronted alpine shelter built on a sheer rock ridge, watching the stars wheel over Mt. Cook.',
        logistics: 'Transit: Heli-drop onto Tasman Glacier. Technical: Technical crampons, ice screws, and harness systems. Accommodation: Mountain ridge shelter (private chef catered).'
      },
      {
        dayNumber: 'Day 3–5',
        title: 'Southern Alps Unrestricted Heli-Skiing Operations',
        description: 'Wake up to crisp, sub-zero alpine air. Board your dedicated Eurocopter EC130 and launch into 800,000 acres of permitted, untouched powder across the Southern Alps. With no designated trails and infinite vertical feet, your guide will map custom powder runs matching your physical capability. Carve pristine slopes rarely touched by humans, concluding each day with mountain-top champagne and local high-country reserve tasting boxes.',
        logistics: 'Aviation: Eurocopter EC130 (dedicated private charter). Terrain: 800,000 permitted backcountry acres. Guide Ratio: 1:3 maximum. Safety: Pulse-beacons, avalanche packs provided.'
      },
      {
        dayNumber: 'Day 6–7',
        title: 'Harris Saddle High Pass Technical Traverse',
        description: 'Bypass the multiple-day hiking trails. Fly directly to the high-altitude Harris Saddle (1,255m) on the famed Routeburn Track. Spend two days executing a technical ridge traverse across alpine scree, cascading waterfalls, and spectacular hanging valleys. Conclude the traverse by flying directly out to a private high-country sheep station, enjoying a slow-roasted local lamb rack and fine Central Otago pinot noir by a roaring open hearth.',
        logistics: 'Hike parameters: 12.5km technical high-pass route. Elevation change: +650m / -400m. Transition: Saddle heli-extraction. Dining: Private country estate host.'
      }
    ],
    suppliers: [
      { label: 'Mountain Safety', name: 'Alpine Guide Alliance NZ', credential: '100% IFMGA Certified Alpine Guides' },
      { label: 'Heli-Ski Operator', name: 'Apex Heli-Ski NZ', credential: 'Exclusive Southern Alps Backcountry Licensee // CAA Part 135' },
      { label: 'Ridge Lodgings', name: 'Tasman High Ridge Shelters', credential: 'Private Heli-Supplied High-Altitude Luxury Shelters' }
    ],
    pricing: {
      priceString: '$19,500 NZD / person',
      minimumGroup: 'Tailored for private groups of 2 to 4 guests',
      inclusions: [
        'Dedicated standby helicopter hours and private Eurocopter charter',
        'Private IFMGA-certified alpine guide for the entire expedition duration',
        'Technical climbing gear, ice axes, crampons, avalanche safety packs, and trackers',
        'Unrestricted heli-skiing passes and unlimited vertical drops',
        'All luxury alpine lodge and high-altitude shelter accommodations',
        'All gourmet meals, private chef catering, and premium high-altitude reserve dining'
      ]
    }
  },
  relax: {
    slug: 'relax',
    title: 'Active Restoration',
    subtitle: 'Backcountry Glacial Fly-Fishing & Canyon-Edge Thermal Recovery',
    overview: 'A week of active biological resetting engineered for high-octane individuals. Stalk trophy trout in untamed glacial rivers, e-bike along private cellar door routes in the Gibbston Valley, and recover your body at a secluded canyon sanctuary overlooking the Shotover River.',
    days: [
      {
        dayNumber: 'Day 1–2',
        title: 'Backcountry Helicopter Fly-Fishing Operations',
        description: 'Board your private helicopter and fly deep into untracked backcountry river valleys inaccessible by foot or vehicle. Spend two days walking the crystal-clear, emerald pools of remote mountain rivers. Under the instruction of a master angler, fly-cast for wild trophy Brown and Rainbow trout in complete silence. Experience the meditative focus of stalking trout in water so clear they appear suspended in air. All fishing is strictly catch-and-release.',
        logistics: 'Transit: 25-minute heli-flight into restricted valley. Equipment: Premium Orvis fly gear & waders. Guides: NZ Professional Fishing Guides Association member.'
      },
      {
        dayNumber: 'Day 3–4',
        title: 'Gibbston Reserve Vineyard E-Bike & Private Cellars',
        description: 'Mount a premium, high-torque electric mountain bike and glide along the rugged trails of the Gibbston Valley wine region. Access private, non-public vineyards and gravel farm paths. Meet estate founders for exclusive cellar door library reserve tastings directly from the barrels. Enjoy curated Central Otago charcuterie boards while learning the high-altitude viticulture that defines Central Otago Pinot Noir.',
        logistics: 'Bikes: Specialized Turbo Tero electric mountain bikes. Route: 18km private gravel trails. Access: Direct entry to 3 private family-owned vineyards.'
      },
      {
        dayNumber: 'Day 5–7',
        title: 'Shotover Canyon Private Thermal Onsen & Spa',
        description: 'Conclude your expedition with an active biological reset. Secure exclusive-use access to a premier alpine wellness sanctuary perched on the cliffs of the Shotover Canyon. Transition between geothermal hot pools, cryotherapy cold plunges, and dry cedar saunas to reset your vascular system. Includes customized deep-tissue sports massage and private culinary nutrition design to restore your baseline strength.',
        logistics: 'Facility: Private, exclusive-use thermal sanctuary. Recovery: Cryotherapy, Onsen, and cedar sauna. Treatment: 90-minute bespoke clinical sports massage.'
      }
    ],
    suppliers: [
      { label: 'Angling Guides', name: 'Backcountry Anglers NZ', credential: 'NZPFGA Registered Master Angler Guides' },
      { label: 'Reserve Vineyards', name: 'Gibbston Reserve Estates', credential: 'Exclusive Cellar Door Access & Library Reserve Allocations' },
      { label: 'Restoration Spa', name: 'Shotover Thermal Sanctuary', credential: 'Private Canyon-Edge Wellness Facilities' }
    ],
    pricing: {
      priceString: '$15,500 NZD / person',
      minimumGroup: 'Tailored for private groups of 2 to 8 guests',
      inclusions: [
        'Private helicopter transfers to remote fly-fishing river basins',
        'Top-tier fly-fishing equipment, waders, and professional master angler guides',
        'Bespoke high-performance electric mountain bike hire and local route navigation',
        'Exclusive-use access to private vineyard barrel rooms and library reserves',
        'Exclusive booking of the Shotover Canyon cliffside thermal spa facility',
        'Bespoke clinical sports massage, cryotherapy sessions, and nutritional plans'
      ]
    }
  }
};

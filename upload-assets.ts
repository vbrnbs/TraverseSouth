import { getCliClient } from 'sanity/cli';
import * as fs from 'fs';
import * as path from 'path';

// Get CLI client with write token configured
const client = getCliClient({ apiVersion: '2026-05-21' });

async function uploadImage(filePath: string) {
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
  console.log('Starting image asset upload...');
  
  // Upload all 4 images
  const fiordlandAsset = await uploadImage('public/images/fiordland_sound.png');
  const alpineAsset = await uploadImage('public/images/alpine_lodge.png');
  const gibbstonAsset = await uploadImage('public/images/gibbston_cellar.png');
  const packraftingAsset = await uploadImage('public/images/packrafting_river.png');

  console.log('All image assets uploaded. Patching database documents...');

  // 1. Patch category-fiordland
  console.log('Patching category-fiordland...');
  await client
    .patch('category-fiordland')
    .set({
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: fiordlandAsset._id,
        },
      },
    })
    .commit();

  // 2. Patch category-qt-mtcook
  console.log('Patching category-qt-mtcook...');
  await client
    .patch('category-qt-mtcook')
    .set({
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: alpineAsset._id,
        },
      },
    })
    .commit();

  // 3. Patch category-relax
  console.log('Patching category-relax...');
  await client
    .patch('category-relax')
    .set({
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: gibbstonAsset._id,
        },
      },
    })
    .commit();

  // 4. Patch homepage (mission.photoDeck)
  console.log('Patching homepage mission photoDeck...');
  await client
    .patch('homepage')
    .set({
      'mission.photoDeck': [
        {
          _key: 'p1',
          _type: 'photoItem',
          label: '// FIORDLAND HELI',
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: fiordlandAsset._id,
            },
          },
        },
        {
          _key: 'p2',
          _type: 'photoItem',
          label: '// ALPINE LODGE',
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: alpineAsset._id,
            },
          },
        },
        {
          _key: 'p3',
          _type: 'photoItem',
          label: '// RIVER CROSSING',
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: packraftingAsset._id,
            },
          },
        },
      ],
    })
    .commit();

  console.log('Sanity database updated successfully! Now updating local seed files...');

  // Update homepage-defaults.ndjson file
  const ndjsonPath = path.resolve('homepage-defaults.ndjson');
  if (fs.existsSync(ndjsonPath)) {
    const lines = fs.readFileSync(ndjsonPath, 'utf-8').split('\n').filter(Boolean);
    const updatedLines = lines.map((line) => {
      const doc = JSON.parse(line);
      if (doc._id === 'homepage') {
        doc.mission.photoDeck = [
          {
            _key: 'p1',
            _type: 'photoItem',
            label: '// FIORDLAND HELI',
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: fiordlandAsset._id,
              },
            },
          },
          {
            _key: 'p2',
            _type: 'photoItem',
            label: '// ALPINE LODGE',
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: alpineAsset._id,
              },
            },
          },
          {
            _key: 'p3',
            _type: 'photoItem',
            label: '// RIVER CROSSING',
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: packraftingAsset._id,
              },
            },
          },
        ];
      } else if (doc._id === 'category-fiordland') {
        doc.image = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: fiordlandAsset._id,
          },
        };
      } else if (doc._id === 'category-qt-mtcook') {
        doc.image = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: alpineAsset._id,
          },
        };
      } else if (doc._id === 'category-relax') {
        doc.image = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: gibbstonAsset._id,
          },
        };
      }
      return JSON.stringify(doc);
    });

    fs.writeFileSync(ndjsonPath, updatedLines.join('\n') + '\n', 'utf-8');
    console.log(`Updated local seed file: ${ndjsonPath}`);
  }

  console.log('Migration script complete!');
}

run().catch((err) => {
  console.error('Error during asset migration:', err);
  process.exit(1);
});

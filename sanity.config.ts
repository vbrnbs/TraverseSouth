import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { presentationTool } from 'sanity/presentation';
import { muxInput } from 'sanity-plugin-mux-input';
import { schemaTypes } from './src/sanity/schema';
import { TrafficMonitorTool } from './src/app/studio/TrafficMonitor';
import { deskStructure } from './src/sanity/deskStructure';

export default defineConfig({
  name: 'traverse-south',
  title: 'Traverse South',
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'j996g8td',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool({ structure: deskStructure }),
    visionTool(),
    muxInput(),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: '/api/draft',
        },
      },
    }),
  ],
  tools: (prev) => [...prev, TrafficMonitorTool],
  schema: {
    types: schemaTypes,
  },
});


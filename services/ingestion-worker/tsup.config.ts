import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  format: ['esm'],
  outDir: 'dist',
  clean: true,
  noExternal: [
    '@openvitals/database',
    '@openvitals/common',
    '@openvitals/ai',
    '@openvitals/blob-storage',
    '@openvitals/ingestion',
    '@openvitals/events',
  ],
});

/// <reference types="vitest" />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/readmes',

  plugins: [react(), nxViteTsPaths()],

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: ['src/index.ts'],
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es']
    },
    rollupOptions: {
      output: {
        preserveModules: true,
        dir: 'dist/readmes'
      },
      external: ['react', 'react-dom', 'react/jsx-runtime']
    }
  },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest'
    },
    coverage: {
      provider: 'v8',
      reporter: ['lcov']
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
  }
});

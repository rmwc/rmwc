/// <reference types="vitest" />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/doc-utils-markdown',

  plugins: [react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    cssCodeSplit: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: {
        index: 'src/index.ts'
      },
      formats: ['es']
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        /@rmwc\/.*/,
        /@material\/.*/
      ]
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

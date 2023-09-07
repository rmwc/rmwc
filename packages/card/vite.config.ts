/// <reference types="vitest" />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/card',

  plugins: [
    dts({
      entryRoot: 'src',
      tsConfigFilePath: path.join(__dirname, 'tsconfig.lib.json'),
      skipDiagnostics: true
    }),
    react(),
    nxViteTsPaths()
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: {
        index: 'src/index.ts',
        styles: 'src/styles.ts'
      },
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es', 'cjs']
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
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['../../setupTests.ts']
  }
});

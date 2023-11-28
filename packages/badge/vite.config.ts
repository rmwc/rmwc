/// <reference types="vitest" />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/badge',

  plugins: [
    dts({
      pathsToAliases: false,
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json')
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
    cssCodeSplit: true,
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
      ],
      output: {
        outro: (chunk) => {
          if (chunk.isEntry && chunk.name === 'styles') {
            return "import './badge.css'";
          }
          return '';
        },
        assetFileNames: (chunk) => {
          if (chunk.name === 'styles.css') {
            return 'badge.css';
          }
          return '[name].[ext]';
        }
      }
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
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['../../setupTests.ts']
  }
});

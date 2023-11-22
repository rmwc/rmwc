/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  cacheDir: '../node_modules/.vite/rmwc',

  plugins: [
    dts({
      entryRoot: 'src',
      tsConfigFilePath: path.join(__dirname, 'tsconfig-markdown.json'),
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
      entry: [
        'packages/rmwc/src/index.ts',
        'utils/doc-utils/src/index.ts',
        'utils/readme/src/index.ts'
      ],
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
  }
});

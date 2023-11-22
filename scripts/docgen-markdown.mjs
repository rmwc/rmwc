import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import { execSync } from 'child_process';
import getPackages from './get-packages.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../');

const getMarkdown = async (packageName) => {
  const readmeFiles = fs
    .readdirSync(
      path.resolve('dist', 'readmes', 'utils', 'readme', 'src', 'readmes')
    )
    .filter((fName) => fName.startsWith(packageName) && fName.endsWith('.mjs'));

  const promises = readmeFiles.map(async (fName) => {
    const docPath = path.resolve(
      'dist',
      'readmes',
      'utils',
      'readme',
      'src',
      'readmes',
      fName
    );
    const fileOutputName = path.basename(fName, '.js').toUpperCase() + '.md';
    const outputPath = path.resolve(
      'dist',
      'readmes',
      'utils',
      'readme',
      'src',
      'readmes',
      fileOutputName
    );
    const { default: Component } = await import(docPath);
    const content = renderToStaticMarkup(React.createElement(Component))
      .replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<')
      .replace(/&#x27;/g, "'")
      .replace(/&quot;/g, '"');
    return new Promise((resolve) => {
      fs.writeFile(outputPath, content, () => {
        resolve();
      });
    });
  });

  return Promise.all(promises);
};

try {
  execSync(
    //`./node_modules/.bin/tsc --project ${root}/scripts/tsconfig-markdown.json`,
    `./node_modules/.bin/vite --config ${root}/scripts/vite.config.ts build `,
    {
      stdio: [0, 1, 2]
    }
  );

  //execSync(`./node_modules/.bin/copyfiles --up 1 src/**/*.json build/dist`);

  const promises = getPackages(['readme']).map((d) => {
    console.log(`Generating Markdown For: ${d}`);
    return getMarkdown(d);
  });

  Promise.all(promises);
} catch (err) {
  console.error(err.toString());
}

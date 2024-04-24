import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import getPackages from './get-packages.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../');

const distPath = path.resolve(
  'dist',
  'readmes',
  'utils',
  'readme',
  'src',
  'readmes'
);

const getMarkdown = async (packageName) => {
  const readmeFiles = fs.readdirSync(distPath).filter((fName) => {
    const packageNameWithoutExt = fName.slice(0, fName.lastIndexOf('.mjs'));
    return packageNameWithoutExt === packageName && fName.endsWith('.mjs');
  });

  const promises = readmeFiles.map(async (fName) => {
    const docPath = path.resolve(distPath, fName);
    const { default: Component } = await import(docPath);
    const content = renderToStaticMarkup(React.createElement(Component))
      .replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<')
      .replace(/&#x27;/g, "'")
      .replace(/&quot;/g, '"');

    const readmeOutputName = path.resolve('packages', packageName, 'README.md');

    return new Promise((resolve) => {
      fs.writeFile(readmeOutputName, content, () => {
        console.log('Writing file: ', readmeOutputName);
        resolve();
      });
    });
  });

  return Promise.all(promises);
};

try {
  const promises = getPackages(['readme']).map((d) => {
    console.log(`Generating Markdown For: ${d}`);
    return getMarkdown(d);
  });

  Promise.all(promises);
} catch (err) {
  console.error(err.toString());
}

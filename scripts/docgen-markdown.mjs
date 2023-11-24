import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import getPackages from './get-packages.js';
import { default as TurndownService } from 'turndown';
import * as prettier from 'prettier';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../');

const turndownService = TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  preformattedCode: true,
  strongDelimiter: '__',
  codeBlockStyle: 'fenced'
});

turndownService.addRule('code', {
  filter: ['pre'],
  replacement: function (content) {
    return '```js' + content + '```';
  }
});

const distPath = path.resolve(
  'dist',
  'readmes',
  'utils',
  'readme',
  'src',
  'readmes'
);

const getMarkdown = async (packageName) => {
  const readmeFiles = fs
    .readdirSync(distPath)
    .filter((fName) => fName.startsWith(packageName) && fName.endsWith('.mjs'));

  const promises = readmeFiles.map(async (fName) => {
    const docPath = path.resolve(distPath, fName);
    const htmlOutputName = packageName + '.html';
    const { default: Component } = await import(docPath);
    const htmlContent = renderToStaticMarkup(React.createElement(Component));
    const markdown = await prettier.format(
      turndownService.turndown(htmlContent),
      {
        parser: 'markdown'
      }
    );
    const readmeOutputName = path.resolve('packages', packageName, 'README.md');

    return new Promise((resolve) => {
      fs.writeFile(path.resolve(distPath, htmlOutputName), htmlContent, () => {
        resolve();
      });
      fs.writeFile(readmeOutputName, markdown, () => {
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

import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import { execSync } from 'child_process';
import getPackages from './get-packages.js';
import { default as TurndownService } from 'turndown';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../');

const turndownService = TurndownService({ codeBlockStyle: 'fenced' });

turndownService.addRule('code', {
  filter: ['pre'],
  replacement: function (content) {
    return '```' + content + '```';
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
    const markdownOutputName = path.basename(fName).toUpperCase() + '.md';
    const htmlOutputName = path.basename(fName) + '.html';
    const { default: Component } = await import(docPath);
    const htmlContent = renderToStaticMarkup(React.createElement(Component));
    const markdown = turndownService.turndown(htmlContent);
    return new Promise((resolve) => {
      fs.writeFile(path.resolve(distPath, htmlOutputName), htmlContent, () => {
        resolve();
      });
      fs.writeFile(path.resolve(distPath, markdownOutputName), markdown, () => {
        resolve();
      });
    });
  });

  return Promise.all(promises);
};

try {
  execSync(
    `./node_modules/.bin/vite --config ${root}/scripts/vite.config.ts build `,
    {
      stdio: [0, 1, 2]
    }
  );

  const promises = getPackages(['readme']).map((d) => {
    console.log(`Generating Markdown For: ${d}`);
    return getMarkdown(d);
  });

  Promise.all(promises);
} catch (err) {
  console.error(err.toString());
}

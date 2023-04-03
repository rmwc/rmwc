const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const path = require('path');
const root = path.resolve(__dirname, '../');
const moduleAlias = require('module-alias');
moduleAlias.addAlias('@rmwc', root + '/build/dist');
moduleAlias.addAlias('@doc-utils', root + '/build/dist/doc-utils-markdown');

const { execSync } = require('child_process');
const fs = require('fs');
const getChangedPackages = require('./get-changed-packages');

const getMarkdown = (packageName) => {
  const readmeFiles = fs
    .readdirSync(path.resolve('build', 'dist', packageName))
    .filter((fName) => fName.startsWith('readme') && fName.endsWith('.js'));

  const promises = readmeFiles.map((fName) => {
    const docPath = path.resolve('build', 'dist', packageName, fName);
    const fileOutputName = path.basename(fName, '.js').toUpperCase() + '.md';
    const outputPath = path.resolve('src', packageName, fileOutputName);
    const { default: Component } = require(docPath);
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
    `./node_modules/.bin/tsc --project ${root}/tsconfig-build.json --target es5 --module CommonJS`,
    {
      stdio: [0, 1, 2]
    }
  );

  execSync(`./node_modules/.bin/copyfiles --up 1 src/**/*.json build/dist`);

  const promises = getChangedPackages()
    .filter((name) => !['rmwc', '@types'].includes(name))
    .map((d) => {
      console.log(`Generating Markdown For: ${d}`);
      return getMarkdown(d);
    });

  Promise.all(promises).then(() => {
    execSync(`rm -rf build`);
  });
} catch (err) {
  console.error(err.toString());
}

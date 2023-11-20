const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const path = require('path');
const root = path.resolve(__dirname, '../');
const moduleAlias = require('module-alias');
moduleAlias.addAlias('@rmwc', root + '/dist/packages/rmwc');
moduleAlias.addAlias('@rmwc/doc-utils', root + '/scripts/build/dist/utils/doc-utils/src');

const { execSync } = require('child_process');
const fs = require('fs');
const getPackages = require('./get-packages');

const getMarkdown = (packageName) => {
  const readmeFiles = fs
    .readdirSync(path.resolve('scripts','build', 'dist', 'utils', 'readme', 'src', 'readmes'))
    .filter((fName) => fName.startsWith(packageName) && fName.endsWith('.js'));

  const promises = readmeFiles.map((fName) => {
    const docPath = path.resolve('scripts','build', 'dist', 'utils', 'readme', 'src', 'readmes', fName);
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
    `./node_modules/.bin/tsc --project ${root}/scripts/tsconfig-markdown.json`,
    {
      stdio: [0, 1, 2]
    }
  );

  //execSync(`./node_modules/.bin/copyfiles --up 1 src/**/*.json build/dist`);

  const promises = getPackages(['readme']).map((d) => {
    console.log(`Generating Markdown For: ${d}`);
    return getMarkdown(d);
  });

  Promise.all(promises).then(() => {
    execSync(`rm -rf build`);
  });
} catch (err) {
  console.error(err.toString());
}

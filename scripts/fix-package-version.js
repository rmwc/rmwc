/**
 * Generate changelog only reads package.jsons version...
 * Lerna only uses its own version
 * ... this is a dumb script that keeps the two in sync
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../');

const pkgJsonPath = path.resolve(root, 'package.json');
const lernaJsonPath = path.resolve(root, 'lerna.json');

fs.readFile(pkgJsonPath, 'utf8', (err, p) => {
  fs.readFile(lernaJsonPath, 'utf8', (err, l) => {
    const newVersion = JSON.parse(l).version;
    const content = JSON.parse(p);
    content.version = newVersion;
    fs.writeFileSync(pkgJsonPath, JSON.stringify(content, null, 2), 'utf8');
  });
});

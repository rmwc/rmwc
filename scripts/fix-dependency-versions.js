/*
 * This script updates the version of all workspace dependencies to the version
 * of the root package.json. This is needed because nx currently does not support
 * this out of the box.
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../');

const rootPackagePath = path.resolve(root, 'package.json');
const rootPackageJson = JSON.parse(fs.readFileSync(rootPackagePath, 'utf8'));

let logVerbose = process.argv.includes('--verbose');

// Read all package.json files in dist/packages
const packagesPath = path.resolve(root, 'dist/packages');
const packages = fs.readdirSync(packagesPath);
packages.forEach((packageName) => {
  const packagePath = path.resolve(packagesPath, packageName);
  const packageJsonPath = path.resolve(packagePath, 'package.json');
  // if no package.json exists then skip
  if (!fs.existsSync(packageJsonPath)) {
    return;
  }
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  if (logVerbose) {
    console.log(`Updating ${packageName}...`);
  }
  updateDependencies(packageJson.dependencies);
  updateDependencies(packageJson.devDependencies);
  updateDependencies(packageJson.peerDependencies);

  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2),
    'utf8'
  );
  if (logVerbose) {
    console.log(`Updated ${packageName}!`);
  }
});

console.log('Fixed dependency versions!');

function updateDependencies(dependencies) {
  if (!dependencies) {
    return;
  }
  Object.keys(dependencies).forEach((dependencyKey) => {
    if (dependencies[dependencyKey].startsWith('workspace:')) {
      dependencies[dependencyKey] = rootPackageJson.version;
    }
  });
}

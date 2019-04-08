const { exec, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const genDocExample = packageName => {
  const docsExamplePath = path.resolve('src', packageName, 'readme.tsx');
  const examplePath = path.resolve(
    'src',
    packageName,
    'generated-examples.json'
  );
  if (fs.existsSync(docsExamplePath)) {
    const code = fs.readFileSync(docsExamplePath).toString();
    const regexp = /\<DocsExample.*?\>([\S\s]+?)\<\/DocsExample/gm;
    let match;
    const matches = [];
    while (match !== null) {
      match = regexp.exec(code);
      match && matches.push(match[1]);
    }

    const formattedMatches = matches.map(m => {
      const parts = m.split('\n').slice(1, -1);
      const regexp = /(^\s+)/g;
      const trimLength = regexp.exec(parts[0])[1].length;
      let joined = parts.map(p => p.slice(trimLength)).join('\n');
      if (joined.startsWith('{')) {
        joined = joined.slice(1);
      }

      if (joined.endsWith('}')) {
        joined = joined.slice(0, -1);
      }

      return joined;
    });

    fs.writeFileSync(examplePath, JSON.stringify(formattedMatches));
  } else {
    fs.writeFileSync(examplePath, JSON.stringify([]));
  }
};

const getChangedPackages = () => {
  const changed = execSync('node_modules/.bin/lerna changed')
    .toString()
    .split('\n')
    .map(v => v.replace('@rmwc/', ''))
    .filter(Boolean);
  return changed;
};

try {
  getChangedPackages()
    .filter(name => !['base', 'rmwc', '@types'].includes(name))
    .forEach(d => {
      console.log(`Building Docs For: ${d}`);
      genDocExample(d);
      return;
      const proc = exec(
        `documentalist ./src/${d}/*.tsx --no-css --no-md > ./src/${d}/generated-props.json`
      );

      proc.stdout.on('data', data => {
        console.log(data.toString());
      });

      proc.stderr.on('data', data => {
        console.log('Error: ' + data.toString());
      });

      proc.on('exit', code => {});
    });
} catch (err) {
  console.error(err.toString());
}

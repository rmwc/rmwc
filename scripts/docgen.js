const { exec, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const genDocExample = packageName => {
  const readmeFiles = fs
    .readdirSync(path.resolve('src', packageName))
    .filter(fName => fName.startsWith('readme') && fName.endsWith('.tsx'));

  readmeFiles.forEach(fName => {
    const docsExamplePath = path.resolve('src', packageName, fName);
    const examplesFilename =
      fName === 'readme.tsx'
        ? 'generated-examples.json'
        : `generated-examples-${fName.slice(7, -4)}.json`;
    const examplePath = path.resolve('src', packageName, examplesFilename);

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
        // do some global find and replace
        m = m.replace(/\<any\>/g, '');

        const parts = m
          .split('\n')
          .slice(1, -1)
          .filter(l => !l.includes('@ts-ignore'));
        const regexp = /(^\s+)/g;
        const trimLength = regexp.exec(parts[0])[1].length;
        let cleaned = parts.map(p => p.slice(trimLength));
        if (cleaned[0] && cleaned[0].startsWith('{')) {
          cleaned = cleaned.slice(1, -1);
        }

        return cleaned.join('\n');
      });

      fs.writeFileSync(examplePath, JSON.stringify(formattedMatches));
    } else {
      fs.writeFileSync(examplePath, JSON.stringify([]));
    }
  });
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

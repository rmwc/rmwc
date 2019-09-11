const path = require('path');
const fs = require('fs');
const getAllPackages = require('./get-all-packages');

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
        m = m.replace(/\/\* jsx \*\/ /g, '');

        const parts = m
          .split('\n')
          .slice(1, -1)
          .filter(l => !l.includes('@ts-ignore'));
        const regexp = /(^\s+)/g;
        const trimLength = regexp.exec(parts[0])[1].length;
        let cleaned = parts.map(p => p.slice(trimLength)).join('\n');
        if (cleaned.startsWith('{')) {
          cleaned = cleaned.slice(1, -1);
        }

        if (cleaned.startsWith('`')) {
          cleaned = cleaned.slice(1, -1);
        }

        return cleaned;
      });

      fs.writeFile(examplePath, JSON.stringify(formattedMatches), () => {});
    } else {
      fs.writeFile(examplePath, JSON.stringify([]), () => {});
    }
  });
};

try {
  getAllPackages()
    .filter(name => !['base', 'rmwc', '@types'].includes(name))
    .forEach(d => {
      console.log(`Generating Examples For: ${d}`);
      genDocExample(d);
    });
} catch (err) {
  console.error(err.toString());
}

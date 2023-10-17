const path = require('path');
const fs = require('fs');

const generateDocExamples = () => {
  const readmeFiles = fs.readdirSync(
    path.resolve('utils', 'readme', 'src', 'readmes')
  );

  readmeFiles.forEach((fName) => {
    const docsExamplePath = path.resolve(
      'utils',
      'readme',
      'src',
      'readmes',
      fName
    );
    const exampleFileName = `${path.parse(fName).name}.json`;
    const exampleFilePath = path.resolve(
      'utils',
      'readme',
      'src',
      'generated-examples',
      exampleFileName
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

      const formattedMatches = matches.map((m) => {
        // do some global find and replace
        m = m.replace(/\<any\>/g, '');
        m = m.replace(/\/\* jsx \*\/ /g, '');

        const parts = m
          .split('\n')
          .slice(1, -1)
          .filter((l) => !l.includes('@ts-ignore'));
        const regexp = /(^\s+)/g;
        const trimLength = regexp.exec(parts[0])[1].length;
        let cleaned = parts.map((p) => p.slice(trimLength)).join('\n');
        if (cleaned.startsWith('{')) {
          cleaned = cleaned.slice(1, -1);
        }

        if (cleaned.startsWith('`')) {
          cleaned = cleaned.slice(1, -1);
        }

        return cleaned;
      });

      console.log(`Writing ${exampleFilePath}`);
      fs.writeFile(exampleFilePath, JSON.stringify(formattedMatches), () => {});
    } else {
      fs.writeFile(exampleFilePath, JSON.stringify([]), () => {});
    }
  });
};

try {
  generateDocExamples();
} catch (err) {
  console.error(err.toString());
}

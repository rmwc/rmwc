process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const processBuiltFiles = require('./process-built-files');
const path = require('path');
const fs = require('fs-extra');
const { exec, execSync } = require('child_process');

const fixPackageDotJSONPath = () => {
  fs.readFile('./index.js', 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(/\.\.\/package\.json/g, './package.json');

    fs.writeFile('./index.js', result, 'utf8', function(err) {
      if (err) return console.log(err);
    });
  });
};

// Babels and copies the file to its new directory
const writeBuiltFile = (inputFile, outputFile) => {
  const cmd = `NODE_ENV=production ./node_modules/.bin/babel ${inputFile} -o ${outputFile} --copy-files`;
  exec(cmd);
};

// Writes a flow version of the file
const writeFlowFile = (inputFile, outputFile) => {
  const copyFlowCmd = `cp ${inputFile} ${outputFile}.flow`;
  exec(copyFlowCmd);
};

// Writes a typescript version of the file
const writeTypescriptFile = (inputFile, outputFile) => {
  const out = outputFile.replace('.js', '.tsx');
  const copyTypescriptCmd = `cp ${inputFile} ${out}`;

  if (out.includes('.tsx')) {
    execSync(copyTypescriptCmd);
    fs.readFile(out, 'utf8', (err, content) => {
      const newContent = content
        .replace(/\/\/\s?@flow/g, '')
        .replace(/\<\*\>/g, '<any>')
        .replace(/:\s\*/g, ': any')
        .replace(/React.Node/g, 'React.ReactNode')
        .replace(/\smixed/g, ' any')
        .replace(/export type \{/g, 'export {')
        .replace(/import type \{/g, 'import {');

      fs.writeFile(out, newContent, 'utf8', err => {
        if (err) return console.log(err);
      });
    });
  }
};

processBuiltFiles(files => {
  files.forEach(f => {
    let out = f.replace('./src/', './');

    if (out === './index.js') {
      return;
    }

    if (out === './rmwc.js') {
      out = './index.js';
    }

    const dir = path.dirname(out);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    console.log('Babel:', f, '-> ', out);
    writeBuiltFile(f, out);
    writeFlowFile(f, out);
    writeTypescriptFile(f, out);
  });

  console.log('Writing version...');
  const listener = stats => {
    if (stats.size) {
      fixPackageDotJSONPath();
      fs.unwatchFile('./index.js', listener);
    }
  };
  fs.watchFile('./index.js', listener);
});

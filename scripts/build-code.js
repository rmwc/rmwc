process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const processBuiltFiles = require('./process-built-files');
const path = require('path');
const fs = require('fs-extra');
const { exec, execSync } = require('child_process');
const glob = require('glob');

const fixPackageDotJSONPath = filename => {
  const data = fs.readFileSync(filename, 'utf8');
  var result = data.replace(/\.\.\/package\.json/g, './package.json');
  fs.writeFileSync(filename, result, 'utf8');
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
    const content = fs.readFileSync(out, 'utf8');
    const newContent = content
      .replace(/\/\/\s?@flow/g, '')
      .replace(/<\*>/g, '<any>')
      .replace(/:\s\*/g, ': any')
      .replace(/React.Node/g, 'React.ReactNode')
      .replace(/React.Element/g, 'React.ReactElement')
      .replace(/\smixed/g, ' any')
      .replace(/export type \{/g, 'export {')
      .replace(/import type \{/g, 'import {');

    fs.writeFileSync(out, newContent, 'utf8');
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
      execSync(
        `NODE_ENV=production ./node_modules/.bin/babel ${f} -o ${out} --copy-files`
      );
      fixPackageDotJSONPath(out);
      writeFlowFile(f, out);
      writeTypescriptFile(f, out);
      fixPackageDotJSONPath(out.replace('.js', '.tsx'));
      return;
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

  console.log('Compiling Typescript...');
  const compileTypescriptCmd = `./node_modules/.bin/tsc`;
  execSync(compileTypescriptCmd, { stdio: [0, 1, 2] });

  glob('./**/*.tsx', {}, function(er, files) {
    console.log(files);
    files.forEach(fs.unlinkSync);
  });
});

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
      .replace(/SyntheticEvent/g, 'React.SyntheticEvent')
      .replace(/React.Element/g, 'React.ReactElement')
      .replace(/\smixed/g, ' any')
      .replace(/export type \{/g, 'export {')
      .replace(/import type \{/g, 'import {');

    fs.writeFileSync(out, newContent, 'utf8');
  }
};

// Simply copies the file
const copyFile = (inputFile, outputFile) => {
  exec(`cp -R ${inputFile} ${outputFile}`);
};

const copyBuiltDirsBackToSrc = files => {
  const dirs = [
    ...new Set(
      files.map(f =>
        path
          .dirname(f)
          .replace('./src/', '')
          .split(path.sep)
          .slice(0, 2)
          .join(path.sep)
      )
    )
  ].filter(d => d !== './src');

  dirs.forEach(dir => {
    console.log('Copy Dist Dir:', `./${dir}`, `./src/${dir}/dist`);
    copyFile(`./${dir}`, `./src/${dir}/dist`);
  });
};

processBuiltFiles(files => {
  files.forEach(f => {
    let out = f.replace('./src/', './');

    // avoid copying the root directory into itself
    if (out.split(path.sep).length === 2) {
      return;
    }

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

    if (path.extname(f) === '.js') {
      console.log('Babel:', f, '-> ', out);
      writeBuiltFile(f, out);
      writeFlowFile(f, out);
      writeTypescriptFile(f, out);
    } else {
      copyFile(f, out);
    }
  });

  console.log('Compiling Typescript...');
  const compileTypescriptCmd = `./node_modules/.bin/tsc`;
  execSync(compileTypescriptCmd, { stdio: [0, 1, 2] });

  glob('./**/*.tsx', {}, function(er, files) {
    console.log(files);
    files.forEach(fs.unlinkSync);

    processBuiltFiles(copyBuiltDirsBackToSrc);
  });
});

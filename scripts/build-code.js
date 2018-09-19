process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const getPackageDirs = require('./get-package-dirs');
const path = require('path');
const fs = require('fs-extra');
const { exec, execSync } = require('child_process');
const glob = require('glob');

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

const promises = getPackageDirs().map(d => {
  return new Promise((resolve, reject) => {
    glob(`./src/${d}/**/!(*.story.js|*.spec.js|setupTests.js)`, {}, function(
      er,
      files
    ) {
      console.log(`Building Package: ${d}`);

      files.forEach(f => {
        // skip the root dir
        if (f === `./src/${d}`) {
          return;
        }

        // skip the docs folder
        if (f.includes('rmwc/docs')) {
          return;
        }

        const out = f.replace(`./src/${d}`, `./src/${d}/dist`);

        // make our out dir
        const dir = path.dirname(out);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }

        // handle files
        if (path.extname(f) === '.js') {
          console.log('Babel:', f, '-> ', out);
          writeBuiltFile(f, out);
          writeFlowFile(f, out);
          writeTypescriptFile(f, out);
        } else {
          copyFile(f, out);
        }
      });
      resolve();
    });
  });
});

// Compile the TS
Promise.all(promises).then(() => {
  console.log('Compiling Typescript...');
  const compileTypescriptCmd = `./node_modules/.bin/tsc`;
  execSync(compileTypescriptCmd, { stdio: [0, 1, 2] });

  glob('./**/dist/**/*.tsx', {}, function(er, files) {
    files.forEach(fs.unlinkSync);
  });
});

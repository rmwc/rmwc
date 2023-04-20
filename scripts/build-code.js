process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const getPackageDirs = require('./get-package-dirs');
const path = require('path');
const { exec, execSync } = require('child_process');

// Simply copies the file
const copyFile = (inputFile, outputFile) => {
  exec(`cp -R ${inputFile} ${outputFile}`);
};

const root = path.resolve(__dirname, '../');

execSync(
  `./node_modules/.bin/tsc --project ${root}/tsconfig-build.json --target es5 --module CommonJS`,
  {
    stdio: [0, 1, 2]
  }
);

execSync(
  `./node_modules/.bin/tsc --project ${root}/tsconfig-build.json --target es5 --module esnext --outDir ${root}/build/next`,
  {
    stdio: [0, 1, 2]
  }
);

const promises = getPackageDirs().map((d) => {
  return new Promise((resolve, reject) => {
    copyFile(
      path.resolve(root, 'build', 'dist', d),
      path.resolve(root, 'src', d, 'dist')
    );

    copyFile(
      path.resolve(root, 'build', 'next', d),
      path.resolve(root, 'src', d, 'next')
    );

    // Copy the styles file to the root.
    copyFile(
      path.resolve(root, 'build', 'dist', d, 'styles.js'),
      path.resolve(root, 'src', d, 'styles.js')
    );

    copyFile(
      path.resolve(root, 'build', 'dist', d, 'styles.d.ts'),
      path.resolve(root, 'src', d, 'styles.d.ts')
    );

    resolve();
  });
});

// Compile the TS
Promise.all(promises).then(() => {
  console.log('Done');
});

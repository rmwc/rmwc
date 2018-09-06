const getPackageDirs = require('./get-package-dirs');
const { exec } = require('child_process');

getPackageDirs().forEach(d => {
  console.log(`Building Docs For: ${d}`);
  const proc = exec(
    `export NODE_ENV=development && react-docgen ./src/${d}/index.js --pretty --resolver ./scripts/docgen-resolver.js -o ./src/${d}/docgen.json`
  );

  proc.stdout.on('data', data => {
    console.log('stdout: ' + data.toString());
  });

  proc.stderr.on('data', data => {
    console.log('stderr: ' + data.toString());
  });

  proc.on('exit', code => {});
});

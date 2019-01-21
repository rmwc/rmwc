const getPackageDirs = require('./get-package-dirs');
const { exec } = require('child_process');

getPackageDirs()
  .filter(name => !['base', 'rmwc', '@types'].includes(name))
  .forEach(d => {
    console.log(`Building Docs For: ${d}`);
    const proc = exec(
      `export NODE_ENV=development && typedoc ./src/${d}/index.tsx --excludeExternals --excludePrivate --ignoreCompilerErrors --json ./src/${d}/docgen.json`
    );

    proc.stdout.on('data', data => {
      console.log('stdout: ' + data.toString());
    });

    proc.stderr.on('data', data => {
      console.log('stderr: ' + data.toString());
    });

    proc.on('exit', code => {});
  });

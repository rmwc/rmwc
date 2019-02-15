const { exec, execSync } = require('child_process');

const getChangedPackages = () => {
  const changed = execSync('node_modules/.bin/lerna changed')
    .toString()
    .split('\n')
    .map(v => v.replace('@rmwc/', ''))
    .filter(Boolean);
  return changed;
};

getChangedPackages()
  .filter(name => !['base', 'rmwc', '@types'].includes(name))
  .forEach(d => {
    console.log(`Building Docs For: ${d}`);
    const proc = exec(
      `export NODE_ENV=development && typedoc ./src/${d} --exclude **/*.spec.tsx --excludeExternals --excludePrivate --ignoreCompilerErrors --json ./src/${d}/docgen.json`
    );

    proc.stdout.on('data', data => {
      console.log('stdout: ' + data.toString());
    });

    proc.stderr.on('data', data => {
      console.log('stderr: ' + data.toString());
    });

    proc.on('exit', code => {});
  });

const { exec } = require('child_process');
const getChangedPackages = require('./get-changed-packages');
const getAllPackages = require('./get-all-packages');

const getPackages =
  //getAllPackages
  getChangedPackages;

try {
  getPackages()
    .filter(name => !['base', 'rmwc', '@types'].includes(name))
    .forEach(d => {
      console.log(`Building Docs For: ${d}`);
      const proc = exec(
        `documentalist "./src/${d}/!(node_modules)/!(spec|story).tsx" --no-css --no-md > ./src/${d}/generated-props.json`
      );

      proc.stdout.on('data', data => {
        console.log(data.toString());
      });

      proc.stderr.on('data', data => {
        console.log('Error: ' + data.toString());
      });

      proc.on('exit', code => {});
    });
} catch (err) {
  console.error(err.toString());
}

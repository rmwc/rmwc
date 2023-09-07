const { exec } = require('child_process');
const getPackages = require('./get-packages');

try {
  getPackages(['readme']).forEach((d) => {
    console.log(`Building Docs For: ${d}`);
    const proc = exec(
      `documentalist "./packages/${d}/**/!(spec|story).tsx" --no-css --no-md > ./packages/readme/src/generated-props/${d}.json`
    );

    proc.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    proc.stderr.on('data', (data) => {
      console.log('Error: ' + data.toString());
    });

    proc.on('exit', (code) => {});
  });
} catch (err) {
  console.error(err.toString());
}

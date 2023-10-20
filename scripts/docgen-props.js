const { exec } = require('child_process');
const getPackages = require('./get-packages');
const path = require('path');
const fs = require('fs');

try {
  getPackages(['readme']).forEach((d) => {
    console.log(`Building Docs For: ${d}`);
    fs.mkdirSync(path.resolve('utils', 'readme', 'src', 'generated-props'), {
      recursive: true
    });
    const proc = exec(
      `documentalist "./packages/${d}/**/!(spec|story).tsx" --no-css --no-md > ./utils/readme/src/generated-props/${d}.json`
    );

    proc.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    proc.stderr.on('data', (data) => {
      console.log('Error: Command "' + proc.spawnargs + '" failed with:  ' + data.toString());
    });

    proc.on('exit', (code) => {});
  });
} catch (err) {
  console.error(err.toString());
}

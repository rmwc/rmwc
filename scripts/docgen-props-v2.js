const { exec } = require('child_process');
const getChangedPackages = require('./get-changed-packages');
const getAllPackages = require('./get-all-packages');

const getPackages =
  //getAllPackages;
  getChangedPackages;

// -i ["./src/${d}/**/styles.tsx", "./src/${d}/**/*.story.tsx", "./src/${d}/**/*.spec.tsx"]

try {
  getPackages()
    .filter((name) => !['rmwc', '@types'].includes(name))
    .forEach((d) => {
      console.log(`Building Docs For: ${d}`);
      const proc = exec(
        `react-docgen -o ./src/${d}/generated-props-v2.json ./src/${d}/**/*.tsx --pretty --resolver "find-all-exported-components,find-all-annotated-components" -i src/${d}/**/styles.tsx,src/${d}/**/*.story.tsx,src/${d}/**/*.spec.tsx,src/${d}/**/foundation.tsx,src/${d}/**/readme.tsx`
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

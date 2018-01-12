process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const processBuiltFiles = require('./process-built-files');
const path = require('path');
const fs = require('fs-extra');
const { exec } = require('child_process');

const fixPackageDotJSONPath = () => {
  fs.readFile('./index.js', 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(/\.\.\/package\.json/g, './package.json');

    fs.writeFile('./index.js', result, 'utf8', function(err) {
      if (err) return console.log(err);
    });
  });
};

processBuiltFiles(files => {
  files.forEach(f => {
    let out = f.replace('./src/', './');

    if (out === './index.js') {
      return;
    }

    if (out === './rmwc.js') {
      out = './index.js';
    }

    const dir = path.dirname(out);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const cmd = `NODE_ENV=production ./node_modules/.bin/babel ${f} -o ${out} --copy-files`;
    console.log('Babel:', f, '-> ', out);
    exec(cmd);
  });

  console.log('Writing version...');
  const listener = stats => {
    if (stats.size) {
      fixPackageDotJSONPath();
      fs.unwatchFile('./index.js', listener);
    }
  };
  fs.watchFile('./index.js', listener);
});

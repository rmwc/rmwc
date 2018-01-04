process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const processBuiltFiles = require('./process-built-files');
const path = require('path');
const fs = require('fs-extra');
const { exec } = require('child_process');

processBuiltFiles(files => {
  files.forEach(f => {
    let out = f.replace('./src/', './');

    if (out === './rmwc.js') {
      out = path.resolve('./index.js');
    } else {
      return;
    }

    const dir = path.dirname(out);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const cmd = `NODE_ENV=production ./node_modules/.bin/babel ${f} -o ${out}`;
    console.log('Babel:', f, '-> ', out, cmd);
    exec(cmd);
  });
});

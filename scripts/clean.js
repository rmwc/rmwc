process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const glob = require('glob');
const processBuiltFiles = require('./process-built-files');
const fs = require('fs-extra');

glob('./src/**/dist/', {}, function(er, files) {
  files.forEach(f => fs.removeSync(f));
});

processBuiltFiles(files => {
  files.forEach(f => {
    let out = f.replace('./src/', './');

    if (out === './rmwc.js') {
      out = './index.js';
    }

    fs.removeSync(out);
    fs.removeSync(out + '.flow');
    fs.removeSync(out.replace('.js', '.tsx'));
    fs.removeSync(out.replace('.js', '.d.ts'));
  });
});

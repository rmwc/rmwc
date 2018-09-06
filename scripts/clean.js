process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const glob = require('glob');
const fs = require('fs-extra');

glob('./src/**/dist/', {}, function(er, files) {
  files.forEach(f => fs.removeSync(f));
});

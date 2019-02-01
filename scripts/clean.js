process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const glob = require('glob');
const fs = require('fs-extra');
const { execSync } = require('child_process');

execSync('rm -R -f ./build');

glob('./src/**/dist/', {}, function(er, files) {
  files.forEach(f => fs.removeSync(f));
});

glob('./src/**/next/', {}, function(er, files) {
  files.forEach(f => fs.removeSync(f));
});

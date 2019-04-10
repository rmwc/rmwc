process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const glob = require('glob');
const { execSync } = require('child_process');

execSync('rm -R -f ./build');

const removeFileOrDir = f => execSync(`rm -R -f ${f}`);

glob('./src/*/dist/', { ignore: 'node_modules' }, function(er, files) {
  files.forEach(removeFileOrDir);
});

glob('./src/*/next/', { ignore: 'node_modules' }, function(er, files) {
  files.forEach(removeFileOrDir);
});

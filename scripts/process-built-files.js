const glob = require('glob');

module.exports = callback => {
  glob('./src/**/!(*.story.js|*.spec.js)', {}, function(er, files) {
    // remove the docs folder
    files = files.filter(f => !f.startsWith('./src/docs'));

    console.log(files);
    callback(files);
  });
};

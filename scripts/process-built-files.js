const glob = require('glob');

module.exports = callback => {
  glob('./src/**/!(*.story.js|*.spec.js|*.md|setupTests.js)', {}, function(
    er,
    files
  ) {
    // remove the docs folder
    files = files.filter(f => !f.startsWith('./src/docs'));

    console.log(files);
    callback(files);
  });
};

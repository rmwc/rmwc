process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const glob = require('glob');
const path = require('path');
const fs = require('fs-extra');

const processAlFiles = files => {
	files.forEach(f => {
		const out = f.replace('./src/', './');
		fs.removeSync(out);
	});
};

glob('./src/**/!(*.story.js|*.spec.js)', {}, function(er, files) {
	files = files.concat('./src/index.js');
	console.log(files);
	processAlFiles(files);
});

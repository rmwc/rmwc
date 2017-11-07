process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const glob = require('glob');
const path = require('path');
const fs = require('fs-extra');
const { exec } = require('child_process');

glob('./src/**/!(*.story.js|*.spec.js)', {}, function(er, files) {
	files.forEach(f => {
		const out = f.replace('./src/', './');
		const dir = path.dirname(out);

		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}

		const cmd = `NODE_ENV=production ./node_modules/.bin/babel ${f} -o ${out}`;
		exec(cmd);
	});
});

fs.copySync('./src/index.js', './index.js');

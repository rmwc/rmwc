const rimraf = require('rimraf')

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

rimraf.sync('./build')

rimraf.sync('./src/*/dist/', { glob: { ignore: 'node_modules' }})

rimraf.sync('./src/*/styles.js', { glob: { ignore: 'node_modules' }})

rimraf.sync('./src/*/styles.d.ts', { glob: { ignore: 'node_modules' }})

rimraf.sync('./src/*/next/', { glob: { ignore: 'node_modules' }})

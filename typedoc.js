module.exports = {
  readme: 'none',
  includes: './',
  exclude: [
    '**/*.spec.tsx',
    '**/*.story.tsx',
    '**/docs.tsx',
    'node_modules'
  ],
  mode: 'modules',
  ignoreCompilerErrors: true,
  excludeExternals: true,
  excludeNotExported: true,
  excludePrivate: true,
  excludeProtected: true
};
module.exports = {
  readme: 'none',
  includes: './',
  gitrevision: 'master',
  exclude: ['**/*.spec.tsx', '**/*.story.tsx', '**/docs.tsx', 'node_modules'],
  mode: 'modules',
  ignoreCompilerErrors: false,
  excludeExternals: true,
  excludeNotExported: true,
  excludePrivate: true,
  excludeProtected: true
};

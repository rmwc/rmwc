process.env.REACT_EDITOR = 'vscode';

const path = require('path');
const colors = require('colors/safe');

/***********************************
 * Utils
 ***********************************/
const root = path.resolve(__dirname, '..');

// a simple utility to chain all of our config overrides together
const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);

const getPlugin = (config, pluginName) =>
  config.plugins.find((p) => p.constructor.name === pluginName);

/***********************************
 * CRA Rewiring
 ***********************************/

/**
 * This adds aliases for the build ../../common -> common/
 */
const addAliases = (config) => {
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    rmwc: path.resolve(root, 'src'),
    '@rmwc': path.resolve(root, 'src'),
    '@doc-utils': path.resolve(root, 'src', 'doc-utils')
  };

  return config;
};

/**
 * Set webpack to ignore fullyspecified see https://github.com/webpack/webpack/issues/11467#issuecomment-691873586
 */
const ignoreFullySpecified = (config) => {
  const cjs = config.module.rules.find((rule) => rule.enforce);
  cjs.resolve = {
    fullySpecified: false
  };
  return config;
};

/**
 * Ignores all the missing sourceMaps warnings.
 * @Material dependencies are missing them at present. Remove this when @Material adds the sourcemap.
 */
const ignoreMissingSourceMaps = (config) => {
  config.ignoreWarnings = [/Failed to parse source map/];
  return config;
};

/***********************************
 * Jest Rewiring
 ***********************************/
/**
 * Add jest aliasing
 */
const jestModuleNameMapper = (config) => {
  config.moduleNameMapper = {
    ...config.moduleNameMapper,
    '@rmwc/(.*)$': '<rootDir>/src/$1'
  };
  return config;
};

/**
 * Add jest transforms
 */
const jestResolver = (config) => {
  config.resolver = './scripts/jest-resolver.js';
  return config;
};

const jestIgnore = (config) => {
  config.transformIgnorePatterns = ['<rootDir>/node_modules/'];
  return config;
};

const jestCoverage = (config) => {
  config.collectCoverageFrom = config.collectCoverageFrom.concat([
    '!src/base/utils/document-component.tsx',
    '!src/base/test-polyfill.js',
    '!src/index.tsx',
    '!src/setupTests.tsx',
    '!src/rmwc/**/*',
    '!src/**/*.story.*',
    '!src/**/*.spec.*',
    '!src/**/readme*',
    '!src/doc-utils*'
  ]);
  return config;
};

// Define the RMWC_VERSION for the project
const defineVersion = (config) => {
  const definePlugin = getPlugin(config, 'DefinePlugin');
  const version = require('../lerna.json').version;
  definePlugin.definitions['process.env'].RMWC_VERSION = `"${version}"`;
  return config;
};

// Build the webpack config
module.exports = {
  webpack: (config) => {
    console.log(colors.magenta('Starting RMWC ❤️'));
    return pipe(
      addAliases,
      ignoreFullySpecified,
      ignoreMissingSourceMaps,
      defineVersion
    )(config);
  },
  storybook: (config) => pipe(addAliases)(config),
  jest: (config) => {
    return pipe(
      jestModuleNameMapper,
      jestResolver,
      jestCoverage,
      jestIgnore
    )(config);
  }
};

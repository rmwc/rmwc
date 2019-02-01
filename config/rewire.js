// @noflow
process.env.REACT_EDITOR = 'vscode';

const path = require('path');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const colors = require('colors/safe');
const fs = require('fs');

/***********************************
 * Utils
 ***********************************/
const publicPath = process.env.PUBLIC_PATH || '/';
const root = path.resolve(__dirname, '..');

// a simple utility to chain all of our config overrides together
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const getLoaderRoot = config => {
  const oneOf = config.module.rules.find(rule => rule.oneOf);
  if (oneOf) {
    return oneOf.oneOf;
  } else {
    return config.module.rules;
  }
};

const addLoader = (config, rule) => {
  getLoaderRoot(config).unshift(rule);
  return config;
};

const addPlugin = (config, ...plugins) => {
  plugins.forEach(p => {
    config.plugins.push(p);
  });
};

const getPlugin = (config, pluginName) =>
  config.plugins.find(p => p.constructor.name === pluginName);

/***********************************
 * CRA Rewiring
 ***********************************/

/**
 * This adds aliases for the build ../../common -> common/
 */
const addAliases = config => {
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    rmwc: path.resolve(root, 'src'),
    '@rmwc': path.resolve(root, 'src')
  };

  return config;
};

const addMarkdownLoader = config =>
  addLoader(config, {
    test: /\.md$/,
    include: path.resolve('./src'),
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          // @remove-on-eject-begin
          babelrc: false,
          presets: [require.resolve('babel-preset-react-app')],
          // @remove-on-eject-end
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true
        }
      },
      require.resolve('react-markdown-loader')
    ]
  });

const enableHotReload = config => {
  config = rewireReactHotLoader(config, process.env.NODE_ENV);
  return config;
};

/**
 * Self explanatory...
 */
const speedUpTypescript = config => {
  const plugin = getPlugin(config, 'ForkTsCheckerWebpackPlugin');
  plugin.async = process.env.NODE_ENV !== 'production';
  plugin.silent = !plugin.async;
  return config;
};

/***********************************
 * Jest Rewiring
 ***********************************/
/**
 * Add jest aliasing
 */
const jestModuleNameMapper = config => {
  config.moduleNameMapper = {
    ...config.moduleNameMapper,
    '@rmwc/(.*)$': '<rootDir>/src/$1'
  };
  return config;
};

/**
 * Add jest transforms
 */
const jestResolver = config => {
  config.resolver = './scripts/jest-resolver.js';
  return config;
};

const jestIgnore = config => {
  config.collectCoverageFrom = config.collectCoverageFrom.concat([
    '!src/base/utils/document-component.tsx',
    '!src/base/utils/story-with-state.js',
    '!src/base/test-polyfill.js',
    '!src/index.tsx',
    '!src/setupTests.tsx',
    '!src/rmwc/**/*',
    '!src/**/*.story.*',
    '!src/**/*.spec.*'
  ]);
  return config;
};

// Build the webpack config
module.exports = {
  webpack: (config, env) => {
    console.log(colors.magenta('Starting RMWC ❤️'));
    return pipe(
      //      enableHotReload,
      addAliases,
      addMarkdownLoader,
      speedUpTypescript
    )(config);
  },
  storybook: (config, env) => pipe(addAliases)(config),
  jest: config => {
    return pipe(
      jestModuleNameMapper,
      jestResolver,
      jestIgnore
    )(config);
  }
};

// Do this as the first thing so that any code reading it knows the right env.
const {
  webpack: rewireCRA,
  storybook: rewireStorybook
} = require('../config/rewire');
const craConfigBase = require('react-scripts/config/webpack.config');

module.exports = ({ config: storybookBaseConfig, _mode }) => {
  storybookBaseConfig = rewireStorybook(storybookBaseConfig);
  craConfig = rewireCRA(craConfigBase('development'));

  // In the code below, we are going to get a couple
  // of loaders from CRA that we need for storybook.
  // This is to ensure storybook and our actual build
  // are as close as possible

  // a utility function to get a loader from CRA
  const getCRALoader = (loaderName) =>
    craConfig.module.rules
      .find((rule) => rule.oneOf)
      .oneOf.find((r) => {
        return r.type && r.type === loaderName;
      });

  // the url loader allows loading of media
  const urlLoader = getCRALoader('asset');
  storybookBaseConfig.module.rules.push(urlLoader);

  // Use the file loader for svgs
  const fileLoader = getCRALoader('asset/resource');
  storybookBaseConfig.module.rules.push(fileLoader);

  return storybookBaseConfig;
};

import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: [
    '!**/node_modules',
    '!../src/**/node_modules',
    '../src/**/*.story.mdx',
    '../src/**/*.story.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app'
  ],
  framework: '@storybook/react-webpack5'
};
export default config;

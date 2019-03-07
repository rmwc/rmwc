import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import '../src/rmwc/styles';

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context('../', true, /\.story\.(js|tsx)?$/));
}

const StylesDecorator = storyFn => (
  <div className="mdc-typography" style={{ padding: '24px', height: '100%' }}>
    {storyFn()}
  </div>
);

addDecorator(withKnobs);
addDecorator(StylesDecorator);

configure(loadStories, module);

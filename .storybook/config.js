import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import '../src/rmwc/node_modules/material-components-web/dist/material-components-web.css';
import { withKnobs } from '@storybook/addon-knobs';

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context('../', true, /\.story\.js?$/));
}

const StylesDecorator = storyFn => (
  <div className="mdc-typography" style={{ padding: '24px', height: '100%' }}>
    {storyFn()}
  </div>
);

addDecorator(withKnobs);
addDecorator(StylesDecorator);

configure(loadStories, module);

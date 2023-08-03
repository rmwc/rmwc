import React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { Fab } from './';

export default {
  title: 'Buttons'
};

export const _Fab = () => (
  <Fab
    mini={boolean('mini', false)}
    ripple={boolean('ripple', true)}
    onClick={action('onClick')}
  >
    favorite
  </Fab>
);

export const CssOnlyFab = () => (
  <Fab mini={boolean('mini', false)} onClick={action('onClick')}>
    favorite
  </Fab>
);

CssOnlyFab.story = {
  name: 'cssOnly Fab'
};

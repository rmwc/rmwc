import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { Fab } from './';

storiesOf('Buttons', module)
  .add('Fab', () => (
    <Fab
      mini={boolean('mini', false)}
      ripple={boolean('ripple', true)}
      onClick={action('onClick')}
    >
      favorite
    </Fab>
  ))
  .add('cssOnly Fab', () => (
    <Fab mini={boolean('mini', false)} onClick={action('onClick')}>
      favorite
    </Fab>
  ));

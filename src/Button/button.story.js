import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { Button } from './';

storiesOf('Buttons', module).add('Button', () => (
  <Button
    unelevated={boolean('unelevated', false)}
    stroked={boolean('stroked', false)}
    dense={boolean('dense', false)}
    raised={boolean('raised', false)}
    compact={boolean('compact', false)}
    ripple={boolean('ripple', true)}
    onClick={action('onClick')}
  >
    Button
  </Button>
));

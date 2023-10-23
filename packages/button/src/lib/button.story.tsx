import React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Button } from './button';

storiesOf('Buttons', module).add('Button', () => (
  <Button
    unelevated={boolean('unelevated', false)}
    outlined={boolean('outlined', false)}
    dense={boolean('dense', false)}
    raised={boolean('raised', false)}
    ripple={boolean('ripple', true)}
    onClick={action('onClick')}
    className="test"
  >
    Button
  </Button>
));

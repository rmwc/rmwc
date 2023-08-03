import React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { Button } from './';

export default {
  title: 'Buttons'
};

export const _Button = () => (
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
);

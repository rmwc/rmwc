import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { Ripple } from './';

const rippleStyle = {
  width: '240px',
  height: '240px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

storiesOf('Ripples', module).add('Ripple', () => (
  <Ripple
    style={rippleStyle}
    primary={boolean('primary', false)}
    accent={boolean('accent', false)}
    unbounded={boolean('unbounded', false)}
    foundationRef={console.log}
  >
    <div style={rippleStyle}>Click Me</div>
  </Ripple>
));

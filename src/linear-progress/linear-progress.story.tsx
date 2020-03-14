import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, number } from '@storybook/addon-knobs';
import { LinearProgress } from './';

storiesOf('Progress', module).add('LinearProgress', () => (
  <LinearProgress
    progress={number('progress', 0.5)}
    buffer={number('buffer', 0)}
    reversed={boolean('reversed', false)}
    closed={boolean('closed', false)}
    foundationRef={console.log}
  />
));

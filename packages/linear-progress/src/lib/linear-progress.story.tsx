import React from 'react';

import { boolean, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { LinearProgress } from './linear-progress';

storiesOf('Progress', module).add('LinearProgress', () => (
  <LinearProgress
    progress={number('progress', 0.5)}
    buffer={number('buffer', 0)}
    reversed={boolean('reversed', false)}
    closed={boolean('closed', false)}
    foundationRef={console.log}
  />
));

import React from 'react';

import { boolean, number } from '@storybook/addon-knobs';
import { LinearProgress } from './';

export default {
  title: 'Progress'
};

export const _LinearProgress = () => (
  <LinearProgress
    progress={number('progress', 0.5)}
    buffer={number('buffer', 0)}
    reversed={boolean('reversed', false)}
    closed={boolean('closed', false)}
    foundationRef={console.log}
  />
);

_LinearProgress.story = {
  name: 'LinearProgress'
};

import React from 'react';

import { storiesOf } from '@storybook/react';

import { IconButton } from './';

storiesOf('IconButtons', module).add('IconButton', () => (
  <IconButton
    icon="star"
    onIcon="favorite_border"
    label="Rate this!"
    foundationRef={console.log}
  />
));

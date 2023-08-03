import React from 'react';

import { IconButton } from './';

export default {
  title: 'IconButtons'
};

export const _IconButton = () => (
  <IconButton
    icon="star"
    onIcon="favorite_border"
    label="Rate this!"
    foundationRef={console.log}
  />
);

_IconButton.story = {
  name: 'IconButton'
};

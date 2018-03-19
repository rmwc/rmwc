import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { object } from '@storybook/addon-knobs';
import { IconToggle } from './';

storiesOf('Buttons', module).add('IconToggle', () => (
  <IconToggle
    onChange={action('onChange')}
    on={object('on', { label: 'Remove from favorites', content: 'favorite' })}
    off={object('off', {
      label: 'Add to favorites',
      content: 'favorite_border'
    })}
  />
));

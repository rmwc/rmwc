import React from 'react';

import { storiesOf } from '@storybook/react';
import { Chip, ChipSet } from './';

storiesOf('Chips', module).add('Chip', () => (
  <ChipSet>
    <Chip>Cookies</Chip>
    <Chip>Pizza</Chip>
    <Chip>Icecream</Chip>
  </ChipSet>
));

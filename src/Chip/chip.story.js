import React from 'react';

import { storiesOf } from '@storybook/react';
import { Chip, ChipText, ChipIcon, ChipSet } from './';

storiesOf('Chips', module)
  .add('Chip', () => (
    <ChipSet>
      <Chip>
        <ChipText>Cookies</ChipText>
      </Chip>
      <Chip>
        <ChipText>Pizza</ChipText>
      </Chip>
      <Chip>
        <ChipText>Icecream</ChipText>
      </Chip>
    </ChipSet>
  ))
  .add('Chip with icons', () => (
    <ChipSet>
      <Chip>
        <ChipIcon use="star_border" leading />
        <ChipText>Cookies</ChipText>
        <ChipIcon use="close" trailing />
      </Chip>
      <Chip>
        <ChipIcon use="favorite_border" leading />
        <ChipText>Pizza</ChipText>
        <ChipIcon use="close" trailing />
      </Chip>
      <Chip>
        <ChipIcon use="mood" leading />
        <ChipText>Icecream</ChipText>
        <ChipIcon use="close" trailing />
      </Chip>
    </ChipSet>
  ));

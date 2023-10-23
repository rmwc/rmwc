import React from 'react';

import { storiesOf } from '@storybook/react';
import { Segment } from './segment';
import { SegmentedButton } from './segmented-button';

storiesOf('Segmented-Button', module).add('Segmented-Button', () => (
  <SegmentedButton>
    <Segment label="Cookies" />
  </SegmentedButton>
));

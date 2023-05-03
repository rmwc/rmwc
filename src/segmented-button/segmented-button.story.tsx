import React from 'react';

import { storiesOf } from '@storybook/react';
import { Segment, SegmentedButton } from './';

storiesOf('Segmented-Button', module).add('Segmented-Button', () => (
  <SegmentedButton>
    <Segment label="Cookies" />
  </SegmentedButton>
));

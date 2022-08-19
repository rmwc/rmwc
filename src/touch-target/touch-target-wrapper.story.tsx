import React from 'react';

import { storiesOf } from '@storybook/react';
import { TouchTargetWrapper } from '.';
import { Button } from '../button';

storiesOf('Buttons', module).add('Button', () => (
  <TouchTargetWrapper>
    <Button>Touchable</Button>
  </TouchTargetWrapper>
));

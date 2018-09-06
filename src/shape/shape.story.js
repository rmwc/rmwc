import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Button } from '@rmwc/button';
import { ShapeContainer } from './';

storiesOf('Shape', module).add('default', () => (
  <React.Fragment>
    <ShapeContainer topRightCorner="10" bottomLeftCorner="10">
      <Button unelevated>Button</Button>
    </ShapeContainer>

    <ShapeContainer
      topRightCorner="10"
      bottomLeftCorner="10"
      outlineWidth="2"
      outlineColor="var(--mdc-theme-primary)"
    >
      <Button outlined>Button</Button>
    </ShapeContainer>
  </React.Fragment>
));

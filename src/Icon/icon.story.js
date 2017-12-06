import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { Icon } from './';

storiesOf('Icons', module).add('Icon', () => (
  <div>
    <Icon>favorite</Icon>
    <Icon use="favorite" />

    <Icon use="https://www2.le.ac.uk/departments/law/images/twitter-follow-us-icon" />
    <Icon>
      https://www2.le.ac.uk/departments/law/images/twitter-follow-us-icon
    </Icon>

    <Icon
      use={<div style={{ background: 'red', width: '24px', height: '24px' }} />}
    />
    <Icon>
      <div style={{ background: 'purple', width: '24px', height: '24px' }} />
    </Icon>

    <Icon>
      <Icon
        use={
          <div style={{ background: 'blue', width: '24px', height: '24px' }} />
        }
      />
    </Icon>

    <Icon prefix="ion-" use="ionic" strategy="className" basename="icon" />
  </div>
));

import React from 'react';

import { storiesOf } from '@storybook/react';
import { Avatar } from '../avatar';
import { RCTooltip } from './rc-tooltip';

storiesOf('RCTooltips', module)
  .add('RCTooltip', () => (
    <RCTooltip content="Test Tooltip">
      <a href="#" style={{ margin: '4rem', display: 'inline-block' }}>
        hover
      </a>
    </RCTooltip>
  ))
  .add('RCTooltip with rich content', () => (
    <RCTooltip
      content={
        <div>
          <Avatar size="xsmall" name="James Friedman" /> James Friedman
        </div>
      }
    >
      <a href="#" style={{ margin: '4rem', display: 'inline-block' }}>
        Rich Content
      </a>
    </RCTooltip>
  ));

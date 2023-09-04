import React from 'react';

import { storiesOf } from '@storybook/react';
import { Tooltip } from './';
import { Avatar } from '../avatar';

storiesOf('Tooltips', module)
  .add('Tooltip', () => (
    <Tooltip overlay="Test Tooltip">
      <a href="#" style={{ margin: '4rem', display: 'inline-block' }}>
        hover
      </a>
    </Tooltip>
  ))
  .add('Tooltip with rich content', () => (
    <Tooltip
      overlay={
        <div>
          <Avatar size="xsmall" name="James Friedman" /> James Friedman
        </div>
      }
    >
      <a href="#" style={{ margin: '4rem', display: 'inline-block' }}>
        Rich Content
      </a>
    </Tooltip>
  ));

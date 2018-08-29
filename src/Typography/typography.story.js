import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { Typography } from './';

storiesOf('Typography', module).add('Typography', () => (
  <div>
    <Typography tag="div" style={{ margin: '16px 0' }} use="display4">
      display4
    </Typography>
    <Typography tag="div" style={{ margin: '16px 0' }} use="display3">
      display3
    </Typography>
    <Typography tag="div" style={{ margin: '16px 0' }} use="display2">
      display2
    </Typography>
    <Typography tag="div" style={{ margin: '16px 0' }} use="display1">
      display1
    </Typography>
    <Typography tag="div" style={{ margin: '16px 0' }} use="headline">
      headline
    </Typography>
    <Typography tag="div" style={{ margin: '16px 0' }} use="title">
      title
    </Typography>
    <Typography tag="div" style={{ margin: '16px 0' }} use="subheading2">
      subheading2
    </Typography>
    <Typography tag="div" style={{ margin: '16px 0' }} use="subheading1">
      subheading1
    </Typography>
    <Typography tag="div" style={{ margin: '16px 0' }} use="body2">
      body2
    </Typography>
    <Typography tag="div" style={{ margin: '16px 0' }} use="body1">
      body1
    </Typography>
    <Typography tag="div" style={{ margin: '16px 0' }} use="caption">
      caption
    </Typography>
    <Typography tag="div" style={{ margin: '16px 0' }} use="button">
      button
    </Typography>
  </div>
));

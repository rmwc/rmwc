import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Typography } from './';

storiesOf('Typography', module).add('Typography', () => (
  <div>
    <Typography tag="div" style={{ margin: '16px 0' }} use="headline1">
      display4
    </Typography>
    <Typography tag="div" style={{ margin: '16px 0' }} use="headline2">
      display3
    </Typography>
    <Typography tag="div" style={{ margin: '16px 0' }} use="headline3">
      display2
    </Typography>
    <Typography tag="div" style={{ margin: '16px 0' }} use="headline4">
      display1
    </Typography>
    <Typography tag="div" style={{ margin: '16px 0' }} use="headline5">
      headline
    </Typography>
    <Typography tag="div" style={{ margin: '16px 0' }} use="headline6">
      title
    </Typography>
    <Typography tag="div" style={{ margin: '16px 0' }} use="subtitle1">
      subheading2
    </Typography>
    <Typography tag="div" style={{ margin: '16px 0' }} use="subtitle2">
      subheading1
    </Typography>
    <Typography tag="div" style={{ margin: '16px 0' }} use="body1">
      body2
    </Typography>
    <Typography tag="div" style={{ margin: '16px 0' }} use="body2">
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

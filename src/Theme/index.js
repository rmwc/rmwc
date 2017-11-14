// @flow
import * as React from 'react';
import themeOptions from './theme-options';

import { simpleTag } from '../Base';

export const ThemeRoot = simpleTag({
  displayName: 'Theme',
  tag: 'span'
});

export const Theme = ({ use, ...rest }) => <ThemeRoot theme={use} {...rest} />;

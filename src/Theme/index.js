// @flow
import * as React from 'react';

import { simpleTag } from '../Base';

const ThemeRoot = simpleTag({
  tag: 'span'
});

export type ThemePropsT = {
  /** A theme option as a string, a space separated string for multiple values, or an array of valid theme options. */
  use: string | string[]
};

/**
 * A Theme Component.
 */
export const Theme: React.ComponentType<ThemePropsT> = ({
  use,
  ...rest
}: ThemePropsT) => <ThemeRoot theme={use} {...rest} />;

Theme.displayName = 'Theme';

// @flow
import * as React from 'react';

import { simpleTag } from '../Base';
import { toDashCase } from '../Base/utils/to-dash-case';

// prettier-ignore
type ThemeOptionT = 'primary' | 'secondary' | 'background' | 'surface' | 'onPrimary' | 'onSecondary' | 'onSurface' | 'textPrimaryOnBackground' | 'textSecondaryOnBackground' | 'textHintOnBackground' | 'textDisabledOnBackground' | 'textIconOnBackground' | 'textPrimaryOnLight' | 'textSecondaryOnLight' | 'textHintOnLight' | 'textDisabledOnLight' | 'textIconOnLight' | 'textPrimaryOnDark' | 'textSecondaryOnDark' | 'textHintOnDark' | 'textDisabledOnDark' | 'textIconOnDark'

const ThemeRoot = simpleTag({
  tag: 'span'
});

export type ThemePropsT = {
  /** A theme option as a string, a space separated string for multiple values, or an array of valid theme options. */
  use: string | ThemeOptionT[],
  /** Collapse the styles directly onto the child component. This eliminates the need for a wrapping `span` element and may be required for applying things like background-colors.  */
  wrap?: boolean
};

/**
 * A Theme Component.
 */
export const Theme: React.ComponentType<ThemePropsT> = ({
  use,
  ...rest
}: ThemePropsT) => <ThemeRoot theme={use} {...rest} />;

Theme.displayName = 'Theme';

type ThemeProviderPropsT = {
  /** Any theme option pointing to a valid CSS value. */
  options: { [key: string]: string },
  /** Additional standard inline styles that will be merged into the style tag. */
  style?: Object
};

/** A ThemeProvider. This sets theme colors for its child tree. */
export const ThemeProvider: React.ComponentType<ThemeProviderPropsT> = ({
  options,
  style = {},
  ...rest
}: ThemeProviderPropsT) => {
  const processedColors = Object.keys(options).reduce((acc, key) => {
    const val = options[key];
    acc[`--mdc-theme-${toDashCase(key)}`] = val;
    return acc;
  }, {});

  // Casting styles to avoid TSX error
  //$FlowFixMe
  const tsxSafeStyle: React.CSSProperties = style;

  const themeStyles = {
    ...tsxSafeStyle,
    ...processedColors
  };
  return <div {...rest} style={themeStyles} />;
};

ThemeProvider.displayName = 'ThemeProvider';

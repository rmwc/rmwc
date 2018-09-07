// @flow
import * as React from 'react';

import { simpleTag } from '@rmwc/base';
import { toDashCase } from '@rmwc/base/utils/to-dash-case';
import { getAutoColorsForTheme } from './utils';

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
export class ThemeProvider extends React.Component<ThemeProviderPropsT> {
  static displayName = 'ThemeProvider';

  prevOpts_ = '';
  colors_ = {};

  get colors() {
    // implement some caching to prevent the color checking from being called over and over again.
    const parsed = JSON.stringify(this.props.options);
    if (parsed !== this.prevOpts_) {
      this.prevOpts_ = parsed;

      const processedColors = Object.keys(this.props.options).reduce(
        (acc, key) => {
          const val = this.props.options[key];

          key = key.startsWith('--') ? key : `--mdc-theme-${toDashCase(key)}`;
          acc[key] = val;
          return acc;
        },
        {}
      );

      this.colors_ = getAutoColorsForTheme(processedColors);
    }

    return this.colors_;
  }

  render() {
    const { options, style = {}, ...rest } = this.props;
    // Casting styles to avoid TSX error
    // $FlowFixMe
    const tsxSafeStyle: React.CSSProperties = style;
    const themeStyles = {
      ...tsxSafeStyle,
      ...this.colors
    };
    return <div {...rest} style={themeStyles} />;
  }
}

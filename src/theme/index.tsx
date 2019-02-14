import * as RMWC from '@rmwc/types';
import * as React from 'react';

import {
  componentFactory,
  toDashCase,
  parseThemeOptions,
  wrapChild
} from '@rmwc/base';
import { getAutoColorsForTheme } from './utils';

const ThemeRoot = componentFactory<{}>({
  displayName: 'ThemeRoot',
  tag: 'span'
});

export interface ThemeProps {
  /** A theme option as a string, a space separated string for multiple values, or an array of valid theme options. */
  use: RMWC.ThemePropT;
  /** Collapse the styles directly onto the child component. This eliminates the need for a wrapping `span` element and may be required for applying things like background-colors.  */
  wrap?: boolean;
}

/**
 * A Theme Component.
 */
export const Theme = ({
  use,
  wrap,
  ...rest
}: RMWC.MergeInterfacesT<ThemeProps, RMWC.ComponentProps>) => {
  if (wrap) {
    return wrapChild({ ...rest, className: parseThemeOptions(use).join(' ') });
  }
  return <ThemeRoot theme={use} {...rest} />;
};

Theme.displayName = 'Theme';

export interface ThemeProviderProps
  extends Pick<
    RMWC.ComponentProps,
    Exclude<keyof RMWC.ComponentProps, 'wrap'>
  > {
  /** Any theme option pointing to a valid CSS value. */
  options: { [key: string]: string };
  /** Additional standard inline styles that will be merged into the style tag. */
  style?: Object;
  /** Instead of injecting a div tag, wrap a child component by merging the theme styles directly onto it. Useful when you don't want to mess with layout. */
  wrap?: boolean;
  /** Children to render */
  children?: React.ReactNode;
}

/** A ThemeProvider. This sets theme colors for its child tree. */
export class ThemeProvider extends React.Component<ThemeProviderProps> {
  static displayName = 'ThemeProvider';

  prevOpts_ = '';
  colors_ = {};

  get colors() {
    // implement some caching to prevent the color checking from being called over and over again.
    const parsed = JSON.stringify(this.props.options);
    if (parsed !== this.prevOpts_) {
      this.prevOpts_ = parsed;

      const processedColors = Object.keys(this.props.options).reduce(
        (acc: any, key) => {
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
    const { options, style = {}, wrap, ...rest } = this.props;
    // Casting styles to avoid TSX error
    // $FlowFixMe
    const tsxSafeStyle: React.CSSProperties = style;
    const themeStyles = {
      ...tsxSafeStyle,
      ...this.colors
    };

    if (wrap && rest.children) {
      const child = React.Children.only(rest.children);
      if (!React.isValidElement<React.HTMLProps<any>>(child)) {
        return;
      }
      const childStyle = child.props.style || {};

      return React.cloneElement(child, {
        ...child.props,
        ...rest,
        style: { ...themeStyles, ...childStyle }
      });
    }

    return <div {...rest} style={themeStyles} />;
  }
}

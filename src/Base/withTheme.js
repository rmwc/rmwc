// @flow
import * as React from 'react';
import classNames from 'classnames';
import { toDashCase } from './utils/to-dash-case';

export type WithThemePropsT = {
  theme?: string | string[],
  className?: string
};

/**
 * Actually parses the theme options
 */
export const parseThemeOptions = (
  theme: string | string[] | null
): string[] => {
  if (theme) {
    const themeItems = Array.isArray(theme) ? theme : theme.split(' ');
    return themeItems.map(v => `mdc-theme--${toDashCase(v)}`);
  }
  return [];
};

/**
 * HOC that adds themeability to any component
 */
export const withTheme = (Component: React.ComponentType<*>) => {
  const HOC: React.ComponentType<*> = ({
    theme,
    className,
    ...rest
  }: WithThemePropsT) => {
    if (theme) {
      const classes = classNames(className, parseThemeOptions(theme));
      return <Component className={classes} {...rest} />;
    }

    return <Component className={className} {...rest} />;
  };

  HOC.displayName = 'withTheme';

  return HOC;
};

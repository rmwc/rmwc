import * as RMWC from '@rmwc/types';
import React from 'react';

import classNames from 'classnames';
import { toDashCase } from './utils/strings';

export interface WithThemeProps {
  theme?: RMWC.ThemePropT;
  className?: string;
}

/**
 * Actually parses the theme options
 */
export const parseThemeOptions = (
  theme: undefined | string | Array<string | undefined>
): string[] => {
  const themeItems = Array.isArray(theme) ? theme : [theme];
  return themeItems
    .filter((v) => !!v)
    .map((v) => `mdc-theme--${toDashCase(v!)}`);
};

/**
 * HOC that adds themeability to any component
 */
export const withTheme = <P extends any>(
  Component: React.ComponentType<any>
): React.ComponentType<P & WithThemeProps & any> => {
  const HOC = ({ theme, className, ...rest }: WithThemeProps) => {
    if (theme) {
      const classes = classNames(className, parseThemeOptions(theme));
      return <Component className={classes} {...rest} />;
    }

    return <Component className={className} {...rest} />;
  };

  HOC.displayName = 'withTheme';

  return HOC;
};

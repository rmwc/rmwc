import * as React from 'react';
import classNames from 'classnames';
import { toDashCase } from './utils/strings';
import { deprecationWarning } from './utils/deprecation';

export type ThemeOptionT =
  | 'primary'
  | 'secondary'
  | 'background'
  | 'surface'
  | 'error'
  | 'primaryBg'
  | 'secondaryBg'
  | 'onPrimary'
  | 'onSecondary'
  | 'onSurface'
  | 'onError'
  | 'textPrimaryOnBackground'
  | 'textSecondaryOnBackground'
  | 'textHintOnBackground'
  | 'textDisabledOnBackground'
  | 'textIconOnBackground'
  | 'textPrimaryOnLight'
  | 'textSecondaryOnLight'
  | 'textHintOnLight'
  | 'textDisabledOnLight'
  | 'textIconOnLight'
  | 'textPrimaryOnDark'
  | 'textSecondaryOnDark'
  | 'textHintOnDark'
  | 'textDisabledOnDark'
  | 'textIconOnDark';

export interface WithThemeProps {
  theme?: ThemeOptionT | ThemeOptionT[];
  className?: string;
}

/**
 * Actually parses the theme options
 */
export const parseThemeOptions = (
  theme: string | string[] | null
): string[] => {
  if (theme) {
    if (typeof theme === 'string' && theme.includes(' ')) {
      deprecationWarning(
        `Theme no longer accepts a string of theme names with spaces. Please pass them as an array instead.`
      );
    }

    const themeItems = Array.isArray(theme) ? theme : theme.split(' ');
    return themeItems.map(v => {
      if (v.includes('-')) {
        deprecationWarning(
          `Theme properties need to be passed as camelCase. Please convert ${v} to ${v.replace(
            /-([a-z])/g,
            function(m, w) {
              return w.toUpperCase();
            }
          )}`
        );
      }
      return `mdc-theme--${toDashCase(v)}`;
    });
  }
  return [];
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

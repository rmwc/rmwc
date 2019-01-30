/**
 * Utils
 */
export type MergeInterfacesT<A, B> = A & Pick<B, Exclude<keyof B, keyof A>>;

/**
 * Theming
 */
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

export type ThemePropT = ThemeOptionT | ThemeOptionT[];

/**
 * Ripples
 */
export type RipplePropT =
  | boolean
  | {
      accent?: boolean;
      surface?: boolean;
      unbounded?: boolean;
    };

export interface DeprecatedRippleProps {
  /** DEPRECATED: pass an options object to the ripple prop `ripple={{accent: true}}` */
  accent?: boolean;
  /** DEPRECATED: pass an options object to the ripple prop `ripple={{surface: true}}` */
  surface?: boolean;
  /** DEPRECATED: pass an options object to the ripple prop `ripple={{unbounded: true}}` */
  unbounded?: boolean;
}

export interface WithRippleProps extends DeprecatedRippleProps {
  /** Adds a ripple effect to the component */
  ripple?: RipplePropT;
}

/**
 * Components
 */
export type TagT = string | React.ComponentType<any>;

export interface ComponentProps<T = any> extends React.HTMLProps<T> {
  tag?: TagT;
  theme?: ThemePropT;
}

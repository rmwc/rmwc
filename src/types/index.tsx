/**
 * Utils
 */
export type MergeInterfacesT<A, B> = A & Omit<B, keyof A>;

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
  | 'textIconOnDark'
  | undefined;

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

export interface WithRippleProps {
  /** Adds a ripple effect to the component */
  ripple?: RipplePropT;
}

/**
 * Components
 */
export type TagT = string | React.ComponentType<any>;

export interface ComponentProps extends React.HTMLProps<any> {
  tag?: TagT;
  theme?: ThemePropT;
  ref?: React.Ref<any>;
}

export type CustomEventT<T> = CustomEvent<T> &
  React.SyntheticEvent<EventTarget>;

type IconElementT = React.ReactNode;
export type IconSizeT = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

export type IconStrategyT =
  | 'auto'
  | 'ligature'
  | 'className'
  | 'url'
  | 'component'
  | 'custom';

export interface IconOptions {
  icon: IconElementT;
  /**
   * Handle multiple methods of embedding an icon.
   * 'ligature' uses ligature style embedding like material-icons,
   * 'className' adds a class onto the element for libraries like glyphicons and ion icons,
   * 'url' will load a remote image, and
   * 'component' will render content as children like SVGs or any other React node.
   * 'custom' allows you to specify your own render prop.
   * If not set, 'auto' will be used or the defaults set inside of RMWCProvider.
   * */
  strategy?: IconStrategyT;
  /**
   * A className prefix to use when using css font icons that use prefixes,
   * i.e. font-awesome-, ion-, glyphicons-.
   * This only applies when using the 'className' strategy.
   **/
  prefix?: string;
  /** A base className for the icon namespace, i.e. material-icons. */
  basename?: string;
  /** A render function to use when using the 'custom' strategy. */
  render?: (props: {
    content: IconElementT;
    className: string;
  }) => React.ReactNode;
  /** A size to render the icon  */
  size?: IconSizeT;
  /** Additional props */
  [key: string]: any;
}

export type IconPropT = IconElementT | IconOptions;

export type ComponentElementType = React.ElementType | undefined;

/**
 * As terrible as this seems, it is the lesser of all of the evils...
 * Typescript obsessively flattens any types with the Omit property
 * Or anything that is a union. There are a few props in RMWC that conflict
 * with the native HTML Attributes. The only way that I have found to get around
 * the prop flattening in the TS declaration files (which leads to gigantic long unions and recursive type errors)
 * was to actually pull in the attributes here, edit the ones I needed, and reconstruct
 * The definition or React.HTMLProps which the new attributes object.
 */
interface AllHTMLAttributes<T>
  extends Omit<React.AllHTMLAttributes<T>, 'label' | 'wrap' | 'size'> {}

export interface HTMLProps<T = HTMLElement>
  extends AllHTMLAttributes<T>,
    React.ClassAttributes<T> {
  tag?: TagT;
  theme?: ThemePropT;
  ref?: React.Ref<T>;
}

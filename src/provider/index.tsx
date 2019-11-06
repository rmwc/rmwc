import * as React from 'react';
import * as RMWC from '@rmwc/types';
import { deprecationWarning } from '@rmwc/base';

// prettier-ignore
// eslint-disable-next-line max-len
type IconStrategyT = 'auto' | 'ligature' | 'className' | 'url' | 'component' | 'custom';

type TooltipActivationT = 'hover' | 'click' | 'focus';

type TooltipAlignT =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';

type TooltipOptions = {
  /** How to align the tooltip. Defaults to `top`. */
  align?: TooltipAlignT;
  /** Activate the tooltip through one or more interactions. Defaults to `['hover', 'focus']`. */
  activateOn?: TooltipActivationT | TooltipActivationT[];
  /** Whether or not to show an arrow on the Tooltip. Defaults to `false`. */
  showArrow?: boolean;
  /** Delay in milliseconds before showing the tooltip when interacting via touch or mouse. */
  enterDelay?: number;
  /** Delay in milliseconds before hiding the tooltip when interacting via touch or mouse. */
  leaveDelay?: number;
};

type TypographyOptions = {
  defaultTag?: string | React.ComponentType<any>;
  headline1?: string | React.ComponentType<any>;
  headline2?: string | React.ComponentType<any>;
  headline3?: string | React.ComponentType<any>;
  headline4?: string | React.ComponentType<any>;
  headline5?: string | React.ComponentType<any>;
  headline6?: string | React.ComponentType<any>;
  subtitle1?: string | React.ComponentType<any>;
  subtitle2?: string | React.ComponentType<any>;
  body1?: string | React.ComponentType<any>;
  body2?: string | React.ComponentType<any>;
  caption?: string | React.ComponentType<any>;
  button?: string | React.ComponentType<any>;
  overline?: string | React.ComponentType<any>;
};

/** A provider for setting global options in RMWC. */
export interface RMWCProviderProps {
  /** Enable / Disable interaction ripples globally */
  ripple?: boolean;
  /** Global options for icons */
  icon?: Partial<RMWC.IconOptions>;
  /** Global tooltip options */
  tooltip?: Partial<TooltipOptions>;
  /** Global typography options */
  typography?: Partial<TypographyOptions>;
  /** Children to render */
  children?: React.ReactNode;
}

export interface DeprecatedRMWCProviderPropsT {
  /** DEPRECATED: Ripples for all components are now controlled by the providers ripple prop */
  buttonDefaultRipple?: boolean;
  /** DEPRECATED: Ripples for all components are now controlled by the providers ripple prop */
  listItemDefaultRipple?: boolean;
  /** DEPRECATED: Use the 'icon' prop. icon={{basename: 'material-icons'}} */
  iconClassNameBase?: string;
  /** DEPRECATED: Use the 'icon' prop. icon={{prefix: 'glyphicons-'}} */
  iconClassNamePrefix?: string;
  /** DEPRECATED: Use the 'icon' prop. icon={{strategy: 'className'}} */
  iconStrategy?: IconStrategyT;
  /** DEPRECATED: Use the 'icon' prop. icon={{render: () => <div />}} */
  iconRender?: (props: {
    content: React.ReactNode;
    className: string;
  }) => React.ReactNode;
}

// Default provider options
const providerDefaults: RMWCProviderProps = {
  ripple: true,
  tooltip: {
    align: 'top',
    showArrow: false,
    activateOn: ['hover', 'focus'],
    enterDelay: 0,
    leaveDelay: 0
  },
  typography: {},
  icon: {
    icon: '',
    basename: 'material-icons',
    prefix: '',
    strategy: 'auto',
    render: undefined
  }
};

export const ProviderContext = React.createContext(providerDefaults);

export const useProviderContext = () => React.useContext(ProviderContext);

/** A provider for setting global options in RMWC. */
export const RMWCProvider = ({
  children,
  iconClassNameBase,
  iconClassNamePrefix,
  iconStrategy,
  iconRender,
  ...rest
}: RMWCProviderProps & DeprecatedRMWCProviderPropsT) => {
  const value = { ...providerDefaults };
  const iconOptions = { ...value.icon } as RMWC.IconOptions;

  /* istanbul ignore if */
  if (iconClassNameBase || iconClassNamePrefix || iconStrategy || iconRender) {
    deprecationWarning(
      `RMWCProvider component no longer accepts iconClassNameBase, iconClassNamePrefix, iconStrategy, or iconRender props. Please use the 'icon' props instead. icon={{basename: 'material-icons', strategy: 'url'}}`
    );
    iconOptions.basename = iconClassNameBase || iconOptions.basename;
    iconOptions.prefix = iconClassNamePrefix || iconOptions.prefix;
    iconOptions.strategy = iconStrategy || iconOptions.strategy;
    iconOptions.render = iconRender || iconOptions.render;
  }

  value.icon = iconOptions;

  return (
    <ProviderContext.Provider
      value={{
        ...value,
        ...rest
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
};

RMWCProvider.displayName = 'RMWCProvider';

import React from 'react';
import * as RMWC from '@rmwc/types';

export type TooltipActivationT = 'hover' | 'click' | 'focus';

export type RCTooltipAlignT =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';

export type TooltipAlignT =
  | 'start'
  | 'center'
  | 'end'
  | 'above'
  | 'below'
  | 'startAbove'
  | 'startBelow'
  | 'centerAbove'
  | 'centerBelow'
  | 'endAbove'
  | 'endBelow';

export type TooltipOptions = {
  /** How to align the tooltip. This affects both RCTooltip and Tooltip, but only if the given alignment is supported by the component. Defaults to `top`. */
  align?: RCTooltipAlignT | TooltipAlignT;
  /** Activate the tooltip through one or more interactions. Defaults to `['hover', 'focus']`. */
  activateOn?: TooltipActivationT | TooltipActivationT[];
  /** Whether or not to show an arrow on the Tooltip. Only supported by RCTooltip. Defaults to `false`. */
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

/** Backwards compatible defaults to Typography. */
export const typographyDefaults = {
  defaultTag: 'span'
};

export const ProviderContext = React.createContext(providerDefaults);

export const useProviderContext = () => React.useContext(ProviderContext);

/** A provider for setting global options in RMWC. */
export const RMWCProvider = ({ children, ...rest }: RMWCProviderProps) => {
  return (
    <ProviderContext.Provider
      value={{
        ...providerDefaults,
        ...rest
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
};

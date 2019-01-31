import * as React from 'react';
import { IconOptions } from '@rmwc/icon';
import { deprecationWarning } from '@rmwc/base';

// prettier-ignore
// eslint-disable-next-line max-len
type IconStrategyT = 'auto' | 'ligature' | 'className' | 'url' | 'component' | 'custom';

export interface RMWCProviderProps {
  /** Set the buttons ripple effect globally */
  ripple?: boolean;
  /** Global options for icons */
  icon?: Partial<IconOptions>;
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
  iconRender?: (
    props: { content: React.ReactNode; className: string }
  ) => React.ReactNode;
}

// Default provider options
const providerDefaults: RMWCProviderProps = {
  ripple: true,
  icon: {
    icon: '',
    basename: 'material-icons',
    prefix: '',
    strategy: 'auto',
    render: undefined
  }
};

export interface WithProviderContext {
  providerContext: RMWCProviderProps;
}

export const ProviderContext = React.createContext(providerDefaults);

export const withProviderContext = () => <P extends {}>(
  Component: React.ComponentType<P & WithProviderContext>
) => {
  const wrapped = React.forwardRef((props: P, ref) => (
    <ProviderContext.Consumer>
      {providerContext => (
        <Component {...props} providerContext={providerContext} ref={ref} />
      )}
    </ProviderContext.Consumer>
  ));

  return (wrapped as unknown) as React.ComponentType<
    P & Partial<WithProviderContext>
  >;
};

/**
 * Provides default options for children
 * Prop override options in providerDefaults with the same name
 */
export const RMWCProvider = ({
  children,
  iconClassNameBase,
  iconClassNamePrefix,
  iconStrategy,
  iconRender,
  ...rest
}: RMWCProviderProps & DeprecatedRMWCProviderPropsT) => {
  const value = { ...providerDefaults };
  const iconOptions = { ...value.icon } as IconOptions;

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

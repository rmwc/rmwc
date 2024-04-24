import * as RMWC from '@rmwc/types';
import React from 'react';
import { MDCRippleFoundation } from '@material/ripple';
import { classNames } from '@rmwc/base';
import { useProviderContext } from '@rmwc/provider';
import { useRippleFoundation } from './foundation';

export interface RippleSurfaceProps {
  className: string;
  style: React.CSSProperties;
}

/** A component for adding Ripples to other components. */
export interface RippleProps {
  /** Makes the ripple unbounded */
  unbounded?: boolean;
  /** Makes the ripple primary */
  primary?: boolean;
  /** Makes the ripple an accent color*/
  accent?: boolean;
  /** makes the ripple disabled */
  disabled?: boolean;
  /** For internal use */
  surface?: boolean;
  /** Advanced: A reference to the MDCFoundation. */
  foundationRef?: React.Ref<MDCRippleFoundation>;
}

const RippleSurfaceContext = React.createContext({});

/** A component for adding Ripples to other components. */

export function Ripple(props: RippleProps & RMWC.HTMLProps) {
  const {
    children,
    className,
    primary,
    accent,
    unbounded,
    surface,
    foundationRef,
    ...rest
  } = props;

  const { rootEl, surfaceEl } = useRippleFoundation(props);

  const providerContext = useProviderContext();

  const child = React.Children.only(children);

  if (!providerContext.ripple) {
    return <>{children}</>;
  }

  if (!React.isValidElement<React.HTMLProps<any>>(child)) {
    return null;
  }

  // This flag really determines a lot
  // is surfaceIsRoot is true, then the surface props are spread
  // to the underlying component, otherwise the only place they
  // can be picked up is by the context consumer
  const surfaceIsRoot = !surface || !unbounded;

  const unboundedProp = unbounded
    ? { 'data-mdc-ripple-is-unbounded': true }
    : {};

  const rippleSurfaceProps = surfaceIsRoot
    ? surfaceEl.props({ style: child.props.style })
    : {};

  let finalClassNames = classNames(
    className !== child.props.className && className,
    rippleSurfaceProps.className,
    child.props.className,
    {
      'mdc-ripple-surface':
        typeof surface === 'boolean' ? surface : surface === undefined,
      'mdc-ripple-surface--primary': primary,
      'rmwc-ripple-surface--primary': primary,
      'mdc-ripple-surface--accent': accent,
      'rmwc-ripple-surface--accent': accent
    }
  );

  // Fixes a ripple artifact issue
  // that is caused when clicking a button disables it
  // https://codesandbox.io/s/842vo56019
  if (rest.disabled) {
    finalClassNames = finalClassNames.replace(
      'mdc-ripple-upgraded--background-focused',
      ''
    );
  }

  // do some crazy props merging...
  const content = React.cloneElement(child, {
    ref: rootEl.reactRef,
    ...child.props,
    ...unboundedProp,
    ...rootEl.props({
      ...rest,
      style: child.props.style,
      ...rippleSurfaceProps,
      className: finalClassNames
    })
  });

  return (
    <RippleSurfaceContext.Provider
      value={surfaceEl.props({ style: child.props.style })}
    >
      {content}
    </RippleSurfaceContext.Provider>
  );
}

export const RippleSurface = ({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => (
  <RippleSurfaceContext.Consumer>
    {(rippleSurfaceProps: any) => (
      <div
        {...rest}
        {...rippleSurfaceProps}
        className={`${className} ${rippleSurfaceProps.className || ''}`}
      />
    )}
  </RippleSurfaceContext.Consumer>
);

interface WithRippleOpts {
  accent?: boolean;
  surface?: boolean;
  unbounded?: boolean;
}

/**
 * HOC that adds ripples to any component
 */
export const withRipple =
  ({
    unbounded: defaultUnbounded,
    accent: defaultAccent,
    surface: defaultSurface
  }: WithRippleOpts = {}) =>
  <P extends any, C extends React.ComponentType<P>>(
    Component: React.ComponentType<P>
  ): C => {
    const WithRippleComponent = React.forwardRef<any, P & RMWC.WithRippleProps>(
      ({ ripple, ...rest }: any, ref) => {
        const providerContext = useProviderContext();
        ripple = ripple ?? providerContext.ripple;
        const rippleOptions = typeof ripple !== 'object' ? {} : ripple;

        if (ripple) {
          return (
            <Ripple
              {...rest}
              accent={rippleOptions.accent || defaultAccent}
              unbounded={rippleOptions.unbounded || defaultUnbounded}
              surface={rippleOptions.surface || defaultSurface}
            >
              <Component {...(rest as any)} ref={ref} />
            </Ripple>
          );
        }

        return <Component {...(rest as any)} ref={ref} />;
      }
    );

    WithRippleComponent.displayName = `withRipple(${
      Component.displayName || Component.constructor.name || 'Unknown'
    })`;

    return WithRippleComponent as any;
  };

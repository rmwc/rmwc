import * as RMWC from '@rmwc/types';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
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
const withDomNode = () => <P extends any>(
  Component: React.ComponentType<P>
): React.ComponentType<P & { domNode?: Element }> => {
  return class extends React.Component<
    { children: React.ReactNode } & P & { domNode?: Element }
  > {
    state = { domNode: null };

    componentDidMount() {
      this.setState({ domNode: ReactDOM.findDOMNode(this) as Element });
    }

    componentDidUpdate() {
      const rootRippleElement = ReactDOM.findDOMNode(this) as Element;

      if (rootRippleElement !== this.state.domNode) {
        this.setState({ rootRippleElement });
      }
    }

    render() {
      return <Component {...this.props} domNode={this.state.domNode} />;
    }
  };
};

export const Ripple = withDomNode()(function Ripple(
  props: RippleProps & RMWC.HTMLProps & { domNode?: Element }
) {
  const {
    children,
    className,
    primary,
    accent,
    unbounded,
    surface,
    domNode,
    foundationRef,
    ...rest
  } = props;

  const { rootEl, surfaceEl } = useRippleFoundation(props);

  const child = React.Children.only(children);

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
      'mdc-ripple-surface--accent': accent
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
});

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
export const withRipple = ({
  unbounded: defaultUnbounded,
  accent: defaultAccent,
  surface: defaultSurface
}: WithRippleOpts = {}) => <P extends any, C extends React.ComponentType<P>>(
  Component: C
): C => {
  const WithRippleComponent = React.forwardRef<any, P & RMWC.WithRippleProps>(
    ({ ripple, ...rest }, ref) => {
      const providerContext = useProviderContext();
      ripple = ripple ?? providerContext.ripple;
      const rippleOptions = typeof ripple !== 'object' ? {} : ripple;

      if (ripple) {
        return (
          <Ripple
            accent={rippleOptions.accent || defaultAccent}
            unbounded={rippleOptions.unbounded || defaultUnbounded}
            surface={rippleOptions.surface || defaultSurface}
            disabled={rest.disabled}
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

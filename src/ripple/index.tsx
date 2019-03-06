import * as RMWC from '@rmwc/types';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// @ts-ignore
import { MDCRippleFoundation, util } from '@material/ripple';
import {
  classNames,
  FoundationComponent,
  deprecationWarning,
  matches
} from '@rmwc/base';
import { withProviderContext, WithProviderContext } from '@rmwc/provider';
import { EventType, SpecificEventListener } from '@material/base/types';

export interface RippleSurfaceProps {
  className: string;
  style: React.CSSProperties;
}

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
}

type ActivateEventTypes<S> =
  | React.MouseEvent<S>
  | React.TouchEvent<S>
  | React.KeyboardEvent<S>
  | React.FocusEvent<S>;

const RippleSurfaceContext = React.createContext({});

/** A component for adding Ripples to other components. */
export class Ripple extends FoundationComponent<RippleProps> {
  static shouldDebounce = true;
  static displayName = 'Ripple';

  private root = this.createElement('root');
  private surface = this.createElement('surface');

  constructor(props: RippleProps) {
    super(props);

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  getDefaultFoundation() {
    return new MDCRippleFoundation({
      browserSupportsCssVars: () => util.supportsCssVariables(window),
      isUnbounded: () => !!this.props.unbounded,
      isSurfaceActive: () => {
        if (this.root.ref) {
          return matches(this.root.ref, ':active');
        }
        return false;
      },
      isSurfaceDisabled: () => !!this.props.disabled,
      addClass: (className: string) => this.surface.addClass(className),
      removeClass: (className: string) => this.surface.removeClass(className),
      containsEventTarget: (target: HTMLElement) =>
        !!this.root.ref && this.root.ref.contains(target),
      registerInteractionHandler: <K extends EventType>(
        evtType: K,
        handler: SpecificEventListener<K>
      ): void => this.root.addEventListener(evtType, handler),
      deregisterInteractionHandler: <K extends EventType>(
        evtType: K,
        handler: SpecificEventListener<K>
      ): void => this.root.removeEventListener(evtType, handler),
      registerDocumentInteractionHandler: <K extends EventType>(
        evtType: K,
        handler: SpecificEventListener<K>
      ): void =>
        document.documentElement.addEventListener(
          evtType,
          handler,
          util.applyPassive()
        ),
      deregisterDocumentInteractionHandler: (
        evtType: string,
        handler: (evt: Event) => void
      ) =>
        document.documentElement.removeEventListener(
          evtType,
          handler,
          util.applyPassive()
        ),
      registerResizeHandler: (handler: SpecificEventListener<'resize'>): void =>
        window.addEventListener('resize', handler),
      deregisterResizeHandler: (
        handler: SpecificEventListener<'resize'>
      ): void => window.removeEventListener('resize', handler),
      updateCssVariable: (varName: string, value: string) =>
        this.surface.setStyle(varName, value),
      computeBoundingRect: () =>
        this.root.ref
          ? this.root.ref.getBoundingClientRect()
          : ({ width: 0, height: 0 } as ClientRect),
      getWindowPageOffset: () => ({
        x: window.pageXOffset,
        y: window.pageYOffset
      })
    });
  }

  sync(props: RippleProps, prevProps: RippleProps) {
    this.root.setRef(ReactDOM.findDOMNode(this));

    if (props.unbounded !== prevProps.unbounded) {
      this.foundation.setUnbounded(props.unbounded);
    }
  }

  handleFocus(evt: React.FocusEvent<HTMLElement>) {
    this.props.onFocus && this.props.onFocus(evt);
    this.foundation.handleFocus();
  }

  handleBlur(evt: React.FocusEvent<HTMLElement>) {
    this.props.onBlur && this.props.onBlur(evt);
    this.foundation.handleBlur();
  }

  handleMouseDown(evt: React.MouseEvent<HTMLElement>) {
    this.props.onMouseDown && this.props.onMouseDown(evt);
    this.activateRipple(evt);
  }

  handleMouseUp(evt: React.MouseEvent<HTMLElement>) {
    this.props.onMouseUp && this.props.onMouseUp(evt);
    this.deactivateRipple(evt);
  }

  handleTouchStart(evt: React.TouchEvent<HTMLElement>) {
    this.props.onTouchStart && this.props.onTouchStart(evt);
    this.activateRipple(evt);
  }

  handleTouchEnd(evt: React.TouchEvent<HTMLElement>) {
    this.props.onTouchEnd && this.props.onTouchEnd(evt);
    this.deactivateRipple(evt);
  }

  handleKeyDown(evt: React.KeyboardEvent<HTMLElement>) {
    this.props.onKeyDown && this.props.onKeyDown(evt);
    this.activateRipple(evt);
  }

  handleKeyUp(evt: React.KeyboardEvent<HTMLElement>) {
    this.props.onKeyUp && this.props.onKeyUp(evt);
    this.deactivateRipple(evt);
  }

  activateRipple(evt: ActivateEventTypes<HTMLElement>) {
    // https://reactjs.org/docs/events.html#event-pooling
    evt.persist();
    this.foundation.activate(evt);
  }

  deactivateRipple(evt: ActivateEventTypes<HTMLElement>) {
    // https://reactjs.org/docs/events.html#event-pooling
    evt.persist();
    this.foundation.deactivate(evt);
  }

  render() {
    const {
      children,
      className,
      primary,
      accent,
      unbounded,
      surface,
      ...rest
    } = this.props;

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
      ? this.surface.props({ style: child.props.style })
      : {};

    let finalClassNames = classNames(
      className,
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
      ...this.root.props({
        ...rest,
        style: child.props.style,
        ...rippleSurfaceProps,
        className: finalClassNames
      }),
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp,
      onTouchStart: this.handleTouchStart,
      onTouchEnd: this.handleTouchEnd,
      onKeyDown: this.handleKeyDown,
      onKeyUp: this.handleKeyUp
    });

    return (
      <RippleSurfaceContext.Provider
        value={this.surface.props({ style: child.props.style })}
      >
        {content}
      </RippleSurfaceContext.Provider>
    );
  }
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
export const withRipple = ({
  unbounded: defaultUnbounded,
  accent: defaultAccent,
  surface: defaultSurface
}: WithRippleOpts = {}) => <P extends {}>(
  Component: React.ComponentType<P & RMWC.WithRippleProps>
): React.ComponentType<P & RMWC.WithRippleProps> => {
  const WithRippleComponent = withProviderContext()(
    React.forwardRef<any, any>(
      (
        {
          providerContext,
          ripple = providerContext.ripple,
          ...rest
        }: P & RMWC.WithRippleProps & WithProviderContext,
        ref
      ) => {
        const rippleOptions = typeof ripple !== 'object' ? {} : ripple;

        if (rest.accent || rest.unbounded || rest.surface) {
          deprecationWarning(
            `'accent', 'unbounded', and 'surface' have been deprecated as indiviudal props. Please pass an options object to the ripple prop directly. ripple={{accent: true, unbounded: true}} `
          );
          rippleOptions.accent = rest.accent || rippleOptions.accent;
          rippleOptions.unbounded = rest.unbounded || rippleOptions.unbounded;
          rippleOptions.surface = rest.surface || rippleOptions.surface;
        }

        if (ripple) {
          return (
            <Ripple
              {...rest}
              accent={rippleOptions.accent || defaultAccent}
              unbounded={rippleOptions.unbounded || defaultUnbounded}
              surface={rippleOptions.surface || defaultSurface}
            >
              <Component {...rest as P} ref={ref} />
            </Ripple>
          );
        }

        return <Component {...rest as P} ref={ref} />;
      }
    )
  );

  WithRippleComponent.displayName = `withRipple(${Component.displayName ||
    'Unknown'})`;

  return WithRippleComponent as React.ComponentType<P & RMWC.WithRippleProps>;
};

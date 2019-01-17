import * as React from 'react';
import * as ReactDOM from 'react-dom';
// @ts-ignore
import { MDCRippleFoundation, util } from '@material/ripple';
import { classNames, FoundationComponent } from '@rmwc/base';
import { deprecationWarning } from '@rmwc/base/utils/deprecationWarning';

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

export class Ripple extends FoundationComponent<RippleProps> {
  static displayName = 'Ripple';

  root = this.createElement('root');

  constructor(props: RippleProps) {
    super(props);

    [
      'handleFocus',
      'handleBlur',
      'handleMouseDown',
      'handleMouseUp',
      'handleTouchStart',
      'handleTouchEnd',
      'handleKeyDown',
      'handleKeyUp'
    ].forEach(k => {
      (this as any)[k] = (this as any)[k].bind(this);
    });
  }

  getDefaultFoundation() {
    const MATCHES = util.getMatchesProperty(HTMLElement.prototype);
    return new MDCRippleFoundation({
      browserSupportsCssVars: () => util.supportsCssVariables(window),
      isUnbounded: () => !!this.props.unbounded,
      isSurfaceActive: () =>
        this.root.el && (this.root.el as any)[MATCHES](':active'),
      isSurfaceDisabled: () => this.props.disabled,
      addClass: (className: string) => this.root.addClass(className),
      removeClass: (className: string) => this.root.removeClass(className),
      containsEventTarget: (target: HTMLElement) =>
        this.root.el && this.root.el.contains(target),
      registerInteractionHandler: (
        evtType: string,
        handler: (evt: Event) => void
      ) => this.root.addEventListener(evtType, handler, util.applyPassive()),
      deregisterInteractionHandler: (
        evtType: string,
        handler: (evt: Event) => void
      ) => this.root.removeEventListener(evtType, handler, util.applyPassive()),
      registerDocumentInteractionHandler: (
        evtType: string,
        handler: (evt: Event) => void
      ) =>
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
      registerResizeHandler: (handler: (evt: Event) => void) =>
        window.addEventListener('resize', handler),
      deregisterResizeHandler: (handler: (evt: Event) => void) =>
        window.removeEventListener('resize', handler),
      updateCssVariable: (varName: string, value: string | null) =>
        this.root.el && this.root.el.style.setProperty(varName, value),
      computeBoundingRect: () =>
        this.root.el && this.root.el.getBoundingClientRect(),
      getWindowPageOffset: () => ({
        x: window.pageXOffset,
        y: window.pageYOffset
      })
    });
  }

  sync(props: RippleProps, prevProps: RippleProps) {
    this.root.setEl(ReactDOM.findDOMNode(this));

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

    this.foundation.activate(evt);
  }

  deactivateRipple(evt: ActivateEventTypes<HTMLElement>) {
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
    const unboundedProp = unbounded
      ? { 'data-mdc-ripple-is-unbounded': true }
      : {};

    return React.cloneElement(child, {
      ...child.props,
      ...unboundedProp,
      ...this.root.props(rest),
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp,
      onTouchStart: this.handleTouchStart,
      onTouchEnd: this.handleTouchEnd,
      onKeyDown: this.handleKeyDown,
      onKeyUp: this.handleKeyUp,
      className: classNames(this.root.classes, {
        'mdc-ripple-surface': surface !== undefined ? surface : true,
        'mdc-ripple-surface--primary': primary,
        'mdc-ripple-surface--accent': accent
      })
    });
  }
}

export interface WithRippleProps {
  /* Adds a ripple effect to the component */
  ripple?:
    | boolean
    | {
        accent?: boolean;
        surface?: boolean;
        unbounded?: boolean;
      };
}

interface WithRippleOpts {
  accent?: boolean;
  surface?: boolean;
  unbounded?: boolean;
}

interface DeprecatedRippleProps {
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
  surface: defaultSurface = true
}: WithRippleOpts = {}) => <P extends {}>(
  Component: React.ComponentType<P & WithRippleProps & DeprecatedRippleProps>
) => {
  const WithRippleComponent = React.forwardRef<any, any>(
    (
      { ripple = true, ...rest }: P & WithRippleProps & DeprecatedRippleProps,
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
  );

  WithRippleComponent.displayName = `withRipple(${Component.displayName ||
    'Unknown'})`;
  WithRippleComponent.defaultProps = {
    ripple: true
  };

  return WithRippleComponent;
};

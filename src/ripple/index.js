// @flow
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import { MDCRipple } from '@material/ripple/dist/mdc.ripple';
import { withFoundation, syncFoundationProp } from '@rmwc/base/withFoundation';

export type RipplePropsT = {
  /** Makes the ripple unbounded */
  unbounded?: boolean,
  /** Makes the ripple primary */
  primary?: boolean,
  /** Makes the ripple an accent color*/
  accent?: boolean,
  /** makes the ripple disabled */
  disabled?: boolean
};

export class Ripple extends withFoundation({
  constructor: MDCRipple,
  adapter: {
    addClass: function(className) {
      return this.root_ && this.root_.classList.add(className);
    },
    removeClass: function(className) {
      return this.root_ && this.root_.classList.remove(className);
    }
  }
})<RipplePropsT & { surface?: boolean }> {
  static displayName = 'Ripple';

  unbounded: boolean;
  disabled: boolean;

  componentDidMount() {
    // Ripples can be used with many types of components
    // we need to use ReactDOM as an escape hatch to just find the DOMNode
    this.root_ = ReactDOM.findDOMNode(this);
    super.componentDidMount();
  }

  syncWithProps(nextProps: RipplePropsT) {
    // We dont know how React might have changed our dom node, re-grab it.
    this.root_ = ReactDOM.findDOMNode(this);

    // unbounded
    syncFoundationProp(
      nextProps.unbounded,
      this.unbounded,
      () => (this.unbounded = !!nextProps.unbounded)
    );

    //disabled
    syncFoundationProp(
      nextProps.disabled,
      this.disabled,
      () => (this.disabled = !!nextProps.disabled)
    );
  }

  render() {
    const {
      children,
      className,
      primary,
      accent,
      unbounded,
      surface,
      apiRef,
      ...rest
    } = this.props;

    const child = React.Children.only(children);

    const unboundedProp = unbounded
      ? { 'data-mdc-ripple-is-unbounded': true }
      : {};

    return React.cloneElement(child, {
      ...child.props,
      ...rest,
      ...unboundedProp,
      className: classNames(child.props.className, {
        'mdc-ripple-surface': surface !== undefined ? surface : true,
        'mdc-ripple-surface--primary': primary,
        'mdc-ripple-surface--accent': accent
      })
    });
  }
}

export type WithRipplePropsT = {
  /* Adds a ripple effect to the component */
  ripple?: boolean,
  /* Some components need to disable the ripple-surface class */
  surface?: boolean,
  cssOnly?: boolean,
  unbounded?: boolean
};

/**
 * HOC that adds ripples to any component
 */
export const withRipple = ({
  unbounded: defaultUnbounded,
  surface: defaultSurface = true
}: {
  unbounded?: boolean,
  surface?: boolean
} = {}) => (Component: React.ComponentType<*>) =>
  class extends React.Component<WithRipplePropsT & any> {
    static displayName = `withRipple(${Component.displayName || 'Unknown'})`;
    static defaultProps = {
      ripple: true
    };
    render() {
      const { ripple, ...rest } = this.props;

      if (ripple && !rest.cssOnly) {
        return (
          <Ripple
            {...rest}
            unbounded={rest.unbounded || defaultUnbounded}
            surface={rest.surface || defaultSurface}
          >
            <Component {...rest} />
          </Ripple>
        );
      }

      return <Component {...rest} />;
    }
  };

export default Ripple;

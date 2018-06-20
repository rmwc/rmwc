// @flow
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import { MDCRipple } from '@material/ripple/dist/mdc.ripple';
import { withFoundation, syncFoundationProp } from '../Base/withFoundation';

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
  adapter: {}
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

export default Ripple;

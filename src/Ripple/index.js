// @flow
import * as React from 'react';
import classNames from 'classnames';
import { MDCRipple } from '@material/ripple/dist/mdc.ripple';
import {
  withFoundation,
  addClass,
  removeClass,
  syncFoundationProp
} from '../Base/MDCFoundation';

type RipplePropsT = {
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
    addClass: addClass(),
    removeClass: removeClass()
  }
})<RipplePropsT> {
  static displayName = 'Ripple';

  syncWithProps(nextProps: RipplePropsT) {
    // unbounded
    syncFoundationProp(
      nextProps.unbounded,
      this.unbounded,
      () => (this.unbounded = nextProps.unbounded)
    );

    //disabled
    syncFoundationProp(
      nextProps.disabled,
      this.disabled,
      () => (this.disabled = nextProps.disabled)
    );
  }

  render() {
    const {
      children,
      className,
      primary,
      accent,
      unbounded,
      ...rest
    } = this.props;

    return React.cloneElement(children, {
      ...children.props,
      ...rest,
      elementRef: this.foundationRefs.root_,
      className: classNames(className, [...this.state.classes], {
        'mdc-ripple-surface--primary': primary,
        'mdc-ripple-surface--accent': accent
      })
    });
  }
}

export default Ripple;

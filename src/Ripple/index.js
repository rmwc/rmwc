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

    const { root_ } = this.foundationRefs;

    const child = React.Children.only(children);

    // a little tricky... We only want to pass a ref if we are dealing with a dom element, aka div, p, aside
    // Otherwise we have a class, and we want to pass elementRef down the chain.
    const refProp = {
      [typeof child.type !== 'string' ? 'elementRef' : 'ref']: root_
    };

    const unboundedProp = unbounded ?
      { 'data-mdc-ripple-is-unbounded': true } :
      {};

    return React.cloneElement(child, {
      ...child.props,
      ...rest,
      ...refProp,
      ...unboundedProp,
      className: classNames(
        className,
        child.props.className,
        [...this.state.classes],
        {
          'mdc-ripple-surface': !child.type.isSimpleTag,
          'mdc-ripple-surface--primary': primary,
          'mdc-ripple-surface--accent': accent
        }
      )
    });
  }
}

export default Ripple;

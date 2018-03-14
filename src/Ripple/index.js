// @flow
import * as React from 'react';
import classNames from 'classnames';
import { MDCRipple } from '@material/ripple/dist/mdc.ripple';
import { withFoundation, addClass, removeClass } from '../Base/MDCFoundation';

export class Ripple extends withFoundation({
  constructor: MDCRipple,
  adapter: {
    addClass: addClass(),
    removeClass: removeClass()
  }
})<> {
  static displayName = 'Ripple';

  syncWithProps(nextProps) {
    if (this.unbounded !== nextProps.unbounded) {
      this.unbounded = nextProps.unbounded;
    }

    if (this.disabled !== nextProps.disabled) {
      this.disabled = nextProps.disabled;
    }
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

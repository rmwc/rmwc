import * as React from 'react';
// @ts-ignore
import { MDCFloatingLabelFoundation } from '@material/floating-label';
import { FoundationComponent } from '@rmwc/base';

export interface FloatingLabelProps {}

export class FloatingLabel extends FoundationComponent<FloatingLabelProps> {
  static displayName = 'FloatingLabel';

  root = this.createElement('root');

  getDefaultFoundation() {
    return new MDCFloatingLabelFoundation({
      addClass: (className: string) => this.root.addClass(className),
      removeClass: (className: string) => this.root.removeClass(className),
      getWidth: () => this.root.el && this.root.el.offsetWidth,
      registerInteractionHandler: (evtType: string, handler: () => void) =>
        this.root.addEventListener(evtType, handler),
      deregisterInteractionHandler: (evtType: string, handler: () => void) =>
        this.root.removeEventListener(evtType, handler)
    });
  }

  shake(shouldShake: boolean) {
    this.foundation.shake(shouldShake);
  }

  float(shouldFloat: boolean) {
    this.foundation.float(shouldFloat);
  }

  getWidth() {
    return this.foundation.getWidth();
  }

  render() {
    return <label {...this.root.props(this.props)} ref={this.root.setEl} />;
  }
}

export default FloatingLabel;

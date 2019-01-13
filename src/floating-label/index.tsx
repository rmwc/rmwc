import * as React from 'react';
// @ts-ignore
import { MDCFloatingLabelFoundation } from '@material/floating-label';
import { FoundationComponent } from '@rmwc/base';

export type FloatingLabelPropsT = {};

export class FloatingLabel extends FoundationComponent<FloatingLabelPropsT> {
  static displayName = 'FloatingLabel';
  root_: null | HTMLLabelElement = null;

  constructor(props: FloatingLabelPropsT) {
    super(props);
    this.createClassList('root_');
    this.createPropsList('root_');
  }

  getDefaultFoundation() {
    return new MDCFloatingLabelFoundation({
      addClass: (className: string) => this.classList.root_.add(className),
      removeClass: (className: string) =>
        this.classList.root_.remove(className),
      getWidth: () => this.root_ && this.root_.offsetWidth,
      registerInteractionHandler: (evtType: string, handler: () => void) =>
        this.propsList.root_.addEventListener(evtType, handler),
      deregisterInteractionHandler: (evtType: string, handler: () => void) =>
        this.propsList.root_.removeEventListener(evtType, handler)
    });
  }

  shake(shouldShake: boolean) {
    this.foundation_.shake(shouldShake);
  }

  /**
   * Styles label to float/dock.
   * @param {boolean} shouldFloat styles the label to float by adding float class
   * if true, otherwise docks the label by removing the float class.
   */
  float(shouldFloat: boolean) {
    this.foundation_.float(shouldFloat);
  }

  /**
   * @return {number}
   */
  getWidth() {
    return this.foundation_.getWidth();
  }

  render() {
    return (
      <label
        {...this.props}
        {...this.propsList.root_.all()}
        className={`mdc-floating-label ${this.classList.root_.renderToString()}`}
        ref={ref => (this.root_ = ref)}
      />
    );
  }
}

export default FloatingLabel;

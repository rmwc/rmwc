// @flow
import * as React from 'react';
import { MDCLineRippleFoundation } from '@material/line-ripple/dist/mdc.lineRipple';
import { FoundationComponent } from '@rmwc/base';

export type LineRipplePropsT = {};

export class LineRipple extends FoundationComponent<LineRipplePropsT> {
  static displayName = 'LineRipple';
  root_: null | HTMLElement;

  constructor(props: LineRipplePropsT) {
    super(props);
    this.createClassList('root_');
    this.createPropsList('root_');
  }

  getDefaultFoundation() {
    return new MDCLineRippleFoundation(
      /** @type {!MDCLineRippleAdapter} */ (Object.assign({
        addClass: className => this.classList.root_.add(className),
        removeClass: className => this.classList.root_.remove(className),
        hasClass: className => this.classList.root_.has(className),
        setStyle: (propertyName, value) =>
          this.root_ && (this.root_.style[propertyName] = value),
        registerEventHandler: (evtType, handler) =>
          this.propsList.root_.addEventListener(evtType, handler),
        deregisterEventHandler: (evtType, handler) =>
          this.propsList.root_.removeEventListener(evtType, handler)
      }))
    );
  }

  render() {
    return (
      <div
        {...this.props}
        className={`mdc-line-ripple ${this.classList.root_.renderToString()}`}
        {...this.propsList.root_.all()}
      />
    );
  }
}

export default LineRipple;

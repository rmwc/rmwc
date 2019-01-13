import * as React from 'react';
// @ts-ignore
import { MDCLineRippleFoundation } from '@material/line-ripple';
import { FoundationComponent } from '@rmwc/base';

export type LineRipplePropsT = {};

export class LineRipple extends FoundationComponent<LineRipplePropsT> {
  static displayName = 'LineRipple';
  root_: null | HTMLElement = null;

  constructor(props: LineRipplePropsT) {
    super(props);
    this.createClassList('root_');
    this.createPropsList('root_');
  }

  getDefaultFoundation() {
    return new MDCLineRippleFoundation({
      addClass: (className: string) => this.classList.root_.add(className),
      removeClass: (className: string) =>
        this.classList.root_.remove(className),
      hasClass: (className: string) => this.classList.root_.has(className),
      setStyle: (propertyName: any, value: any) =>
        this.root_ && (this.root_.style[propertyName] = value),
      registerEventHandler: (evtType: string, handler: () => void) =>
        this.propsList.root_.addEventListener(evtType, handler),
      deregisterEventHandler: (evtType: string, handler: () => void) =>
        this.propsList.root_.removeEventListener(evtType, handler)
    });
  }

  /**
   * Activates the line ripple
   */
  activate() {
    this.foundation_.activate();
  }

  /**
   * Deactivates the line ripple
   */
  deactivate() {
    this.foundation_.deactivate();
  }

  /**
   * Sets the transform origin given a user's click location. The `rippleCenter` is the
   * x-coordinate of the middle of the ripple.
   * @param {number} xCoordinate
   */
  setRippleCenter(xCoordinate: number) {
    this.foundation_.setRippleCenter(xCoordinate);
  }

  render() {
    return (
      <div
        {...this.props}
        {...this.propsList.root_.all()}
        className={`mdc-line-ripple ${this.classList.root_.renderToString()}`}
        ref={ref => (this.root_ = ref)}
      />
    );
  }
}

export default LineRipple;

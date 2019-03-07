import * as RMWC from '@rmwc/types';
import * as React from 'react';
// @ts-ignore
import { MDCLineRippleFoundation } from '@material/line-ripple';
import { FoundationComponent } from '@rmwc/base';

export interface LineRippleProps {
  active?: boolean;
  center?: number;
}

export class LineRipple extends FoundationComponent<
  MDCLineRippleFoundation,
  LineRippleProps
> {
  static displayName = 'LineRipple';

  private root = this.createElement('root');

  getDefaultFoundation() {
    return new MDCLineRippleFoundation({
      addClass: (className: string) => this.root.addClass(className),
      removeClass: (className: string) => this.root.removeClass(className),
      hasClass: (className: string) => this.root.hasClass(className),
      setStyle: (propertyName: any, value: any) =>
        this.root.setStyle(propertyName, value),
      registerEventHandler: (evtType: string, handler: () => void) =>
        this.root.addEventListener(evtType, handler),
      deregisterEventHandler: (evtType: string, handler: () => void) =>
        this.root.removeEventListener(evtType, handler)
    });
  }

  sync(props: LineRippleProps, prevProps: LineRippleProps) {
    // active
    this.syncProp(props.active, prevProps.active, () => {
      props.active ? this.foundation.activate() : this.foundation.deactivate();
    });

    // center
    this.syncProp(props.center, prevProps.center, () => {
      this.foundation.setRippleCenter(props.center);
    });
  }

  render() {
    const { active, center, ...rest } = this.props;
    return (
      <div
        {...this.root.props({
          ...rest,
          className: `mdc-line-ripple ${this.props.className || ''}`
        })}
        ref={this.root.setRef}
      />
    );
  }
}

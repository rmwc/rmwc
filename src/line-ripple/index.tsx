import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { MDCLineRippleFoundation } from '@material/line-ripple';
import { FoundationComponent } from '@rmwc/base';
import { SpecificEventListener, EventType } from '@material/base/types';

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
      registerEventHandler: <K extends EventType>(
        evtType: K,
        handler: SpecificEventListener<K>
      ) => this.root.addEventListener(evtType, handler),
      deregisterEventHandler: <K extends EventType>(
        evtType: K,
        handler: SpecificEventListener<K>
      ) => this.root.removeEventListener(evtType, handler)
    });
  }

  sync(props: LineRippleProps, prevProps: LineRippleProps) {
    // active
    this.syncProp(props.active, prevProps.active, () => {
      props.active ? this.foundation.activate() : this.foundation.deactivate();
    });

    // center
    this.syncProp(props.center, prevProps.center, () => {
      typeof props.center === 'number' &&
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

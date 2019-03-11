import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { EventType, SpecificEventListener } from '@material/base/types';
import { MDCFloatingLabelFoundation } from '@material/floating-label';
import { FoundationComponent } from '@rmwc/base';

export interface FloatingLabelProps {
  shake?: boolean;
  float?: boolean;
}

export class FloatingLabel extends FoundationComponent<
  MDCFloatingLabelFoundation,
  FloatingLabelProps
> {
  static displayName = 'FloatingLabel';

  private root = this.createElement('root');

  getDefaultFoundation() {
    return new MDCFloatingLabelFoundation({
      addClass: (className: string) => this.root.addClass(className),
      removeClass: (className: string) => this.root.removeClass(className),
      getWidth: () => (this.root.ref ? this.root.ref.scrollWidth : 0),
      registerInteractionHandler: <K extends EventType>(
        evtType: K,
        handler: SpecificEventListener<K>
      ): void => this.root.addEventListener(evtType, handler),
      deregisterInteractionHandler: <K extends EventType>(
        evtType: K,
        handler: SpecificEventListener<K>
      ): void => this.root.removeEventListener(evtType, handler)
    });
  }

  sync(props: FloatingLabelProps, prevProps: FloatingLabelProps) {
    // shake
    this.syncProp(props.shake, prevProps.shake, () => {
      this.foundation.shake(!!props.shake);
    });

    // float
    this.syncProp(props.float, prevProps.float, () => {
      this.foundation.float(!!props.float);
    });
  }

  getWidth() {
    return this.foundation.getWidth();
  }

  render() {
    const { shake, float, ...rest } = this.props;
    return (
      <label
        {...this.root.props({ ...rest, className: 'mdc-floating-label' })}
        ref={this.root.setRef}
      />
    );
  }
}

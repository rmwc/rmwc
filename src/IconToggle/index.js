// @flow
import type { SimpleTagPropsT, CustomEventT } from '../Base';

import * as React from 'react';
import { MDCIconToggle } from '@material/icon-toggle/dist/mdc.iconToggle';
import { Icon } from '../Icon';
import { simpleTag, noop, withFoundation, syncFoundationProp } from '../Base';

export type IconToggleChangeEventDetailT = {
    isOn: boolean;
};

export type IconTogglePropsT = {
  /* prettier-ignore */
  /** An onChange callback that receives a custom event. */
  onChange?: (evt: CustomEventT<IconToggleChangeEventDetailT>) => mixed,
  /** An object that can be parsed as valid JSON that gets passed to the MDC constructor. */
  on: Object,
  /** An object that can be parsed as valid JSON that gets passed to the MDC constructor. */
  off: Object,
  /** Whether the toggle is on or off */
  checked?: boolean,
  /** Disables the iconToggle */
  disabled?: boolean
} & SimpleTagPropsT;

export const IconToggleRoot = simpleTag({
  displayName: 'IconToggleRoot',
  tag: Icon,
  classNames: 'mdc-icon-toggle',
  defaultProps: {
    role: 'button',
    tabIndex: '0'
  }
});

export class IconToggle extends withFoundation({
  constructor: MDCIconToggle,
  adapter: {}
})<IconTogglePropsT> {
  static displayName = 'IconToggle';
  static defaultProps = {
    onChange: noop,
    on: undefined,
    off: undefined,
    checked: undefined
  };

  on: boolean;
  disabled: boolean;
  initRipple_: Function;
  ripple_: any;

  initialize() {
    this.ripple_ = this.initRipple_();
    super.initialize();
  }

  syncWithProps(nextProps: IconTogglePropsT) {
    // checked
    syncFoundationProp(
      nextProps.checked,
      this.on,
      () => (this.on = !!nextProps.checked)
    );

    // disabled
    syncFoundationProp(
      nextProps.disabled,
      this.disabled,
      () => (this.disabled = !!nextProps.disabled)
    );
  }

  render() {
    const { checked, on, off, apiRef, ...rest } = this.props;
    const ariaPressed = checked !== undefined ? !!checked : false;
    const toggleOnJSON = JSON.stringify(on);
    const toggleOffJSON = JSON.stringify(off);

    return (
      <IconToggleRoot
        {...rest}
        elementRef={this.foundationRefs.root_}
        data-toggle-on={toggleOnJSON}
        data-toggle-off={toggleOffJSON}
        aria-pressed={ariaPressed}
      />
    );
  }
}

export default IconToggle;

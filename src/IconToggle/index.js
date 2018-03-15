// @flow
import * as React from 'react';
import classNames from 'classnames';
import { MDCIconToggle } from '@material/icon-toggle/dist/mdc.iconToggle';
import { Icon } from '../Icon';
import { simpleTag, noop } from '../Base';
import { withRipple } from '../Base/withRipple';
import {
  withFoundation,
  syncFoundationProp,
  addClass,
  removeClass
} from '../Base/MDCFoundation';

type IconTogglePropsT = {
  /* prettier-ignore */
  /** An onChange callback that receives a custom event. */
  onChange?: (evt: {type: 'MDCIconToggle:change', detail: {isOn: boolean}}) => mixed,
  /** An object that can be parsed as valid JSON that gets passed to the MDC constructor. */
  on: Object,
  /** An object that can be parsed as valid JSON that gets passed to the MDC constructor. */
  off: Object,
  /** Whether the toggle is on or off */
  checked?: boolean,
  /** Disables the iconToggle */
  disabled?: boolean
};

export const IconToggleRoot = withRipple({ unbounded: true })(
  simpleTag({
    displayName: 'IconToggleRoot',
    tag: Icon,
    classNames: 'mdc-icon-toggle',
    defaultProps: {
      role: 'button',
      tabIndex: '0'
    }
  })
);

export class IconToggle extends withFoundation({
  constructor: MDCIconToggle,
  adapter: {
    addClass: addClass(),
    removeClass: removeClass()
  }
})<IconTogglePropsT, {}> {
  static displayName = 'IconToggle';
  static defaultProps = {
    onChange: noop,
    on: undefined,
    off: undefined,
    checked: undefined
  };

  syncWithProps(nextProps: IconTogglePropsT) {
    // checked
    syncFoundationProp(
      nextProps.checked,
      this.on,
      () => (this.on = nextProps.checked)
    );

    // disabled
    syncFoundationProp(
      nextProps.disabled,
      this.disabled,
      () => (this.disabled = nextProps.disabled)
    );
  }

  render() {
    const { checked, on, off, ...rest } = this.props;
    const ariaPressed = checked !== undefined ? !!checked : false;
    const toggleOnJSON = JSON.stringify(on);
    const toggleOffJSON = JSON.stringify(off);

    return (
      <IconToggleRoot
        {...rest}
        className={classNames(rest.className || null, [...this.state.classes])}
        elementRef={this.foundationRefs.root_}
        data-toggle-on={toggleOnJSON}
        data-toggle-off={toggleOffJSON}
        aria-pressed={ariaPressed}
      />
    );
  }
}

export default IconToggle;

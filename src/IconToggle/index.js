// @flow
import * as React from 'react';
import { MDCIconToggle } from '@material/icon-toggle/dist/mdc.iconToggle';
import { Icon } from '../Icon';
import { simpleTag, noop } from '../Base';
import { withRipple } from '../Base/withRipple';
import {
  withFoundation,
  addClass,
  removeClass,
  registerInteractionHandler,
  deregisterInteractionHandler
} from '../Base/MDCFoundation';

type IconTogglePropsT = {
  /* prettier-ignore */
  /** An onChange callback that receives an event with event.target.value set to true or false. */
  onChange?: (evt: Object) => mixed,
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
    removeClass: removeClass(),
    registerInteractionHandler: registerInteractionHandler(),
    deregisterInteractionHandler: deregisterInteractionHandler()
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
    if (nextProps.checked !== this.foundation_.isOn()) {
      this.foundation_.toggle(!!nextProps.checked);
    }

    if (nextProps.disabled !== this.foundation_.isDisabled()) {
      this.foundation_.setDisabled(!!nextProps.disabled);
    }
  }

  render() {
    const { checked, on, off, ...rest } = this.props;
    const ariaPressed = checked !== undefined ? !!checked : false;
    const toggleOnJSON = JSON.stringify(on);
    const toggleOffJSON = JSON.stringify(off);

    return (
      <IconToggleRoot
        {...rest}
        className={(rest.className || null, [...this.state.classes])}
        elementRef={this.foundationRefs.root_}
        data-toggle-on={toggleOnJSON}
        data-toggle-off={toggleOffJSON}
        aria-pressed={ariaPressed}
      />
    );
  }
}

export default IconToggle;

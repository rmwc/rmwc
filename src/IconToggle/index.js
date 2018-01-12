// @flow
import * as React from 'react';
import { MDCIconToggle } from '@material/icon-toggle/dist/mdc.iconToggle';
import { Icon } from '../Icon';
import { simpleTag, withMDC, noop } from '../Base';

export const IconToggleRoot = simpleTag({
  displayName: 'IconToggleRoot',
  tag: Icon,
  classNames: 'mdc-icon-toggle',
  defaultProps: {
    role: 'button',
    tabIndex: '0'
  }
});

type IconToggleT = {
  /* prettier-ignore */
  /** An onChange callback that receives an event with event.target.value set to true or false. */
  onChange?: (evt: Object) => mixed,
  /** An object that can be parsed as valid JSON that gets passed to the MDC constructor. */
  on: Object,
  /** An object that can be parsed as valid JSON that gets passed to the MDC constructor. */
  off: Object,
  /** Whether the toggle is on or off */
  checked?: boolean
};

/**
 * Icon Toggle Component
 */
export const IconToggle = withMDC({
  mdcConstructor: MDCIconToggle,
  mdcElementRef: true,
  mdcEvents: {
    'MDCIconToggle:change': (evt, props, api) => {
      props.onChange &&
        props.onChange({
          ...evt.detail,
          target: {
            checked: evt.detail.isOn
          }
        });
    }
  },
  onUpdate(props, nextProps, api) {
    if (api && nextProps.checked !== undefined) {
      api.on = !!nextProps.checked;
    }
  }
})(
  class extends React.Component<IconToggleT> {
    static displayName = 'IconToggle';

    static defaultProps = {
      onChange: noop,
      on: undefined,
      off: undefined,
      checked: undefined
    };

    render() {
      const { checked, on, off, mdcElementRef, ...rest } = this.props;
      const ariaPressed = checked !== undefined ? !!checked : false;
      const toggleOnJSON = JSON.stringify(on);
      const toggleOffJSON = JSON.stringify(off);

      return (
        <IconToggleRoot
          elementRef={mdcElementRef}
          {...rest}
          data-toggle-on={toggleOnJSON}
          data-toggle-off={toggleOffJSON}
          aria-pressed={ariaPressed}
        />
      );
    }
  }
);

export default IconToggle;

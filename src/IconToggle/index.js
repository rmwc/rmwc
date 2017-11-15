// @flow
import * as React from 'react';
import { MDCIconToggle } from '@material/icon-toggle/dist/mdc.iconToggle';
import { Icon } from '../Icon';
import { simpleTag, withMDC } from '../Base';

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
  value?: boolean
};

/**
 * Icon Toggle Component
 */
export const IconToggle: React.ComponentType<IconToggleT> = withMDC({
  mdcConstructor: MDCIconToggle,
  mdcElementRef: true,
  mdcEvents: {
    'MDCIconToggle:change': (evt, props, api) => {
      props.onChange &&
        props.onChange({
          ...evt.detail,
          target: {
            value: evt.detail.isOn
          }
        });
    }
  },
  onUpdate(props, nextProps, api) {
    if (api && nextProps.value !== undefined) {
      api.on = !!nextProps.value;
    }
  }
})(
  class extends React.Component<IconToggleT> {
    static displayName = 'IconToggle';

    render() {
      const { value, on, off, mdcElementRef, ...rest } = this.props;
      const ariaPressed = value !== undefined ? !!value : false;
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

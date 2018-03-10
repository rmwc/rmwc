// @flow
import * as React from 'react';
import { MDCIconToggle } from '@material/icon-toggle/dist/mdc.iconToggle';
import { Icon } from '../Icon';
import { simpleTag, noop } from '../Base';
import { withRipple } from '../Base/withRipple';
import { foundationFactory } from '../Base/MDCFoundation';

type IconTogglePropsT = {
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

export const IconToggle = foundationFactory({
  constructor: MDCIconToggle,
  defaultHandlers: [
    'addClass',
    'removeClass',
    'registerInteractionHandler',
    'deregisterInteractionHandler'
  ],
  syncWithProps: (inst, props) => {
    if (props.checked !== inst.foundation_.isOn()) {
      inst.foundation_.toggle(!!props.checked);
    }

    if (props.disabled !== inst.foundation_.isDisabled()) {
      inst.foundation_.setDisabled(!!props.disabled);
    }
  }
})(
  class extends React.Component<IconTogglePropsT> {
    static displayName = 'IconToggle';

    static defaultProps = {
      onChange: noop,
      on: undefined,
      off: undefined,
      checked: undefined
    };

    render() {
      const { checked, on, off, root_, ...rest } = this.props;
      const ariaPressed = checked !== undefined ? !!checked : false;
      const toggleOnJSON = JSON.stringify(on);
      const toggleOffJSON = JSON.stringify(off);

      return (
        <IconToggleRoot
          {...rest}
          elementRef={root_}
          data-toggle-on={toggleOnJSON}
          data-toggle-off={toggleOffJSON}
          aria-pressed={ariaPressed}
        />
      );
    }
  }
);

// export default IconToggle;

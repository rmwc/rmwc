// @flow
import type { SimpleTagPropsT } from '../Base';

import * as React from 'react';
import FormField from '../FormField';
import classNames from 'classnames';
import { MDCSwitch } from '@material/switch/dist/mdc.switch';

import { simpleTag, withFoundation } from '../Base';
import { randomId } from '../Base/utils/randomId';
import { syncFoundationProp } from '../Base';

export type SwitchPropsT = {
  /** A DOM ID for the toggle. */
  id?: string,
  /** Disables the control. */
  disabled?: boolean,
  /** Toggle the control on and off. */
  checked?: boolean | string,
  /** A label for the control. */
  label?: string,
  /** Props for the root element. By default, props spread to the input. */
  rootProps?: any,
  /** Any children to render. */
  children?: React.Node
} & SimpleTagPropsT &
  //$FlowFixMe
  React.InputHTMLAttributes<HTMLInputElement>;

export const SwitchRoot = simpleTag({
  displayName: 'SwitchRoot',
  classNames: 'mdc-switch'
});

export const SwitchNativeControl = simpleTag({
  displayName: 'SwitchNativeControl',
  tag: 'input',
  classNames: 'mdc-switch__native-control',
  defaultProps: {
    type: 'checkbox'
  }
});

export const SwitchTrack = simpleTag({
  displayName: 'SwitchTrack',
  classNames: 'mdc-switch__track'
});

export const SwitchThumbUnderlay = simpleTag({
  displayName: 'SwitchThumbUnderlay',
  classNames: 'mdc-switch__thumb-underlay'
});

export const SwitchThumb = simpleTag({
  displayName: 'SwitchThumb',
  classNames: 'mdc-switch__thumb'
});

export const SwitchKnob = simpleTag({
  displayName: 'SwitchKnob',
  classNames: 'mdc-switch__knob'
});

export const SwitchLabel = simpleTag({
  displayName: 'SwitchLabel',
  tag: 'label',
  classNames: 'mdc-switch-label'
});

export class Switch extends withFoundation({
  constructor: MDCSwitch,
  adapter: {}
})<SwitchPropsT> {
  static displayName = 'Switch';

  generatedId: string;
  disabled: boolean;
  checked: boolean;
  ripple_: any;
  initRipple_: Function;

  constructor(props: SwitchPropsT) {
    super(props);
    this.generatedId = randomId('switch');
  }

  componentDidMount() {
    super.componentDidMount();
    this.ripple_ = this.initRipple_();
  }

  syncWithProps(nextProps: SwitchPropsT) {
    // checked
    syncFoundationProp(nextProps.checked, this.checked, () => {
      this.checked = !!nextProps.checked;
    });

    // disabled
    syncFoundationProp(nextProps.disabled, this.disabled, () => {
      this.disabled = !!nextProps.disabled;
    });
  }

  render() {
    const {
      label = '',
      id,
      children,
      disabled,
      rootProps = {},
      ...rest
    } = this.props;

    const labelId = id || this.generatedId;
    const hasLabel = label.length || children;
    const { root_ } = this.foundationRefs;

    const switchTag = (
      <SwitchRoot
        {...(!hasLabel ? rootProps : {})}
        className={classNames(hasLabel || rootProps.className)}
        elementRef={root_}
      >
        <SwitchTrack />
        <SwitchThumbUnderlay>
          <SwitchThumb>
            <SwitchNativeControl id={labelId} {...rest} />
          </SwitchThumb>
        </SwitchThumbUnderlay>
        <SwitchKnob />
      </SwitchRoot>
    );

    /**
     * We have to conditionally wrap our checkbox in a formfield
     * If we have a label
     */
    if (hasLabel) {
      return (
        <FormField {...rootProps} className={rootProps.className}>
          {switchTag}
          <SwitchLabel id={labelId + 'label'} htmlFor={labelId}>
            {label}
            {children}
          </SwitchLabel>
        </FormField>
      );
    } else {
      return switchTag;
    }
  }
}

export default Switch;

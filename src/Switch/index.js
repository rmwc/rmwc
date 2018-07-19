// @flow
import type { SimpleTagPropsT } from '../Base';

import * as React from 'react';
import FormField from '../FormField';
import classNames from 'classnames';

import { simpleTag } from '../Base';
import { randomId } from '../Base/utils/randomId';

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
} & SimpleTagPropsT;

export const SwitchRoot = simpleTag({
  displayName: 'SwitchRoot',
  classNames: (props: SwitchPropsT) => [
    'mdc-switch',
    {
      'mdc-switch--disabled': props.disabled
    }
  ],
  consumeProps: ['disabled']
});

export const SwitchNativeControl = simpleTag({
  displayName: 'SwitchNativeControl',
  tag: 'input',
  classNames: 'mdc-switch__native-control',
  defaultProps: {
    type: 'checkbox'
  }
});

export const SwitchBackground = simpleTag({
  displayName: 'SwitchBackground',
  classNames: 'mdc-switch__background'
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

export class Switch extends React.Component<SwitchPropsT> {
  static displayName = 'Switch';

  generatedId: string;

  constructor(props: SwitchPropsT) {
    super(props);
    this.generatedId = randomId('switch');
  }

  render() {
    const { label = '', id, children, rootProps = {}, ...rest } = this.props;

    const labelId = id || this.generatedId;
    const hasLabel = label.length || children;

    const switchTag = (
      <SwitchRoot
        {...(!hasLabel ? rootProps : {})}
        disabled={rest.disabled}
        className={classNames(hasLabel || rootProps.className)}
      >
        <SwitchNativeControl id={labelId} {...rest} />
        <SwitchBackground>
          <SwitchKnob />
        </SwitchBackground>
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

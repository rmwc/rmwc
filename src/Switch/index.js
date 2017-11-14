// @flow
import * as React from 'react';
import FormField from '../FormField';
import classNames from 'classnames';

import { simpleTag, withMDCToggle } from '../Base';

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
  tag: 'label'
});

export const Switch = withMDCToggle()(
  ({ label = '', id, children, generatedId, mdcElementRef, ...rest }) => {
    const labelId = id || generatedId;

    const switchTag = (
      <SwitchRoot
        elementRef={mdcElementRef}
        className={classNames({ 'mdc-switch--disabled': rest.disabled })}
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
    if (label.length || children) {
      return (
        <FormField>
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
);

export default Switch;

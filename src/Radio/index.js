// @flow
import * as React from 'react';
import { MDCRadio } from '@material/radio/dist/mdc.radio';
import FormField from '../FormField';
import classNames from 'classnames';
import { simpleTag, withMDCToggle } from '../Base';

export const RadioRoot = simpleTag({
  name: 'RadioRoot',
  classNames: 'mdc-radio'
});

export const RadioNativeControl = simpleTag({
  name: 'RadioNativeControl',
  tag: 'input',
  classNames: 'mdc-radio__native-control',
  defaultProps: {
    type: 'radio'
  }
});

export const RadioBackground = simpleTag({
  name: 'RadioBackground',
  classNames: 'mdc-radio__background'
});

export const RadioOuterCircle = simpleTag({
  name: 'RadioOuterCircle',
  classNames: 'mdc-radio__outer-circle'
});

export const RadioInnerCircle = simpleTag({
  name: 'RadioInnerCircle',
  classNames: 'mdc-radio__inner-circle'
});

export const RadioLabel = simpleTag({
  name: 'RadioLabel',
  tag: 'label'
});

export const Radio = withMDCToggle({ mdcConstructor: MDCRadio })(
  ({
    label = '',
    id,
    children,
    apiRef,
    generatedId,
    mdcElementRef,
    ...rest
  }) => {
    const labelId = id || generatedId;

    const radio = (
      <RadioRoot
        elementRef={mdcElementRef}
        className={classNames({ 'mdc-radio--disabled': rest.disabled })}
      >
        <RadioNativeControl id={labelId} {...rest} />
        <RadioBackground>
          <RadioOuterCircle />
          <RadioInnerCircle />
        </RadioBackground>
      </RadioRoot>
    );

    /**
     * We have to conditionally wrap our radio in a FormField
     * If we have a label
     */
    if (label.length || children) {
      return (
        <FormField>
          {radio}
          <RadioLabel id={labelId + 'label'} htmlFor={labelId}>
            {label}
            {children}
          </RadioLabel>
        </FormField>
      );
    } else {
      return radio;
    }
  }
);

export default Radio;

// @flow
import * as React from 'react';
import { MDCRadio } from '@material/radio/dist/mdc.radio';
import FormField from '../FormField';
import classNames from 'classnames';
import { simpleTag, withMDCToggle } from '../Base';

export const RadioRoot = simpleTag({
  displayName: 'RadioRoot',
  classNames: 'mdc-radio'
});

export const RadioNativeControl = simpleTag({
  displayName: 'RadioNativeControl',
  tag: 'input',
  classNames: 'mdc-radio__native-control',
  defaultProps: {
    type: 'radio'
  }
});

export const RadioBackground = simpleTag({
  displayName: 'RadioBackground',
  classNames: 'mdc-radio__background'
});

export const RadioOuterCircle = simpleTag({
  displayName: 'RadioOuterCircle',
  classNames: 'mdc-radio__outer-circle'
});

export const RadioInnerCircle = simpleTag({
  displayName: 'RadioInnerCircle',
  classNames: 'mdc-radio__inner-circle'
});

export const RadioLabel = simpleTag({
  displayName: 'RadioLabel',
  tag: 'label'
});

type RadioPropsT = {
  /** A DOM ID for the toggle. */
  id?: string,
  /** Disables the control. */
  disabled?: boolean,
  /** Toggle the control on and off. */
  checked?: boolean | string,
  /** A label for the control. */
  label?: string
};

export const Radio = withMDCToggle({ mdcConstructor: MDCRadio })(
  class extends React.Component<RadioPropsT> {
    static displayName = 'Radio';
    render() {
      const {
        label = '',
        id,
        children,
        apiRef,
        generatedId,
        mdcElementRef,
        ...rest
      } = this.props;
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
  }
);

export default Radio;

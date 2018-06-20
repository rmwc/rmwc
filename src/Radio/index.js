// @flow
import type { SimpleTagPropsT } from '../Base';

import * as React from 'react';
import { MDCRadio } from '@material/radio/dist/mdc.radio';
import FormField from '../FormField';
import { simpleTag, withFoundation, syncFoundationProp } from '../Base';
import { randomId } from '../Base/utils/randomId';

export type RadioPropsT = {
  /** A DOM ID for the toggle. */
  id?: string,
  /** Disables the control. */
  disabled?: boolean,
  /** Toggle the control on and off. */
  checked?: boolean | string,
  /** The value of the control. */
  value?: boolean | string | number,
  /** A label for the control. */
  label?: string,
  /** Children to render */
  children?: React.Node
} & SimpleTagPropsT;

export const RadioRoot = simpleTag({
  displayName: 'RadioRoot',
  classNames: (props: RadioPropsT) => [
    'mdc-radio',
    { 'mdc-radio--disabled': props.disabled }
  ]
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

export class Radio extends withFoundation({
  constructor: MDCRadio,
  adapter: {}
})<RadioPropsT> {
  static displayName = 'Radio';

  generatedId: string;
  ripple_: any;
  initRipple_: Function;
  checked: boolean;
  disabled: boolean;
  value: any;

  constructor(props: RadioPropsT) {
    super(props);
    this.generatedId = randomId('radio');
  }

  componentDidMount() {
    super.componentDidMount();
    this.ripple_ = this.initRipple_();
  }

  syncWithProps(nextProps: RadioPropsT) {
    // checked
    syncFoundationProp(
      nextProps.checked,
      this.checked,
      () => (this.checked = !!nextProps.checked)
    );

    // disabled
    syncFoundationProp(
      nextProps.disabled,
      this.disabled,
      () => (this.disabled = !!nextProps.disabled)
    );

    // value
    syncFoundationProp(
      nextProps.value,
      this.value,
      () => (this.value = nextProps.value)
    );
  }

  render() {
    const { label = '', id, children, apiRef, ...rest } = this.props;
    const labelId = id || this.generatedId;
    const { root_ } = this.foundationRefs;

    const radio = (
      <RadioRoot elementRef={root_} disabled={rest.disabled}>
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

export default Radio;

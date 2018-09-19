// @flow
import type { SimpleTagPropsT } from '@rmwc/base';

import * as React from 'react';
import { MDCCheckboxFoundation } from '@material/checkbox/dist/mdc.checkbox';
import FormField from '@rmwc/formfield';
import { simpleTag, FoundationComponent } from '@rmwc/base';
import { randomId } from '@rmwc/base/utils/randomId';
import { withRipple } from '@rmwc/ripple';

export type CheckboxPropsT = {
  /** A DOM ID for the toggle. */
  id?: string,
  /** Disables the control. */
  disabled?: boolean,
  /** Toggle the control on and off. */
  checked?: boolean | string,
  /** The value of the control. */
  value?: boolean | string | number,
  /** Make the control indeterminate */
  indeterminate?: boolean,
  /** A label for the control. */
  label?: string
} & SimpleTagPropsT &
  //$FlowFixMe
  React.InputHTMLAttributes<HTMLInputElement>;

export const CheckboxRoot = withRipple({ surface: false, unbounded: true })(
  simpleTag({
    displayName: 'CheckboxRoot',
    classNames: (props: CheckboxPropsT) => [
      'mdc-checkbox',
      {
        'mdc-checkbox--disabled': props.disabled
      }
    ],
    consumeProps: ['disabled']
  })
);

export const CheckboxNativeControl = simpleTag({
  displayName: 'CheckboxNativeControl',

  tag: 'input',
  classNames: 'mdc-checkbox__native-control',
  defaultProps: {
    type: 'checkbox'
  }
});

export const CheckboxBackground = simpleTag({
  displayName: 'CheckboxBackground',
  classNames: 'mdc-checkbox__background'
});

export const CheckboxCheckmark = simpleTag({
  displayName: 'CheckboxCheckmark',
  tag: 'svg',
  classNames: 'mdc-checkbox__checkmark',
  defaultProps: {
    viewBox: '0 0 24 24'
  }
});

export const CheckboxCheckmarkPath = simpleTag({
  displayName: 'CheckboxCheckmarkPath',
  tag: 'path',
  classNames: 'mdc-checkbox__checkmark-path',
  defaultProps: {
    fill: 'none',
    stroke: 'white',
    d: 'M1.73,12.91 8.1,19.28 22.79,4.59'
  }
});

export const CheckboxMixedmark = simpleTag({
  displayName: 'CheckboxMixedmark',
  classNames: 'mdc-checkbox__mixedmark'
});

export const CheckboxLabel = simpleTag({
  displayName: 'CheckboxLabel',
  tag: 'label'
});

/**
 * A Checkbox component
 */
export class Checkbox extends FoundationComponent<CheckboxPropsT> {
  static displayName = 'Checkbox';
  nativeCb_: any;
  root_: any;
  generatedId: string;
  nativeCbHandler_: Function;

  constructor(props: CheckboxPropsT) {
    super(props);
    this.generatedId = randomId('checkbox');
    this.createClassList('root_');
    this.createPropsList('nativeCb_');
  }

  componentDidMount() {
    this.nativeCbHandler_ = () => this.syncWithDOM(this.props);
    this.nativeCb_.addEventListener('change', this.nativeCbHandler_);
    super.componentDidMount();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.nativeCb_.removeEventListener('change', this.nativeCbHandler_);
  }

  syncWithDOM(nextProps: CheckboxPropsT) {
    if (nextProps.indeterminate !== this.nativeCb_.indeterminate) {
      this.nativeCb_.indeterminate = nextProps.indeterminate;
    }
  }

  getDefaultFoundation() {
    return new MDCCheckboxFoundation({
      addClass: className => this.classList.root_.add(className),
      removeClass: className => this.classList.root_.remove(className),
      setNativeControlAttr: (attr, value) =>
        this.propsList.nativeCb_.add(attr, value),
      removeNativeControlAttr: attr => this.propsList.nativeCb_.remove(attr),
      getNativeControl: () => this.nativeCb_,
      isIndeterminate: () => this.props.indeterminate,
      isChecked: () =>
        this.props.checked !== undefined
          ? this.props.checked
          : this.nativeCb_.checked,
      hasNativeControl: () => !!this.nativeCb_,
      setNativeControlDisabled: disabled =>
        (this.nativeCb_.disabled = disabled),
      forceLayout: () => this.root_.offsetWidth,
      isAttachedToDOM: () => Boolean(this.root_.parentNode)
    });
  }

  render() {
    const { label = '', id, children, indeterminate, ...rest } = this.props;

    const labelId = id || this.generatedId;

    const checkbox = (
      <CheckboxRoot
        elementRef={ref => (this.root_ = ref)}
        disabled={rest.disabled}
        {...this.classList.root_.get()}
      >
        <CheckboxNativeControl
          {...this.propsList.nativeCb_.get()}
          elementRef={ref => (this.nativeCb_ = ref)}
          id={labelId}
          {...rest}
        />
        <CheckboxBackground>
          <CheckboxCheckmark>
            <CheckboxCheckmarkPath />
          </CheckboxCheckmark>
          <CheckboxMixedmark />
        </CheckboxBackground>
      </CheckboxRoot>
    );

    /**
     * We have to conditionally wrap our checkbox in a formfield
     * If we have a label
     */
    if (label.length || children) {
      return (
        <FormField>
          {checkbox}
          <CheckboxLabel id={labelId + 'label'} htmlFor={labelId}>
            {label}
            {children}
          </CheckboxLabel>
        </FormField>
      );
    } else {
      return checkbox;
    }
  }
}

export default Checkbox;

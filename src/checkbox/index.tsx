import { WithRippleProps } from '@rmwc/ripple';

import * as React from 'react';
// @ts-ignore
import { MDCCheckboxFoundation } from '@material/checkbox';
// @ts-ignore
import { getCorrectEventName } from '@material/animation';
import { FormField } from '@rmwc/formfield';
import { componentFactory, FoundationComponent } from '@rmwc/base';
import { randomId } from '@rmwc/base/utils/randomId';
import { withRipple } from '@rmwc/ripple';

/**
 * This is an awful freaking bugfix
 * Basically, MDC decided that patching the native getter and setter
 * on a checkbox would be fun which consequently kills Reacts ability
 * to do the same.
 */
MDCCheckboxFoundation.prototype.installPropertyChangeHooks_ = () => {};

export type CheckboxPropsT = {
  /** A DOM ID for the toggle. */
  id?: string;
  /** Disables the control. */
  disabled?: boolean;
  /** Toggle the control on and off. */
  checked?: boolean | string;
  /** The value of the control. */
  value?: boolean | string | number;
  /** Make the control indeterminate */
  indeterminate?: boolean;
  /** A label for the control. */
  label?: string;
} & WithRippleProps &
  //$FlowFixMe
  React.InputHTMLAttributes<HTMLInputElement>;

const CheckboxRoot = withRipple({
  surface: false,
  unbounded: true
})(
  componentFactory<CheckboxPropsT>({
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

const CheckboxNativeControl = componentFactory({
  displayName: 'CheckboxNativeControl',
  defaultProps: {
    type: 'checkbox'
  },
  tag: 'input',
  classNames: ['mdc-checkbox__native-control']
});

class CheckboxBackground extends React.Component<{}> {
  static displayName = 'CheckboxBackground';

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="mdc-checkbox__background">
        <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
          <path
            className="mdc-checkbox__checkmark-path"
            fill="none"
            stroke="white"
            d="M1.73,12.91 8.1,19.28 22.79,4.59"
          />
        </svg>
        <div className="mdc-checkbox__mixedmark" />
      </div>
    );
  }
}

const CheckboxLabel: React.ComponentType<any> = ({ ...rest }) => (
  <label {...rest} />
);
CheckboxLabel.displayName = 'CheckboxLabel';

/**
 * A Checkbox component
 */
export class Checkbox extends FoundationComponent<CheckboxPropsT> {
  static displayName = 'Checkbox';
  nativeCb_: HTMLInputElement | null = null;
  root_: HTMLElement | null = null;
  generatedId: string;
  handleChange_: any;
  handleAnimationEnd_: any;

  constructor(props: CheckboxPropsT) {
    super(props);
    this.generatedId = randomId('checkbox');
    this.createClassList('root_');
    this.createPropsList('nativeCb_');

    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  sync(nextProps: CheckboxPropsT) {
    this.foundation.handleChange();

    if (
      this.nativeCb_ &&
      nextProps.indeterminate !== this.nativeCb_.indeterminate
    ) {
      this.nativeCb_.indeterminate = !!nextProps.indeterminate;
    }
  }

  getDefaultFoundation() {
    return new MDCCheckboxFoundation({
      addClass: (className: string) => this.classList.root_.add(className),
      removeClass: (className: string) =>
        this.classList.root_.remove(className),
      setNativeControlAttr: (attr: string, value: any) =>
        this.propsList.nativeCb_.add(attr, value),
      removeNativeControlAttr: (attr: string) =>
        this.propsList.nativeCb_.remove(attr),
      getNativeControl: () => this.nativeCb_,
      isIndeterminate: () => this.props.indeterminate,
      isChecked: () =>
        this.props.checked !== undefined
          ? this.props.checked
          : this.nativeCb_ && this.nativeCb_.checked,
      hasNativeControl: () => !!this.nativeCb_,
      setNativeControlDisabled: (disabled: boolean) =>
        this.nativeCb_ && (this.nativeCb_.disabled = disabled),
      forceLayout: () => this.root_ && this.root_.offsetWidth,
      isAttachedToDOM: () => true
    });
  }

  handleAnimationEnd(evt: React.AnimationEvent) {
    this.props.onAnimationEnd && this.props.onAnimationEnd(evt);
    this.foundation && this.foundation.handleAnimationEnd();
  }

  handleOnChange(evt: React.ChangeEvent<HTMLInputElement>) {
    this.props.onChange && this.props.onChange(evt);
    this.sync(this.props);
  }

  render() {
    const { label = '', id, children, indeterminate, ...rest } = this.props;
    const labelId = id || this.generatedId;

    const checkbox = (
      <CheckboxRoot
        ref={ref => (this.root_ = ref)}
        disabled={rest.disabled}
        className={this.classList.root_.renderToString()}
        onAnimationEnd={this.handleAnimationEnd}
      >
        <CheckboxNativeControl
          ref={ref => (this.nativeCb_ = ref)}
          id={labelId}
          {...this.propsList.nativeCb_.all(rest)}
          onChange={this.handleOnChange}
        />

        <CheckboxBackground />
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

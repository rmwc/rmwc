// @flow
import type { WithRipplePropsT } from '@rmwc/ripple';

import * as React from 'react';
import { MDCCheckboxFoundation } from '@material/checkbox';
import { getCorrectEventName } from '@material/animation';
import FormField from '@rmwc/formfield';
import { Component, FoundationComponent } from '@rmwc/base';
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
} & WithRipplePropsT &
  //$FlowFixMe
  React.InputHTMLAttributes<HTMLInputElement>;

const CheckboxRoot = withRipple({
  surface: false,
  unbounded: true
})(
  class extends Component<CheckboxPropsT> {
    static displayName = 'CheckboxRoot';
    classNames = (props: CheckboxPropsT) => [
      'mdc-checkbox',
      {
        'mdc-checkbox--disabled': props.disabled
      }
    ];
    consumeProps = ['disabled'];
  }
);

class CheckboxNativeControl extends Component<{}> {
  static displayName = 'CheckboxNativeControl';
  static defaultProps = {
    type: 'checkbox'
  };

  tag = 'input';
  classNames = ['mdc-checkbox__native-control'];
}

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
  nativeCb_: HTMLInputElement | null;
  root_: HTMLElement | null;
  generatedId: string;
  handleChange_: any;
  handleAnimationEnd_: any;

  constructor(props: CheckboxPropsT) {
    super(props);
    this.generatedId = randomId('checkbox');
    this.createClassList('root_');
    this.createPropsList('nativeCb_');
  }

  componentDidMount() {
    super.componentDidMount();
    this.handleAnimationEnd_ = () => this.foundation_.handleAnimationEnd();
    this.handleChange_ = () => this.sync(this.props);
    this.nativeCb_ &&
      this.nativeCb_.addEventListener('change', this.handleChange_);
    this.root_ &&
      this.root_.addEventListener(
        getCorrectEventName(window, 'animationend'),
        this.handleAnimationEnd_
      );
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.nativeCb_ &&
      this.nativeCb_.removeEventListener('change', this.handleChange_);
    this.root_ &&
      this.root_.removeEventListener(
        getCorrectEventName(window, 'animationend'),
        this.handleAnimationEnd_
      );
  }

  sync(nextProps: CheckboxPropsT) {
    this.foundation_.handleChange();

    if (
      this.nativeCb_ &&
      nextProps.indeterminate !== this.nativeCb_.indeterminate
    ) {
      this.nativeCb_.indeterminate = !!nextProps.indeterminate;
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
          : this.nativeCb_ && this.nativeCb_.checked,
      hasNativeControl: () => !!this.nativeCb_,
      setNativeControlDisabled: disabled =>
        this.nativeCb_ && (this.nativeCb_.disabled = disabled),
      forceLayout: () => this.root_ && this.root_.offsetWidth,
      isAttachedToDOM: () => true
    });
  }

  render() {
    const { label = '', id, children, indeterminate, ...rest } = this.props;
    const labelId = id || this.generatedId;

    const checkbox = (
      <CheckboxRoot
        elementRef={ref => (this.root_ = ref)}
        disabled={rest.disabled}
        className={this.classList.root_.renderToString()}
      >
        <CheckboxNativeControl
          elementRef={ref => (this.nativeCb_ = ref)}
          id={labelId}
          {...this.propsList.nativeCb_.all(rest)}
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

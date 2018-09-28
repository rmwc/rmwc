// @flow
import type { WithRipplePropsT } from '@rmwc/ripple';

import * as React from 'react';
import { MDCCheckboxFoundation } from '@material/checkbox/dist/mdc.checkbox';
import FormField from '@rmwc/formfield';
import { Component, FoundationComponent } from '@rmwc/base';
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
  nativeCb_: ?HTMLInputElement;
  root_: ?HTMLElement;
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
    this.nativeCb_ &&
      this.nativeCb_.addEventListener('change', this.nativeCbHandler_);
    super.componentDidMount();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.nativeCb_ &&
      this.nativeCb_.removeEventListener('change', this.nativeCbHandler_);
  }

  syncWithDOM(nextProps: CheckboxPropsT) {
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
      isAttachedToDOM: () => this.root_ && Boolean(this.root_.parentNode)
    });
  }

  render() {
    const { label = '', id, children, indeterminate, ...rest } = this.props;

    const labelId = id || this.generatedId;

    const checkbox = (
      <CheckboxRoot
        elementRef={ref => (this.root_ = ref)}
        disabled={rest.disabled}
        className={this.classList.root_.get()}
      >
        <CheckboxNativeControl
          {...this.propsList.nativeCb_.get()}
          elementRef={ref => (this.nativeCb_ = ref)}
          id={labelId}
          {...rest}
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

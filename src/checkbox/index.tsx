import * as React from 'react';
// @ts-ignore
import { MDCCheckboxFoundation } from '@material/checkbox';
import { componentFactory, FoundationComponent } from '@rmwc/base';
import { randomId } from '@rmwc/base/utils/randomId';
import { FormField } from '@rmwc/formfield';
import { withRipple, WithRippleProps } from '@rmwc/ripple';

/**
 * This is an awful freaking bugfix
 * Basically, MDC decided that patching the native getter and setter
 * on a checkbox would be fun which consequently kills Reacts ability
 * to do the same.
 */
MDCCheckboxFoundation.prototype.installPropertyChangeHooks_ = () => {};

export interface CheckboxProps extends WithRippleProps {
  /** A DOM ID for the toggle. */
  id?: string;
  /** Disables the control. */
  disabled?: boolean;
  /** Toggle the control on and off. */
  checked?: boolean;
  /** The value of the control. */
  value?: string | number | string[];
  /** Make the control indeterminate */
  indeterminate?: boolean;
  /** A label for the control. */
  label?: string | any;
}

const CheckboxRoot = withRipple({
  surface: false,
  unbounded: true
})(
  componentFactory<CheckboxProps>({
    displayName: 'CheckboxRoot',
    classNames: (props: CheckboxProps) => [
      'mdc-checkbox',
      {
        'mdc-checkbox--disabled': props.disabled
      }
    ],
    consumeProps: ['disabled']
  })
);

const CheckboxNativeControl = componentFactory<{}>({
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

const CheckboxLabel = ({ ...rest }) => <label {...rest} />;
CheckboxLabel.displayName = 'CheckboxLabel';

/**
 * A Checkbox component
 */
export class Checkbox extends FoundationComponent<CheckboxProps> {
  static displayName = 'Checkbox';

  nativeCb = this.createElement<HTMLInputElement>('nativeCb');
  root = this.createElement('root');
  generatedId = randomId('checkbox');

  constructor(props: CheckboxProps) {
    super(props);
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  sync(nextProps: CheckboxProps) {
    this.foundation.handleChange();

    if (
      this.nativeCb.el &&
      nextProps.indeterminate !== this.nativeCb.el.indeterminate
    ) {
      this.nativeCb.el.indeterminate = !!nextProps.indeterminate;
    }
  }

  getDefaultFoundation() {
    return new MDCCheckboxFoundation({
      addClass: (className: string) => this.root.addClass(className),
      removeClass: (className: string) => this.root.removeClass(className),
      setNativeControlAttr: (attr: string, value: any) =>
        this.nativeCb.addProp(attr, value),
      removeNativeControlAttr: (attr: string) => this.nativeCb.removeProp(attr),
      getNativeControl: () => this.nativeCb.el,
      isIndeterminate: () => this.props.indeterminate,
      isChecked: () =>
        this.props.checked !== undefined
          ? this.props.checked
          : this.nativeCb.el && this.nativeCb.el.checked,
      hasNativeControl: () => !!this.nativeCb.el,
      setNativeControlDisabled: (disabled: boolean) =>
        this.nativeCb.addProp('disabled', disabled),
      forceLayout: () => this.root.el && this.root.el.offsetWidth,
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
        ref={this.root.setEl}
        disabled={rest.disabled}
        {...this.root.props({})}
        onAnimationEnd={this.handleAnimationEnd}
      >
        <CheckboxNativeControl
          ref={this.nativeCb.setEl}
          id={labelId}
          {...this.nativeCb.props(rest)}
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

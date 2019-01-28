import * as RMWC from '@rmwc/types';
import * as React from 'react';
// @ts-ignore
import { MDCCheckboxFoundation } from '@material/checkbox';
import { componentFactory } from '@rmwc/base';
import { withRipple } from '@rmwc/ripple';
import {
  ToggleableFoundationComponent,
  ToggleableFoundationProps
} from '@rmwc/toggleable';

/**
 * This is an awful freaking bugfix
 * Basically, MDC decided that patching the native getter and setter
 * on a checkbox would be fun which consequently kills Reacts ability
 * to do the same.
 */
MDCCheckboxFoundation.prototype.installPropertyChangeHooks_ = () => {};

export interface CheckboxProps
  extends RMWC.WithRippleProps,
    ToggleableFoundationProps {
  /** Make the control indeterminate */
  indeterminate?: boolean;
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

/**
 * A Checkbox component
 */
export class Checkbox extends ToggleableFoundationComponent<CheckboxProps> {
  static displayName = 'Checkbox';

  private nativeCb = this.createElement<HTMLInputElement>('nativeCb');
  private root = this.createElement('root');

  constructor(props: CheckboxProps) {
    super(props);
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  sync(nextProps: CheckboxProps) {
    this.foundation.handleChange();

    if (
      this.nativeCb.ref &&
      nextProps.indeterminate !== this.nativeCb.ref.indeterminate
    ) {
      this.nativeCb.ref.indeterminate = !!nextProps.indeterminate;
    }
  }

  getDefaultFoundation() {
    return new MDCCheckboxFoundation({
      addClass: (className: string) => this.root.addClass(className),
      removeClass: (className: string) => this.root.removeClass(className),
      setNativeControlAttr: (attr: string, value: any) =>
        this.nativeCb.setProp(attr as any, value),
      removeNativeControlAttr: (attr: string) =>
        this.nativeCb.removeProp(attr as any),
      getNativeControl: () => this.nativeCb.ref,
      isIndeterminate: () => this.props.indeterminate,
      isChecked: () =>
        this.props.checked !== undefined
          ? this.props.checked
          : this.nativeCb.ref && this.nativeCb.ref.checked,
      hasNativeControl: () => !!this.nativeCb.ref,
      setNativeControlDisabled: (disabled: boolean) =>
        this.nativeCb.setProp('disabled', disabled),
      forceLayout: () => this.root.ref && this.root.ref.offsetWidth,
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
    const {
      children,
      className,
      label,
      style,
      indeterminate,
      ...rest
    } = this.props;

    const checkbox = (
      <CheckboxRoot
        {...this.toggleRootProps}
        ref={this.root.setRef}
        onAnimationEnd={this.handleAnimationEnd}
      >
        <CheckboxNativeControl
          {...this.nativeCb.props(rest)}
          ref={this.nativeCb.setRef}
          id={this.id}
          onChange={this.handleOnChange}
        />
        <CheckboxBackground />
      </CheckboxRoot>
    );

    return this.renderToggle(checkbox);
  }
}

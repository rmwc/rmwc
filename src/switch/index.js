// @flow
import type { SimpleTagPropsT } from '@rmwc/base';

import * as React from 'react';
import classNames from 'classnames';
import { MDCSwitchFoundation } from '@material/switch';
import { Component, FoundationComponent } from '@rmwc/base';
import { randomId } from '@rmwc/base/utils/randomId';
import { FormField } from '@rmwc/formfield';
import { withRipple } from '@rmwc/ripple';

export type SwitchPropsT = {
  /** A DOM ID for the toggle. */
  id?: string,
  /** Disables the control. */
  disabled?: boolean,
  /** Toggle the control on and off. */
  checked?: boolean | string,
  /** A label for the control. */
  label?: string,
  /** Props for the root element. By default, props spread to the input. */
  rootProps?: any,
  /** Any children to render. */
  children?: React.Node
} & SimpleTagPropsT &
  //$FlowFixMe
  React.InputHTMLAttributes<HTMLInputElement>;

export class SwitchRoot extends Component<SwitchPropsT> {
  static displayName = 'SwitchRoot';
  classNames = ['mdc-switch'];
}

class SwitchTrack extends React.Component<{}> {
  static displayName = 'SwitchTrack';

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div className="mdc-switch__track" />;
  }
}

class SwitchKnob extends React.Component<{}> {
  static displayName = 'SwitchKnob';

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div className="mdc-switch__knob" />;
  }
}

const SwitchThumbUnderlay = withRipple({ unbounded: true })(
  ({ className, ...rest }: { className: string }) => (
    <div
      className={classNames(className, 'mdc-switch__thumb-underlay')}
      {...rest}
    />
  )
);

export class Switch extends FoundationComponent<SwitchPropsT> {
  static displayName = 'Switch';
  changeHandler_: any;
  root_: HTMLElement | null;
  nativeControl_: HTMLInputElement | null;
  generatedId: string;

  constructor(props: SwitchPropsT) {
    super(props);
    this.generatedId = randomId('switch');
    this.createClassList('root_');
    this.createPropsList('nativeControl_');
  }

  componentDidMount() {
    super.componentDidMount();
    this.changeHandler_ = this.foundation_.handleChange.bind(this.foundation_);
    this.nativeControl_ &&
      this.nativeControl_.addEventListener('change', this.changeHandler_);
    this.nativeControl_ &&
      this.foundation_.updateCheckedStyling_(this.nativeControl_.checked);
    this.nativeControl_ &&
      this.foundation_.setDisabled(this.nativeControl_.disabled);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.nativeControl_ &&
      this.nativeControl_.removeEventListener('change', this.changeHandler_);
  }

  getDefaultFoundation() {
    return new MDCSwitchFoundation({
      addClass: className => this.classList.root_.add(className),
      removeClass: className => this.classList.root_.remove(className),
      setNativeControlChecked: checked =>
        this.propsList.nativeControl_.add('checked', checked),
      setNativeControlDisabled: disabled =>
        this.propsList.nativeControl_.add('disabled', disabled)
    });
  }

  sync(props: SwitchPropsT, prevProps?: SwitchPropsT) {
    if (
      props.checked !== undefined &&
      !!prevProps &&
      props.checked !== prevProps.checked
    ) {
      this.foundation_.updateCheckedStyling_(props.checked);
    }

    if (
      props.disabled !== undefined &&
      !!prevProps &&
      props.disabled !== prevProps.disabled
    ) {
      this.foundation_.setDisabled(props.disabled);
    }
  }

  render() {
    const {
      label = '',
      id,
      children,
      className,
      rootProps = {},
      ...rest
    } = this.props;

    const labelId = id || this.generatedId;
    const hasLabel = label.length || children;

    const switchTag = (
      <SwitchRoot
        {...(!hasLabel ? rootProps : {})}
        className={
          (classNames(hasLabel || [rootProps.className, className]),
          this.classList.root_.renderToString())
        }
        elementRef={el => (this.root_ = el)}
      >
        <SwitchTrack />
        <SwitchThumbUnderlay>
          <div className="mdc-switch__thumb">
            <input
              {...this.propsList.nativeControl_.all(rest)}
              id={labelId}
              ref={el => (this.nativeControl_ = el)}
              className="mdc-switch__native-control"
              type="checkbox"
            />
          </div>
        </SwitchThumbUnderlay>
        <SwitchKnob />
      </SwitchRoot>
    );

    /**
     * We have to conditionally wrap our checkbox in a formfield
     * If we have a label
     */
    if (hasLabel) {
      return (
        <FormField
          {...rootProps}
          className={classNames(rootProps.className, className)}
        >
          {switchTag}
          <label
            className="mdc-switch-label"
            id={labelId + 'label'}
            htmlFor={labelId}
          >
            {label}
            {children}
          </label>
        </FormField>
      );
    } else {
      return switchTag;
    }
  }
}

export default Switch;

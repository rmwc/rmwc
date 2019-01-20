import { ComponentProps } from '@rmwc/base';

import * as React from 'react';
// @ts-ignore
import { MDCSwitchFoundation } from '@material/switch';
import { componentFactory, FoundationComponent, classNames } from '@rmwc/base';
import { randomId } from '@rmwc/base/utils/randomId';
import { FormField } from '@rmwc/formfield';
import { withRipple } from '@rmwc/ripple';

export interface SwitchProps {
  /** A DOM ID for the toggle. */
  id?: string;
  /** Disables the control. */
  disabled?: boolean;
  /** Toggle the control on and off. */
  checked?: boolean | string;
  /** A label for the control. */
  label?: string;
  /** Props for the root element. By default, props spread to the input. */
  rootProps?: any;
  /** Any children to render. */
  children?: React.ReactNode;
}

export const SwitchRoot = componentFactory<SwitchProps>({
  displayName: 'SwitchRoot',
  classNames: ['mdc-switch']
});

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
  ({ className, ...rest }: { className?: string }) => (
    <div
      className={classNames(className, 'mdc-switch__thumb-underlay')}
      {...rest}
    />
  )
);

export class Switch extends FoundationComponent<SwitchProps> {
  static displayName = 'Switch';
  changeHandler_: any;
  root = this.createElement('root');
  nativeControl = this.createElement<HTMLInputElement>('nativeControl');
  generatedId = randomId('switch');

  constructor(props: SwitchProps & ComponentProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    super.componentDidMount();
    this.nativeControl.ref &&
      this.foundation.updateCheckedStyling_(this.nativeControl.ref.checked);
    this.nativeControl.ref &&
      this.foundation.setDisabled(this.nativeControl.ref.disabled);
  }

  getDefaultFoundation() {
    return new MDCSwitchFoundation({
      addClass: (className: string) => this.root.addClass(className),
      removeClass: (className: string) => this.root.removeClass(className),
      setNativeControlChecked: (checked: boolean) =>
        this.nativeControl.addProp('checked', checked),
      setNativeControlDisabled: (disabled: boolean) =>
        this.nativeControl.addProp('disabled', disabled)
    });
  }

  handleChange(evt: any) {
    this.foundation.handleChange(evt);
    this.props.onChange && this.props.onChange(evt);
  }

  sync(props: SwitchProps, prevProps?: SwitchProps) {
    if (
      props.checked !== undefined &&
      !!prevProps &&
      props.checked !== prevProps.checked
    ) {
      this.foundation.updateCheckedStyling_(props.checked);
    }

    if (
      props.disabled !== undefined &&
      !!prevProps &&
      props.disabled !== prevProps.disabled
    ) {
      this.foundation.setDisabled(props.disabled);
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
        {...this.root.props({
          ...(!hasLabel ? rootProps : {}),
          className: classNames(hasLabel || [rootProps.className, className])
        })}
      >
        <SwitchTrack />
        <SwitchThumbUnderlay>
          <div className="mdc-switch__thumb">
            <input
              {...this.nativeControl.props({
                ...rest,
                className: 'mdc-switch__native-control'
              })}
              onChange={this.handleChange}
              id={labelId}
              ref={this.nativeControl.setRef}
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
          {switchTag}&nbsp;
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

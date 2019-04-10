import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { MDCSwitchFoundation } from '@material/switch';
import { componentFactory, classNames } from '@rmwc/base';
import { withRipple } from '@rmwc/ripple';
import {
  ToggleableFoundationComponent,
  ToggleableFoundationProps
} from '@rmwc/toggleable';

/** A Switch component. */
export interface SwitchProps
  extends RMWC.WithRippleProps,
    ToggleableFoundationProps {}

const SwitchRoot = componentFactory<SwitchProps>({
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

const SwitchThumbUnderlay = withRipple({ unbounded: true, surface: false })(
  ({ className, ...rest }: { className?: string }) => (
    <div
      className={classNames(className, 'mdc-switch__thumb-underlay')}
      {...rest}
    />
  )
);

const SwitchNativeControl = componentFactory<{}>({
  displayName: 'SwitchNativeControl',
  defaultProps: {
    type: 'checkbox'
  },
  tag: 'input',
  classNames: ['mdc-switch__native-control']
});

/** A Switch component. */
export class Switch extends ToggleableFoundationComponent<
  MDCSwitchFoundation,
  SwitchProps
> {
  static displayName = 'Switch';
  private root = this.createElement('root');
  private nativeControl = this.createElement<HTMLInputElement>('nativeControl');

  constructor(props: SwitchProps & RMWC.ComponentProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    super.componentDidMount();
    this.nativeControl.ref &&
      (this.foundation as any).updateCheckedStyling_(
        this.nativeControl.ref.checked
      );
    this.nativeControl.ref &&
      this.foundation.setDisabled(this.nativeControl.ref.disabled);
  }

  getDefaultFoundation() {
    return new MDCSwitchFoundation({
      addClass: (className: string) => this.root.addClass(className),
      removeClass: (className: string) => this.root.removeClass(className),
      setNativeControlChecked: (checked: boolean) =>
        this.nativeControl.setProp('checked', checked),
      setNativeControlDisabled: (disabled: boolean) =>
        this.nativeControl.setProp('disabled', disabled)
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
      (this.foundation as any).updateCheckedStyling_(props.checked);
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
    const { children, className, label, style, inputRef, ...rest } = this.props;

    const switchTag = (
      <SwitchRoot {...this.toggleRootProps}>
        <SwitchTrack />
        <SwitchThumbUnderlay>
          <div className="mdc-switch__thumb">
            <SwitchNativeControl
              {...rest}
              onChange={this.handleChange}
              id={this.id}
              ref={(el: HTMLInputElement | null) => {
                this.nativeControl.setRef(el);
                inputRef && inputRef(el);
              }}
            />
          </div>
        </SwitchThumbUnderlay>
        <SwitchKnob />
      </SwitchRoot>
    );

    return this.renderToggle(switchTag);
  }
}

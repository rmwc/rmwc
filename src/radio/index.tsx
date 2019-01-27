import * as React from 'react';
// @ts-ignore
import { MDCRadioFoundation } from '@material/radio';
import { componentFactory } from '@rmwc/base';
import { withRipple, WithRippleProps } from '@rmwc/ripple';
import {
  ToggleableFoundationComponent,
  ToggleableFoundationProps
} from '@rmwc/toggleable';

export interface RadioProps
  extends WithRippleProps,
    ToggleableFoundationProps {}

const RadioRoot = withRipple({ unbounded: true, accent: true })(
  componentFactory<RadioProps>({
    displayName: 'RadioRoot',
    classNames: (props: RadioProps) => [
      'mdc-radio',
      { 'mdc-radio--disabled': props.disabled }
    ]
  })
);

const RadioNativeControl = componentFactory<{}>({
  displayName: 'RadioNativeControl',
  defaultProps: {
    type: 'radio'
  },
  tag: 'input',
  classNames: ['mdc-radio__native-control']
});

class RadioBackground extends React.Component<{}> {
  static displayName = 'RadioBackground';

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="mdc-radio__background">
        <div className="mdc-radio__outer-circle" />
        <div className="mdc-radio__inner-circle" />
      </div>
    );
  }
}

/** A Radio button component. */
export class Radio extends ToggleableFoundationComponent<RadioProps> {
  static displayName = 'Radio';
  root = this.createElement('root');

  getDefaultFoundation() {
    return new MDCRadioFoundation({
      addClass: (className: string) => this.root.addClass(className),
      removeClass: (className: string) => this.root.removeClass(className)
    });
  }

  render() {
    const { children, className, label, style, ...rest } = this.props;

    const radio = (
      <RadioRoot {...this.toggleRootProps} ref={this.root.setRef}>
        <RadioNativeControl {...rest} id={this.id} />
        <RadioBackground />
      </RadioRoot>
    );

    return this.renderToggle(radio);
  }
}

export default Radio;

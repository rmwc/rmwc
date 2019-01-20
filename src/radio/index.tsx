import * as React from 'react';
// @ts-ignore
import { MDCRadioFoundation } from '@material/radio';
import { FormField } from '@rmwc/formfield';
import {
  componentFactory,
  FoundationComponent,
  ComponentProps
} from '@rmwc/base';
import { randomId } from '@rmwc/base/utils/randomId';
import { withRipple } from '@rmwc/ripple';

export interface RadioProps {
  /** A DOM ID for the toggle. */
  id?: string;
  /** Disables the control. */
  disabled?: boolean;
  /** Toggle the control on and off. */
  checked?: boolean | string;
  /** The value of the control. */
  value?: boolean | string | number;
  /** A label for the control. */
  label?: string;
  /** Children to render */
  children?: React.ReactNode;
}

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

const RadioLabel: React.ComponentType<any> = ({ ...rest }) => (
  <label {...rest} />
);
RadioLabel.displayName = 'RadioLabel';

/** A Radio button component. */
export class Radio extends FoundationComponent<RadioProps> {
  static displayName = 'Radio';
  root = this.createElement('root');
  generatedId = randomId('radio');

  getDefaultFoundation() {
    return new MDCRadioFoundation({
      addClass: (className: string) => this.root.addClass(className),
      removeClass: (className: string) => this.root.removeClass(className)
    });
  }

  render() {
    const { label = '', id, children, ...rest } = this.props;
    const labelId = id || this.generatedId;

    const radio = (
      <RadioRoot
        {...this.root.props({})}
        ref={this.root.setRef}
        disabled={rest.disabled}
      >
        <RadioNativeControl id={labelId} {...rest} />
        <RadioBackground />
      </RadioRoot>
    );

    /**
     * We have to conditionally wrap our radio in a FormField
     * If we have a label
     */
    if (label.length || children) {
      return (
        <FormField>
          {radio}
          <RadioLabel id={labelId + 'label'} htmlFor={labelId}>
            {label}
            {children}
          </RadioLabel>
        </FormField>
      );
    } else {
      return radio;
    }
  }
}

export default Radio;

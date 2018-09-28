// @flow
import * as React from 'react';
import { MDCRadioFoundation } from '@material/radio/dist/mdc.radio';
import FormField from '@rmwc/formfield';
import { Component, FoundationComponent } from '@rmwc/base';
import { randomId } from '@rmwc/base/utils/randomId';

export type RadioPropsT = {
  /** A DOM ID for the toggle. */
  id?: string,
  /** Disables the control. */
  disabled?: boolean,
  /** Toggle the control on and off. */
  checked?: boolean | string,
  /** The value of the control. */
  value?: boolean | string | number,
  /** A label for the control. */
  label?: string,
  /** Children to render */
  children?: React.Node
  //$FlowFixMe
} & React.InputHTMLAttributes<HTMLInputElement>;

export class RadioRoot extends Component<RadioPropsT> {
  static displayName = 'RadioRoot';
  classNames = (props: RadioPropsT) => [
    'mdc-radio',
    { 'mdc-radio--disabled': props.disabled }
  ];
}

export class RadioNativeControl extends Component<{}> {
  static displayName = 'RadioNativeControl';
  static defaultProps = {
    type: 'radio'
  };
  tag = 'input';
  classNames = ['mdc-radio__native-control'];
}

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

export const RadioLabel: React.ComponentType<any> = ({ ...rest }) => (
  <label {...rest} />
);
RadioLabel.displayName = 'RadioLabel';

export class Radio extends FoundationComponent<RadioPropsT> {
  static displayName = 'Radio';
  nativeRadio_: ?HTMLInputElement;
  root_: ?HTMLElement;

  generatedId: string;

  constructor(props: RadioPropsT) {
    super(props);
    this.generatedId = randomId('radio');
    this.createClassList('root_');
  }

  getDefaultFoundation() {
    return new MDCRadioFoundation({
      addClass: className => this.classList.root_.add(className),
      removeClass: className => this.classList.root_.remove(className),
      getNativeControl: () => this.nativeRadio_
    });
  }

  render() {
    const { label = '', id, children, apiRef, ...rest } = this.props;
    const labelId = id || this.generatedId;

    const radio = (
      <RadioRoot
        elementRef={ref => (this.root_ = ref)}
        disabled={rest.disabled}
        className={this.classList.root_.renderToString()}
      >
        <RadioNativeControl
          elementRef={ref => (this.nativeRadio_ = ref)}
          id={labelId}
          {...rest}
        />
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

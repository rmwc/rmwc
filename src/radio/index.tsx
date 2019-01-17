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

export type RadioPropsT = {
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
} & ComponentProps;

const RadioRoot = withRipple({ unbounded: true, accent: true })(
  componentFactory<RadioPropsT>({
    displayName: 'RadioRoot',
    classNames: (props: RadioPropsT) => [
      'mdc-radio',
      { 'mdc-radio--disabled': props.disabled }
    ]
  })
);

const RadioNativeControl = componentFactory({
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
export class Radio extends FoundationComponent<RadioPropsT> {
  static displayName = 'Radio';
  nativeRadio_: null | HTMLInputElement = null;
  root_: null | HTMLElement = null;

  generatedId: string;

  constructor(props: RadioPropsT) {
    super(props);
    this.generatedId = randomId('radio');
    this.createClassList('root_');
  }

  getDefaultFoundation() {
    return new MDCRadioFoundation({
      addClass: (className: string) => this.classList.root_.add(className),
      removeClass: (className: string) => this.classList.root_.remove(className)
    });
  }

  render() {
    const { label = '', id, children, ...rest } = this.props;
    const labelId = id || this.generatedId;

    const radio = (
      <RadioRoot
        ref={(ref: HTMLElement) => (this.root_ = ref)}
        disabled={rest.disabled}
        className={this.classList.root_.renderToString()}
      >
        <RadioNativeControl
          ref={ref => (this.nativeRadio_ = ref)}
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

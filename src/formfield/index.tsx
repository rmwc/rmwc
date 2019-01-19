import { FoundationComponent } from '@rmwc/base';

import * as React from 'react';
//@ts-ignore
import { MDCFormFieldFoundation } from '@material/form-field';
import { componentFactory } from '@rmwc/base';

export interface FormFieldProps {
  /** Position the input after the label. */
  alignEnd?: boolean;
}

export const FormFieldRoot = componentFactory<FormFieldProps>({
  displayName: 'FormFieldRoot',
  defaultProps: {
    alignEnd: undefined
  },
  classNames: (props: FormFieldProps) => [
    'mdc-form-field',
    {
      'mdc-form-field--align-end': props.alignEnd
    }
  ],
  consumeProps: ['alignEnd']
});

export class FormField extends FoundationComponent<FormFieldProps> {
  static displayName = 'FormField';

  getDefaultFoundation() {
    // For RMWC, the entire foundation is a noop. Interactions and ripples are controlled
    // on the components themselves
    return new MDCFormFieldFoundation({
      registerInteractionHandler: (type: string, handler: () => void) => {},
      deregisterInteractionHandler: (type: string, handler: () => void) => {},
      activateInputRipple: () => {},
      deactivateInputRipple: () => {}
    });
  }

  render() {
    return <FormFieldRoot {...this.props} />;
  }
}

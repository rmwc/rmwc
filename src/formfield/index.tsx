import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { EventType, SpecificEventListener } from '@material/base/types';
import { MDCFormFieldFoundation } from '@material/form-field';

import { FoundationComponent } from '@rmwc/base';
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

export class FormField extends FoundationComponent<
  MDCFormFieldFoundation,
  FormFieldProps
> {
  static displayName = 'FormField';

  getDefaultFoundation() {
    // For RMWC, the entire foundation is a noop. Interactions and ripples are controlled
    // on the components themselves
    return new MDCFormFieldFoundation({
      registerInteractionHandler: <K extends EventType>(
        evtType: K,
        handler: SpecificEventListener<K>
      ): void => {},
      deregisterInteractionHandler: <K extends EventType>(
        evtType: K,
        handler: SpecificEventListener<K>
      ): void => {},
      activateInputRipple: () => {},
      deactivateInputRipple: () => {}
    });
  }

  render() {
    return <FormFieldRoot {...this.props} />;
  }
}

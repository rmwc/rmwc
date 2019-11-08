import { FormFieldProps } from '.';
import { useFoundation } from '@rmwc/base';
import { EventType, SpecificEventListener } from '@material/base/types';
import { MDCFormFieldFoundation } from '@material/form-field';

export const useFormfieldFoundation = (
  props: FormFieldProps & React.HTMLProps<any>
) => {
  useFoundation({
    props,
    elements: {},
    foundation: () =>
      // For RMWC, the entire foundation is a noop. Interactions and ripples are controlled
      // on the components themselves
      new MDCFormFieldFoundation({
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
      })
  });
};

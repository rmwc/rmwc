import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { Tag, useClassNames } from '@rmwc/base';
import { useFormfieldFoundation } from './foundation';

/** A FormField component. */
export interface FormFieldProps {
  /** Position the input after the label. */
  alignEnd?: boolean;
}

/** A FormField component. */
export const FormField = React.forwardRef<
  any,
  FormFieldProps & RMWC.ComponentProps
>(function FormField(props, ref) {
  useFormfieldFoundation(props);

  const { alignEnd, ...rest } = props;
  const className = useClassNames(props, [
    'mdc-form-field',
    {
      'mdc-form-field--align-end': props.alignEnd
    }
  ]);
  return <Tag ref={ref} {...rest} className={className} />;
});

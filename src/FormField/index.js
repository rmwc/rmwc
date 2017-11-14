// @flow
import * as React from 'react';
import { MDCFormField } from '@material/form-field/dist/mdc.formField';
import { simpleTag, withMDC } from '../Base';

export const FormFieldRoot = simpleTag({
  displayName: 'FormFieldRoot',
  classNames: 'mdc-form-field'
});

export const FormField = withMDC({
  mdcConstructor: MDCFormField,
  mdcElementRef: true
})(({ mdcElementRef, ...rest }) => (
  <FormFieldRoot elementRef={mdcElementRef} {...rest} />
));

export default FormField;

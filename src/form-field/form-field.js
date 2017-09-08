import React from 'react';
import ReactDOM from 'react-dom';
import { formField as mdcFormField } from 'material-components-web';

const { MDCFormField } = mdcFormField;

import { simpleComponentFactory } from '../_base/simple-component-factory';
import MDCComponentBase from '../_base/mdc-component-base';

export const FormFieldRoot = simpleComponentFactory('FormFieldRoot', {
	classNames: 'mdc-form-field'
});

export class FormField extends MDCComponentBase {
	static MDCComponentClass = MDCFormField;

	static propTypes = {
		...MDCComponentBase.propTypes,
		...FormFieldRoot.propTypes
	}

	static defaultProps = {
		...MDCComponentBase.defaultProps,
		...FormFieldRoot.defaultProps
	}

	static propMeta = {
		...MDCComponentBase.propMeta,
		...FormFieldRoot.propMeta
	}

	render() {
		const { apiRef, ...rest } = this.props;
		return (
			<FormFieldRoot elementRef={el => this.MDCSetRootElement(el)} {...rest}/>
		);
	}
}

export default FormField;
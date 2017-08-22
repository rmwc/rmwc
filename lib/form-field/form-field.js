import React from 'react';
import ReactDOM from 'react-dom';
import { MDCFormField } from '@material/form-field';

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
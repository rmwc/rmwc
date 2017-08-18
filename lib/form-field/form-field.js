import React from 'react';
import ReactDOM from 'react-dom';
import { MDCFormField } from '@material/form-field';

import simpleComponentFactory from '../_base/simple-component-factory';
import MDCComponentBase from '../_base/mdc-component-base';

export const FormFieldEl = simpleComponentFactory('FormFieldEl', 'div', {className: 'mdc-form-field'});

export class FormField extends MDCComponentBase {
	static MDCComponentClass = MDCFormField;

	static propTypes = {
		...FormFieldEl.propTypes,
		...MDCComponentBase.propTypes
	}

	static defaultProps = {
		...FormFieldEl.defaultProps,
		...MDCComponentBase.defaultProps
	}

	render() {
		const { apiRef, children, ...rest } = this.props;

		return (
			<FormFieldEl {...rest}>{children}</FormFieldEl>
		);
	}
}

export default FormField;
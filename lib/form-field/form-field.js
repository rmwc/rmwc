import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { MDCFormField } from '@material/form-field';

import simpleComponentFactory from '../_base/simple-component-factory';
import MDCComponentBase from '../_base/mdc-component-base';
const FormFieldBase = simpleComponentFactory('FormFieldBase', 'div', {className: 'mdc-form-field'});

export class FormField extends MDCComponentBase {
	static MDCComponentClass = MDCFormField;

	static propTypes = {
		...MDCComponentBase.propTypes
	}

	static defaultProps = {
		...MDCComponentBase.defaultProps
	}

	render() {
		const { apiRef, children, ...rest } = this.props;

		return (
			<FormFieldBase {...rest}>{children}</FormFieldBase>
		);
	}
}

export default FormField;
import React from 'react';
import ReactDOM from 'react-dom';
import { MDCFormField } from '@material/form-field';

import simpleComponentFactory from '../_base/simple-component-factory';
import MDCComponentBase from '../_base/mdc-component-base';

export const FormFieldRoot = simpleComponentFactory('FormFieldRoot', 'div', {className: 'mdc-form-field'});

export class FormField extends MDCComponentBase {
	static MDCComponentClass = MDCFormField;

	static propTypes = {
		...FormFieldRoot.propTypes,
		...MDCComponentBase.propTypes
	}

	static defaultProps = {
		...FormFieldRoot.defaultProps,
		...MDCComponentBase.defaultProps
	}

	render() {
		const { apiRef, ...rest } = this.props;
		// BUG, elementRef was returning undefined for this element only when using simpleComponentFactory :(
		// <div className='mdc-form-field' ref={el => this.MDCSetRootElement(el)} {...rest}/>
		// <FormFieldRoot elementRef={el => this.MDCSetRootElement(el)} {...rest}/>
		return (
			<FormFieldRoot elementRef={el => this.MDCSetRootElement(el)} {...rest}/>
		);
	}
}

export default FormField;
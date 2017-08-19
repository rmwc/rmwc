import React from 'react';
import { MDCRadio } from '@material/radio';
import ToggleBase from '../_base/toggle-component-base';
import FormField from '../form-field/form-field';
import classNames from 'classnames';
import simpleComponentFactory from '../_base/simple-component-factory';

export const RadioRoot = simpleComponentFactory(
	'RadioRoot', 'div',
	{className: 'mdc-radio'}
);

export const RadioNativeControl = simpleComponentFactory(
	'RadioNativeControl', 'input',
	{
		className: 'mdc-radio__native-control',
		type: 'radio'
	}
);

export const RadioBackground = simpleComponentFactory(
	'RadioBackground', 'div',
	{className: 'mdc-radio__background'}
);

export const RadioOuterCircle = simpleComponentFactory(
	'RadioOuterCircle', 'div',
	{className: 'mdc-radio__outer-circle'}
);

export const RadioInnerCircle = simpleComponentFactory(
	'RadioInnerCircle', 'div',
	{className: 'mdc-radio__inner-circle'}
);

export const RadioLabel = simpleComponentFactory(
	'RadioLabel', 'label'
);

export class Radio extends ToggleBase {
	static MDCComponentClass = MDCRadio;

	render() {
		const { label, id, children, apiRef, ...rest } = this.props;
		const labelId = id || this.generatedId;

		const radio = (
			<RadioRoot elementRef={el => this.MDCSetRootElement(el)} className={classNames({'mdc-radio--disabled': rest.disabled})}>
				<RadioNativeControl id={labelId} {...rest} />
				<RadioBackground>
					<RadioOuterCircle/>
					<RadioInnerCircle/>
				</RadioBackground>
			</RadioRoot>
		);

		/**
		 * We have to conditionally wrap our radio in a FormField
		 * If we have a label
		 */
		if (label.length || children) {
			return (
				<FormField>
					{ radio }
					<RadioLabel id={labelId + 'label'} htmlFor={labelId}>
						{ label }{ children }
					</RadioLabel>
				</FormField>
			);
		} else {
			return radio;
		}
	}
}

export default Radio;
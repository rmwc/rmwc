import React from 'react';
import { MDCRadio } from '@material/radio';
import ToggleBase from '../_base/toggle-component-base';
import FormField from '../form-field/form-field';
import classNames from 'classnames';
import simpleComponentFactory from '../_base/simple-component-factory';

export const RadioEl = simpleComponentFactory(
	'RadioEl', 'div',
	{className: 'mdc-radio'}
);

export const RadioNativeControlEl = simpleComponentFactory(
	'RadioNativeControlEl', 'input',
	{
		className: 'mdc-radio__native-control',
		type: 'radio'
	}
);

export const RadioBackgroundEl = simpleComponentFactory(
	'RadioBackgroundEl', 'div',
	{className: 'mdc-radio__background'}
);

export const RadioOuterCircleEl = simpleComponentFactory(
	'RadioOuterCircleEl', 'div',
	{className: 'mdc-radio__outer-circle'}
);

export const RadioInnerCircleEl = simpleComponentFactory(
	'RadioInnerCircleEl', 'div',
	{className: 'mdc-radio__inner-circle'}
);

export const RadioLabelEl = simpleComponentFactory(
	'RadioLabelEl', 'label'
);

export class Radio extends ToggleBase {
	static MDCComponentClass = MDCRadio;

	render() {
		const { label, id, children, apiRef, ...rest } = this.props;
		const labelId = id || this.generatedId;

		const radio = (
			<RadioEl elementRef={el => (this.toggleEl = el)} className={classNames({'mdc-radio--disabled': rest.disabled})}>
				<RadioNativeControlEl id={labelId} {...rest} />
				<RadioBackgroundEl>
					<RadioOuterCircleEl/>
					<RadioInnerCircleEl/>
				</RadioBackgroundEl>
			</RadioEl>
		);

		/**
		 * We have to conditionally wrap our radio in a FormField
		 * If we have a label
		 */
		if (label.length || children) {
			return (
				<FormField>
					{ radio }
					<RadioLabelEl id={labelId + 'label'} htmlFor={labelId}>
						{ label }{ children }
					</RadioLabelEl>
				</FormField>
			);
		} else {
			return radio;
		}
	}
}

export default Radio;
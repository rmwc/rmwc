import React from 'react';
import classNames from 'classnames';
import { MDCCheckbox } from '@material/checkbox';

import ToggleBase from '../_base/toggle-component-base';
import FormField from '../form-field/form-field';
import simpleComponentFactory from '../_base/simple-component-factory';

export const CheckboxEl = simpleComponentFactory(
	'CheckboxEl', 'div',
	{className: 'mdc-checkbox'}
);

export const CheckboxNativeControlEl = simpleComponentFactory(
	'CheckboxNativeControlEl', 'input',
	{
		className: 'mdc-checkbox__native-control',
		type: 'checkbox'
	}
);

export const CheckboxBackgroundEl = simpleComponentFactory(
	'CheckboxBackgroundEl', 'div',
	{className: 'mdc-checkbox__background'}
);

export const CheckboxCheckmarkEl = simpleComponentFactory(
	'CheckboxCheckmarkEl', 'svg',
	{
		className: 'mdc-checkbox__checkmark',
		viewBox: '0 0 24 24'
	}
);

export const CheckboxCheckmarkPathEl = simpleComponentFactory(
	'CheckboxCheckmarkPathEl', 'path',
	{
		className: 'mdc-checkbox__checkmark__path',
		fill: 'none',
		stroke: 'white',
		d: 'M1.73,12.91 8.1,19.28 22.79,4.59'
	}
);

export const CheckboxMixedmarkEl = simpleComponentFactory(
	'CheckboxMixedmarkEl', 'div',
	{className: 'mdc-checkbox__mixedmark'}
);

export const CheckboxLabelEl = simpleComponentFactory(
	'CheckboxLabelEl', 'label'
);

export class Checkbox extends ToggleBase {
	static MDCComponentClass = MDCCheckbox;

	render() {
		const { label, id, children, checked, apiRef, ...rest } = this.props;
		const labelId = id || this.generatedId;
		const checkedProp = checked !== undefined ? {checked} : {};

		const checkbox = (
			<CheckboxEl
				elementRef={el => (this.toggleEl = el)}
				className={classNames({'mdc-checkbox--disabled': rest.disabled})}
			>
				<CheckboxNativeControlEl
					id={labelId}
					{...checkedProp}
					{...rest}/>
				<CheckboxBackgroundEl>
					<CheckboxCheckmarkEl>
						<CheckboxCheckmarkPathEl/>
					</CheckboxCheckmarkEl>
					<CheckboxMixedmarkEl/>
				</CheckboxBackgroundEl>
			</CheckboxEl>
		);

		/**
		 * We have to conditionally wrap our checkbox in a formfield
		 * If we have a label
		 */
		if (label.length || children) {
			return (
				<FormField>
					{ checkbox }
					<CheckboxLabelEl id={labelId + 'label'} htmlFor={labelId}>
						{ label }{ children }
					</CheckboxLabelEl>
				</FormField>
			);
		} else {
			return checkbox;
		}
	}
}

export default Checkbox;
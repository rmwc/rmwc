import React from 'react';
import classNames from 'classnames';
import { checkbox as mdcCheckbox } from 'material-components-web';
import ToggleBase from '../_base/toggle-component-base';
import FormField from '../form-field/form-field';
import { simpleComponentFactory } from '../_base/simple-component-factory';

const { MDCCheckbox } = mdcCheckbox;

export const CheckboxRoot = simpleComponentFactory('CheckboxRoot', {
	classNames: 'mdc-checkbox'
});

export const CheckboxNativeControl = simpleComponentFactory(
	'CheckboxNativeControl',
	{
		tag: 'input',
		classNames: 'mdc-checkbox__native-control',
		defaultProps: {
			type: 'checkbox'
		}
	}
);

export const CheckboxBackground = simpleComponentFactory('CheckboxBackground', {
	classNames: 'mdc-checkbox__background'
});

export const CheckboxCheckmark = simpleComponentFactory('CheckboxCheckmark', {
	tag: 'svg',
	classNames: 'mdc-checkbox__checkmark',
	defaultProps: {
		viewBox: '0 0 24 24'
	}
});

export const CheckboxCheckmarkPath = simpleComponentFactory(
	'CheckboxCheckmarkPath',
	{
		tag: 'path',
		classNames: 'mdc-checkbox__checkmark__path',
		defaultProps: {
			fill: 'none',
			stroke: 'white',
			d: 'M1.73,12.91 8.1,19.28 22.79,4.59'
		}
	}
);

export const CheckboxMixedmark = simpleComponentFactory('CheckboxMixedmark', {
	classNames: 'mdc-checkbox__mixedmark'
});

export const CheckboxLabel = simpleComponentFactory('CheckboxLabel', {
	tag: 'label'
});

export class Checkbox extends ToggleBase {
	static MDCComponentClass = MDCCheckbox;

	render() {
		const {
			label = '',
			id,
			children,
			checked,
			apiRef,
			indeterminate,
			...rest
		} = this.props;
		const labelId = id || this.generatedId;
		const checkedProp = checked !== undefined ? { checked } : {};
		const classes = classNames({ 'mdc-checkbox--disabled': rest.disabled });

		const checkbox = (
			<CheckboxRoot
				elementRef={el => this.MDCSetRootElement(el)}
				className={classes}
			>
				<CheckboxNativeControl id={labelId} {...checkedProp} {...rest} />
				<CheckboxBackground>
					<CheckboxCheckmark>
						<CheckboxCheckmarkPath />
					</CheckboxCheckmark>
					<CheckboxMixedmark />
				</CheckboxBackground>
			</CheckboxRoot>
		);

		/**
		 * We have to conditionally wrap our checkbox in a formfield
		 * If we have a label
		 */
		if (label.length || children) {
			return (
				<FormField>
					{checkbox}
					<CheckboxLabel id={labelId + 'label'} htmlFor={labelId}>
						{label}
						{children}
					</CheckboxLabel>
				</FormField>
			);
		} else {
			return checkbox;
		}
	}
}

export default Checkbox;

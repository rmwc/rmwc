import React from 'react';
import { MDCRadio } from '@material/radio/dist/mdc.radio';
import ToggleBase from '../Base/toggle-component-base';
import FormField from '../FormField';
import classNames from 'classnames';
import { simpleComponentFactory } from '../Base/simple-component-factory';

export const RadioRoot = simpleComponentFactory('RadioRoot', {
	classNames: 'mdc-radio'
});

export const RadioNativeControl = simpleComponentFactory('RadioNativeControl', {
	tag: 'input',
	classNames: 'mdc-radio__native-control',
	defaultProps: {
		type: 'radio'
	}
});

export const RadioBackground = simpleComponentFactory('RadioBackground', {
	classNames: 'mdc-radio__background'
});

export const RadioOuterCircle = simpleComponentFactory('RadioOuterCircle', {
	classNames: 'mdc-radio__outer-circle'
});

export const RadioInnerCircle = simpleComponentFactory('RadioInnerCircle', {
	classNames: 'mdc-radio__inner-circle'
});

export const RadioLabel = simpleComponentFactory('RadioLabel', {
	tag: 'label'
});

export class Radio extends ToggleBase {
	static MDCComponentClass = MDCRadio;

	render() {
		const { label = '', id, children, apiRef, ...rest } = this.props;
		const labelId = id || this.generatedId;

		const radio = (
			<RadioRoot
				elementRef={el => this.MDCSetRootElement(el)}
				className={classNames({ 'mdc-radio--disabled': rest.disabled })}
			>
				<RadioNativeControl id={labelId} {...rest} />
				<RadioBackground>
					<RadioOuterCircle />
					<RadioInnerCircle />
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
					{radio}
					<RadioLabel id={labelId + 'label'} htmlFor={labelId}>
						{label}
						{children}
					</RadioLabel>
				</FormField>
			);
		} else {
			return radio;
		}
	}
}

export default Radio;

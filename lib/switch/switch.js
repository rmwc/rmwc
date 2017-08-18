import React from 'react';
import ToggleBase from '../_base/toggle-component-base';
import FormField from '../form-field/form-field';
import classNames from 'classnames';

import simpleComponentFactory from '../_base/simple-component-factory';

export const SwitchEl = simpleComponentFactory(
	'SwitchEl', 'div',
	{className: 'mdc-switch'}
);

export const SwitchNativeControlEl = simpleComponentFactory(
	'SwitchNativeControlEl', 'input',
	{
		className: 'mdc-switch__native-control',
		type: 'checkbox'
	}
);

export const SwitchBackgroundEl = simpleComponentFactory(
	'SwitchBackgroundEl', 'div',
	{className: 'mdc-switch__background'}
);

export const SwitchKnobEl = simpleComponentFactory(
	'SwitchKnobEl', 'div',
	{className: 'mdc-switch__knob'}
);

export const SwitchLabelEl = simpleComponentFactory(
	'SwitchLabelEl', 'label'
);

export class Switch extends ToggleBase {
	render() {
		const { label, id, children, apiRef, ...rest } = this.props;
		const labelId = id || this.generatedId;

		const radio = (
			<SwitchEl className={classNames({'mdc-switch--disabled': rest.disabled})}>
				<SwitchNativeControlEl id={labelId} />
				<SwitchBackgroundEl>
					<SwitchKnobEl/>
				</SwitchBackgroundEl>
			</SwitchEl>
		);

		/**
		 * We have to conditionally wrap our checkbox in a formfield
		 * If we have a label
		 */
		if (label.length || children) {
			return (
				<FormField>
					{ radio }
					<SwitchLabelEl id={labelId + 'label'} htmlFor={labelId}>
						{ label }{ children }
					</SwitchLabelEl>
				</FormField>
			);
		} else {
			return radio;
		}
	}
}

export default Switch;
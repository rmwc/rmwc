import React from 'react';
import ToggleBase from '../_base/toggle-base';
import FormField from '../form-field/form-field';
import classNames from 'classnames';

export class Switch extends ToggleBase {
	render() {
		const { label, id, children, ...rest } = this.props;
		const labelId = id || this.generatedId;

		const radio = (
			<div className={classNames('mdc-switch', {'mdc-switch--disabled': rest.disabled})}>
				<input type="checkbox" id={labelId} className="mdc-switch__native-control" {...rest} />
				<div className="mdc-switch__background">
					<div className="mdc-switch__knob"></div>
				</div>
			</div>
		);

		/**
		 * We have to conditionally wrap our checkbox in a formfield
		 * If we have a label
		 */
		if (label.length || children) {
			return (
				<FormField>
					{ radio }
					<label id={labelId + 'label'} htmlFor={labelId}>
						{ label }{ children }
					</label>
				</FormField>
			);
		} else {
			return radio;
		}
	}
}

export default Switch;
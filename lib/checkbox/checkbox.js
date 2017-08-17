import React from 'react';
import { MDCCheckbox } from '@material/checkbox';
import ToggleBase from '../_base/toggle-base';
import FormField from '../form-field/form-field';
import classNames from 'classnames';

export class Checkbox extends ToggleBase {
	static ComponentConstructor = MDCCheckbox;

	render() {
		const { label, id, children, checked, apiRef, ...rest } = this.props;
		const labelId = id || this.generatedId;
		const checkedProp = checked !== undefined ? {checked} : {};

		const checkbox = (
			<div ref={el => (this.el = el)} className={classNames('mdc-checkbox', {'mdc-checkbox--disabled': rest.disabled})}>
				<input
					className="mdc-checkbox__native-control"
					type="checkbox"
					id={labelId}
					{...checkedProp}
					{...rest}/>
				<div className="mdc-checkbox__background">
					<svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
						<path className="mdc-checkbox__checkmark__path"
							fill="none"
							stroke="white"
							d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
					</svg>
					<div className="mdc-checkbox__mixedmark"></div>
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
					{ checkbox }
					<label id={labelId + 'label'} htmlFor={labelId}>
						{ label }{ children }
					</label>
				</FormField>
			);
		} else {
			return checkbox;
		}
	}
}

export default Checkbox;
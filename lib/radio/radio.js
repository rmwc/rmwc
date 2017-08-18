import React from 'react';
import { MDCRadio } from '@material/radio';
import ToggleBase from '../_base/toggle-component-base';
import FormField from '../form-field/form-field';
import classNames from 'classnames';

export class Radio extends ToggleBase {
	static ComponentConstructor = MDCRadio;

	render() {
		const { label, id, children, apiRef, ...rest } = this.props;
		const labelId = id || this.generatedId;

		const radio = (
			<div ref={el => (this.el = el)} className={classNames('mdc-radio', {'mdc-radio--disabled': rest.disabled})}>
				<input className="mdc-radio__native-control" type="radio" id={labelId} {...rest}/>
				<div className="mdc-radio__background">
					<div className="mdc-radio__outer-circle"></div>
					<div className="mdc-radio__inner-circle"></div>
				</div>
			</div>
		);

		/**
		 * We have to conditionally wrap our radio in a FormField
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

export default Radio;
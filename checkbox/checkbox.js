import React from 'react';
import { MDCCheckbox } from '@material/checkbox';
import ToggleBase from '../_base/toggle-base';
import classNames from 'classnames';

export class Checkbox extends ToggleBase {
	static ComponentConstructor = MDCCheckbox;

	render() {
		const { label, id, children, ...rest } = this.props;
		const labelId = id || this.generatedId;

		return (
			<div className="mdc-form-field">
				<div ref={ref => (this.el = ref)} className={classNames('mdc-checkbox', {'mdc-checkbox--disabled': rest.disabled})}>
					<input type="checkbox" id={labelId} className="mdc-checkbox__native-control" {...rest}/>
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

				{(!!label.length || children) &&
					<label id={labelId + 'label'} htmlFor={labelId}>
						{ label }{ children }
					</label>
				}
			</div>
		);
	}
}

export default Checkbox;
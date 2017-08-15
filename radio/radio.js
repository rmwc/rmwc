import React from 'react';
import { MDCRadio } from '@material/radio';
import ToggleBase from '../_base/toggle-base';
import classNames from 'classnames';

export class Radio extends ToggleBase {
	static ComponentConstructor = MDCRadio;

	render() {
		const { label, id, children, ...rest } = this.props;
		const labelId = id || this.generatedId;

		return (
			<div className="mdc-form-field">
				<div ref={ref => (this.el = ref)} className={classNames('mdc-radio', {'mdc-radio--disabled': rest.disabled})}>
					<input className="mdc-radio__native-control" type="radio" id={labelId} {...rest}/>
					<div className="mdc-radio__background">
						<div className="mdc-radio__outer-circle"></div>
						<div className="mdc-radio__inner-circle"></div>
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

export default Radio;
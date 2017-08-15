import React from 'react';
import ToggleBase from '../_base/toggle-base';
import classNames from 'classnames';

export class Switch extends ToggleBase {
	render() {
		const { label, id, children, ...rest } = this.props;
		const labelId = id || this.generatedId;

		return (
			<div className="mdc-form-field">
				<div className={classNames('mdc-switch', {'mdc-switch--disabled': rest.disabled})}>
					<input type="checkbox" id={labelId} className="mdc-switch__native-control" {...rest} />
					<div className="mdc-switch__background">
						<div className="mdc-switch__knob"></div>
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

export default Switch;
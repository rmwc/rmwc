import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCIconToggle } from '@material/icon-toggle';
import { Icon } from '../icon/icon';

import MDCComponentBase from '../_base/mdc-component-base';

export class IconToggle extends MDCComponentBase {
	static MDCComponentClass = MDCIconToggle;

	static propTypes = {
		...MDCComponentBase.propTypes,
		onChange: PropTypes.func,
		on: PropTypes.object.isRequired,
		off: PropTypes.object.isRequired
	}

	static defaultProps = {
		...MDCComponentBase.defaultProps,
		onChange: undefined,
		on: undefined,
		off: undefined
	}

	MDCComponentDidMount() {
		if (this.props.onChange) {
			this.MDCRegisterListener('MDCIconToggle:change', ({detail}) => {
				this.props.onChange({
					...detail,
					target: {
						value: detail.isOn
					}
				});
			});
		}
	}

	MDCHandleProps(props) {
		if (props.value !== undefined) {
			this.api.on = !!props.value;
		}
	}

	render() {
		const {
			className,
			children,
			value,
			apiRef,
			on,
			off,
			...rest } = this.props;

		const classes = classNames(
			'mdc-icon-toggle',
			className
		);

		const ariaPressed = value !== undefined ? !!value : false;
		const toggleOnJSON = JSON.stringify(on);
		const toggleOffJSON = JSON.stringify(off);
		return (
			<Icon
				elementRef={el => this.MDCSetRootElement(el)}
				className={classes} {...rest}
				data-toggle-on={toggleOnJSON}
				data-toggle-off={toggleOffJSON}
				role="button"
				aria-pressed={ariaPressed}
				tabIndex="0"
			>
			</Icon>
		);
	}
}

export default IconToggle;
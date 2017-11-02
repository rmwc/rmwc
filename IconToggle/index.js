import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCIconToggle } from '@material/icon-toggle';
import { Icon } from '../Icon';
import { propMeta } from '../Base/prop-meta';
import { noop } from '../Base/noop';
import MDCComponentBase from '../Base/mdc-component-base';

export class IconToggle extends MDCComponentBase {
	static MDCComponentClass = MDCIconToggle;

	static propTypes = {
		...MDCComponentBase.propTypes,
		onChange: PropTypes.func,
		on: PropTypes.object.isRequired,
		off: PropTypes.object.isRequired
	};

	static defaultProps = {
		...MDCComponentBase.defaultProps,
		onChange: noop,
		on: undefined,
		off: undefined
	};

	static propMeta = propMeta({
		...MDCComponentBase.propMeta,
		onChange: {
			type: 'Function',
			desc:
				'An onChange callback that receives an event with event.target.value set to true or false.'
		},
		on: {
			type: 'Object',
			desc:
				'An object that can be parsed as valid JSON that gets passed to the MDC constructor.'
		},
		off: {
			type: 'Object',
			desc:
				'An object that can be parsed as valid JSON that gets passed to the MDC constructor.'
		}
	});

	MDCComponentDidMount() {
		if (this.props.onChange) {
			this.MDCRegisterListener('MDCIconToggle:change', ({ detail }) => {
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
		const { className, children, value, apiRef, on, off, ...rest } = this.props;

		const classes = classNames('mdc-icon-toggle', className);

		const ariaPressed = value !== undefined ? !!value : false;
		const toggleOnJSON = JSON.stringify(on);
		const toggleOffJSON = JSON.stringify(off);
		return (
			<Icon
				elementRef={el => this.MDCSetRootElement(el)}
				className={classes}
				{...rest}
				data-toggle-on={toggleOnJSON}
				data-toggle-off={toggleOffJSON}
				role="button"
				aria-pressed={ariaPressed}
				tabIndex="0"
			/>
		);
	}
}

export default IconToggle;

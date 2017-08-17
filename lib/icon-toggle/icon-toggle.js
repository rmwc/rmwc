import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCIconToggle } from '@material/icon-toggle';
import { Icon } from '../icon/icon';

export class IconToggle extends React.Component {
	static propTypes = {
		apiRef: PropTypes.func,
		on: PropTypes.object,
		off: PropTypes.object
	}

	static defaultProps = {
		apiRef: () => {}
	}

	componentDidMount() {
		this.api = MDCIconToggle.attachTo(this.el);
		this.props.apiRef(this.api);

		if (this.props.onChange) {
			this.el.addEventListener('MDCIconToggle:change', ({detail}) => {
				this.props.onChange({
					...detail,
					target: {
						value: detail.isOn
					}
				});
			});
		}
	}

	componentWillUpdate(nextProps) {
		if (nextProps.value !== undefined) {
			this.api.on = !!nextProps.value;
		}
	}

	componentWillUnmount() {
		this.el = null;
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
				iconRef={el => (this.el = el)}
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
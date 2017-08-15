import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCRipple } from '@material/ripple';
import { getProviderOptions } from '../provider/provider';

export class Button extends React.Component {
	static contextTypes = {
		RMDCOptions: PropTypes.object
	}

	static propTypes = {
		dense: PropTypes.bool,
		raised: PropTypes.bool,
		compact: PropTypes.bool,
		primary: PropTypes.bool,
		accent: PropTypes.bool,
		ripple: PropTypes.bool
	}

	static defaultProps = {
		dense: false,
		raised: false,
		compact: false,
		primary: false,
		accent: false
	}

	componentDidMount() {
		this.providerOptions = getProviderOptions(this.context);
		const { buttonDefaultRipple } = this.providerOptions;
		const shouldRipple = this.props.ripple === undefined
			? buttonDefaultRipple
			: this.props.ripple;

		if (shouldRipple) {
			MDCRipple.attachTo(this.el);
		}
	}

	render() {
		const {
			className,
			children,
			dense,
			raised,
			compact,
			primary,
			accent,
			ripple,
			...rest } = this.props;

		const classes = classNames(
			'mdc-button',
			className,
			{
				'mdc-button--dense': dense,
				'mdc-button--raised': raised,
				'mdc-button--compact': compact,
				'mdc-button--primary': primary,
				'mdc-button--accent': accent
			}
		);
		return (
			<button ref={el => (this.el = el)} className={classes} {...rest}>
				{children}
			</button>
		);
	}
}

export default Button;
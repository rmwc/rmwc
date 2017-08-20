import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { MDCRipple } from '@material/ripple';
import { getProviderOptions } from '../provider/provider';
import { simpleComponentFactory } from '../_base/simple-component-factory';

export const ButtonRoot = simpleComponentFactory('ButtonRoot', {
	tag: 'button',
	classNames: props => [
		'mdc-button',
		{
			'mdc-button--dense': props.dense,
			'mdc-button--raised': props.raised,
			'mdc-button--compact': props.compact,
			'mdc-button--primary': props.primary,
			'mdc-button--accent': props.accent
		}
	],
	propTypes: {
		dense: PropTypes.bool,
		raised: PropTypes.bool,
		compact: PropTypes.bool,
		primary: PropTypes.bool,
		accent: PropTypes.bool
	},
	defaultProps: {
		dense: false,
		raised: false,
		compact: false,
		primary: false,
		accent: false
	},
	consumeProps: [
		'dense',
		'raised',
		'compact',
		'primary',
		'accent'
	]
});

export class Button extends React.Component {
	static contextTypes = {
		RMDCOptions: PropTypes.object
	}

	static propTypes = {
		...ButtonRoot.propTypes,
		ripple: PropTypes.bool
	}

	static defaultProps = {
		...ButtonRoot.defaultProps,
		ripple: undefined
	}

	componentWillMount() {
		this.providerOptions = getProviderOptions(this.context);
	}

	componentDidMount() {
		const { buttonDefaultRipple } = this.providerOptions;
		const shouldRipple = this.props.ripple === undefined
			? buttonDefaultRipple
			: this.props.ripple;

		if (shouldRipple) {
			MDCRipple.attachTo(ReactDOM.findDOMNode(this));
		}
	}

	render() {
		const { ripple, ...rest } = this.props;
		return (
			<ButtonRoot {...rest} />
		);
	}
}

export default Button;
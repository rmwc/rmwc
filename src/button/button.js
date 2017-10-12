import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Ripple } from '../ripple/ripple';
import { getProviderOptions } from '../provider/provider';
import { simpleComponentFactory } from '../_base/simple-component-factory';
import { propMeta } from '../_base/prop-meta';

export const ButtonRoot = simpleComponentFactory('ButtonRoot', {
	tag: 'button',
	classNames: props => [
		'mdc-button',
		{
			'mdc-button--dense': props.dense,
			'mdc-button--raised': props.raised,
			'mdc-button--compact': props.compact,
			'mdc-button--unelevated': props.unelevated,
			'mdc-button--stroked': props.stroked
		}
	],
	propTypes: {
		dense: PropTypes.bool,
		raised: PropTypes.bool,
		compact: PropTypes.bool,
		unelevated: PropTypes.bool,
		stroked: PropTypes.bool
	},
	defaultProps: {
		dense: false,
		raised: false,
		compact: false,
		unelevated: false,
		stroked: false
	},
	propMeta: {
		dense: {
			type: 'Boolean',
			desc: 'Make the Button text dense.'
		},
		raised: {
			type: 'Boolean',
			desc: 'Make the Button raised.'
		},
		compact: {
			type: 'Boolean',
			desc: "Reduce the Button's padding."
		},
		unelevated: {
			type: 'Boolean',
			desc: 'Make the button unelevated.'
		},
		stroked: {
			type: 'Boolean',
			desc: 'Use the stroked palette.'
		}
	},
	consumeProps: ['dense', 'raised', 'compact', 'unelevated', 'stroked']
});

export class Button extends React.Component {
	static contextTypes = {
		RMWCOptions: PropTypes.object
	};

	static propTypes = {
		ripple: PropTypes.bool,
		...ButtonRoot.propTypes
	};

	static defaultProps = {
		ripple: undefined,
		...ButtonRoot.defaultProps
	};

	static propMeta = propMeta({
		...ButtonRoot.propMeta,
		ripple: {
			type: 'Boolean',
			desc: 'Adds or disables a ripple from the Button.'
		}
	});

	componentWillMount() {
		this.providerOptions = getProviderOptions(this.context);
	}

	render() {
		const { buttonDefaultRipple } = this.providerOptions;
		const { ripple, ...rest } = this.props;
		const shouldRipple = ripple === undefined ? buttonDefaultRipple : ripple;

		const button = <ButtonRoot {...rest} />;

		if (shouldRipple) {
			return <Ripple>{button}</Ripple>;
		}

		return button;
	}
}

export default Button;

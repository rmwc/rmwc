import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getProviderOptions } from '../provider/provider';
import { Ripple } from '../ripple/ripple';
import { simpleComponentFactory } from '../_base/simple-component-factory';

export const FabRoot = simpleComponentFactory('FabRoot', {
	tag: 'button',
	classNames: props => [
		'mdc-fab',
		{
			'mdc-fab--mini': props.mini
		}
	],
	propTypes: {
		mini: PropTypes.bool
	},
	defaultProps: {
		mini: false
	},
	...(process.env.NODE_ENV === 'production'
		? {}
		: {
				propMeta: {
					mini: {
						type: 'Boolean',
						desc: 'Make the Fab smaller.'
					}
				}
			}),
	consumeProps: ['mini']
});

export const FabIcon = simpleComponentFactory('FabIcon', {
	tag: 'span',
	classNames: 'mdc-fab__icon'
});

export class Fab extends React.Component {
	static contextTypes = {
		RMWCOptions: PropTypes.object
	};

	static propTypes = {
		ripple: PropTypes.bool,
		...FabRoot.propTypes
	};

	static defaultProps = {
		ripple: undefined,
		...FabRoot.defaultProps
	};

	componentWillMount() {
		this.providerOptions = getProviderOptions(this.context);
	}

	render() {
		const { buttonDefaultRipple } = this.providerOptions;
		const { ripple, className, children, ...rest } = this.props;
		const shouldRipple = ripple === undefined ? buttonDefaultRipple : ripple;

		const classes = classNames(this.providerOptions.iconPrefix, className);
		const button = (
			<FabRoot className={classes} {...rest}>
				<FabIcon>{children}</FabIcon>
			</FabRoot>
		);

		if (shouldRipple) {
			return <Ripple>{button}</Ripple>;
		}

		return button;
	}
}

Fab.propMeta = {
	...FabRoot.propMeta,
	ripple: {
		type: 'Boolean',
		desc: 'Adds or disables a ripple from the Fab.'
	}
};

export default Fab;

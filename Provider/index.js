import React from 'react';
import PropTypes from 'prop-types';

const providerDefaults = {
	buttonDefaultRipple: true,
	iconPrefix: 'material-icons '
};

export const getProviderOptions = context => {
	return context && context.RMWCOptions
		? context.RMWCOptions
		: providerDefaults;
};

/**
 * Provides default options for children
 * Prop override options in providerDefaults with the same name
 * @export
 * @class RMWCProvider
 * @extends {React.Component}
 */
export class RMWCProvider extends React.Component {
	static childContextTypes = {
		RMWCOptions: PropTypes.object
	};

	static propTypes = {
		RMWCOptions: PropTypes.object
	};

	constructor(props, ...args) {
		super(props, ...args);
		this.options = this.buildOptions(props);
	}

	componentWillUpdate(nextProps) {
		this.options = this.buildOptions(nextProps);
	}

	buildOptions(props) {
		return Object.assign({}, providerDefaults, props || {});
	}

	getChildContext() {
		return {
			RMWCOptions: this.options
		};
	}

	render() {
		return this.props.children;
	}
}

export default RMWCProvider;

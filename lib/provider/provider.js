import React from 'react';
import PropTypes from 'prop-types';

const providerDefaults = {
	buttonDefaultRipple: true,
	iconPrefix: 'material-icons '
};

export const getProviderOptions = context => {
	return context && context.RMDCOptions ? context.RMDCOptions : providerDefaults;
};

export class RMDCProvider extends React.Component {
	static childContextTypes = {
		RMDCOptions: PropTypes.object
	}

	static propTypes = {
		RMDCOptions: PropTypes.object
	}

	constructor(props, ...args) {
		super(props, ...args);
		this.options = this.buildOptions(props);
	}

	componentWillUpdate(nextProps) {
		this.options = this.buildOptions(nextProps);
	}

	buildOptions(props) {
		return Object.assign({}, providerDefaults, props.options || {});
	}

	getChildContext() {
		return {
			RMDCOptions: this.options
		};
	}

	render() {
		return this.props.children;
	}
}

export default RMDCProvider;
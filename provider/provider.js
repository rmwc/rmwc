import React from 'react';
import PropTypes from 'prop-types';

export class RMDCProvider extends React.Component {
	static childContextTypes = {
		RMDCOptions: PropTypes.object
	}

	static propTypes = {
		RMDCOptions: PropTypes.object
	}

	constructor(props, ...args) {
		super(props, ...args);
		this.defaults = {
			buttonDefaultRipple: true,
			iconPrefix: 'material-icons '
		};
		this.options = this.buildOptions(props);
	}

	componentWillUpdate(nextProps) {
		this.options = this.buildOptions(nextProps);
	}

	buildOptions(props) {
		return Object.assign({}, this.defaults, props.options || {});
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
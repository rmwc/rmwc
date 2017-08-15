import React from 'react';
import PropTypes from 'prop-types';
import { getProviderOptions } from '../provider/provider';

export class Icon extends React.Component {
	static contextTypes = {
		RMDCOptions: PropTypes.object
	}

	static propTypes = {
		iconRef: PropTypes.func
	}

	componentWillMount() {
		this.providerOptions = getProviderOptions(this.context);
	}

	render() {
		const {
			className,
			children,
			iconRef,
			...rest } = this.props;

		const { iconPrefix } = this.providerOptions;
		const ref = {};

		if (iconRef) {
			ref.ref = ref => iconRef(ref);
		}

		return (
			<i {...ref} className={iconPrefix + className} {...rest}>{children}</i>
		);
	}
}

export default Icon;
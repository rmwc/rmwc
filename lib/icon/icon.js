import React from 'react';
import PropTypes from 'prop-types';
import { getProviderOptions } from '../provider/provider';
import simpleComponentFactory from '../_base/simple-component-factory';

export const IconEl = simpleComponentFactory('IconEl', 'i');

export class Icon extends React.Component {
	static contextTypes = {
		RMDCOptions: PropTypes.object
	}

	static propTypes = {
		...IconEl.propTypes
	}

	static defaultProps = {
		...IconEl.defaultProps
	}

	componentWillMount() {
		this.providerOptions = getProviderOptions(this.context);
	}

	render() {
		const {
			className,
			children,
			...rest } = this.props;

		const { iconPrefix } = this.providerOptions;

		return (
			<IconEl className={iconPrefix + className} {...rest}>{children}</IconEl>
		);
	}
}

export default Icon;
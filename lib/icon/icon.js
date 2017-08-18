import React from 'react';
import PropTypes from 'prop-types';
import { getProviderOptions } from '../provider/provider';
import simpleComponentFactory from '../_base/simple-component-factory';

const IconBase = simpleComponentFactory('IconBase', 'i');

export class Icon extends React.Component {
	static contextTypes = {
		RMDCOptions: PropTypes.object
	}

	static propTypes = {
		...IconBase.propTypes
	}

	static defaultProps = {
		...IconBase.defaultProps
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
			<IconBase className={iconPrefix + className} {...rest}>{children}</IconBase>
		);
	}
}

export default Icon;
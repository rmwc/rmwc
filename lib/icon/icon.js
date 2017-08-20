import React from 'react';
import PropTypes from 'prop-types';
import { getProviderOptions } from '../provider/provider';
import { simpleComponentFactory } from '../_base/simple-component-factory';

export const IconRoot = simpleComponentFactory('IconRoot', {tag: 'i'});

export class Icon extends React.Component {
	static contextTypes = {
		RMDCOptions: PropTypes.object
	}

	static propTypes = {
		...IconRoot.propTypes
	}

	static defaultProps = {
		...IconRoot.defaultProps
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
			<IconRoot className={iconPrefix + className} {...rest}>{children}</IconRoot>
		);
	}
}

export default Icon;
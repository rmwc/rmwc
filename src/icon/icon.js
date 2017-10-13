import React from 'react';
import PropTypes from 'prop-types';
import { getProviderOptions } from '../provider/provider';
import { simpleComponentFactory } from '../_base/simple-component-factory';

export const IconRoot = simpleComponentFactory('IconRoot', { tag: 'i' });

export class Icon extends React.Component {
	static contextTypes = {
		RMWCOptions: PropTypes.object
	};

	static propTypes = {
		use: PropTypes.node,
		...IconRoot.propTypes
	};

	static defaultProps = {
		use: undefined,
		...IconRoot.defaultProps
	};

	componentWillMount() {
		this.providerOptions = getProviderOptions(this.context);
	}

	render() {
		const { className, use, children, ...rest } = this.props;

		const { iconPrefix } = this.providerOptions;
		const content = use || children;

		return (
			<IconRoot className={iconPrefix + (className || '')} {...rest}>
				{content}
			</IconRoot>
		);
	}
}

export default Icon;

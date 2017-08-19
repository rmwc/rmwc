import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../button/button';
import simpleComponentFactory from '../_base/simple-component-factory';

export const FabRoot = simpleComponentFactory(
	'FabRoot', 'button',
	{className: 'mdc-fab'}
);

export const FabIcon = simpleComponentFactory(
	'FabRoot', 'span',
	{className: 'mdc-fab__icon'}
);

export class Fab extends Button {
	static contextTypes = {
		RMDCOptions: PropTypes.object
	}

	static propTypes = {
		...FabRoot.propTypes,
		mini: PropTypes.bool,
		plain: PropTypes.bool,
		ripple: PropTypes.bool
	}

	static defaultProps = {
		...FabRoot.defaultProps,
		mini: false,
		plain: false
	}

	render() {
		const {
			className,
			children,
			mini,
			plain,
			ripple,
			...rest } = this.props;

		const classes = classNames(
			this.providerOptions.iconPrefix,
			className,
			{
				'mdc-fab--mini': mini,
				'mdc-fab--plain': plain
			}
		);
		return (
			<FabRoot className={classes} {...rest}>
				<FabIcon>
					{children}
				</FabIcon>
			</FabRoot>
		);
	}
}

export default Fab;
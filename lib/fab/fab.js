import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../button/button';
import simpleComponentFactory from '../_base/simple-component-factory';

export const FabEl = simpleComponentFactory(
	'FabEl', 'button',
	{className: 'mdc-fab'}
);

export const FabIconEl = simpleComponentFactory(
	'FabEl', 'span',
	{className: 'mdc-fab__icon'}
);

export class Fab extends Button {
	static contextTypes = {
		RMDCOptions: PropTypes.object
	}

	static propTypes = {
		...FabEl.propTypes,
		mini: PropTypes.bool,
		plain: PropTypes.bool,
		ripple: PropTypes.bool
	}

	static defaultProps = {
		...FabEl.defaultProps,
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
			<FabEl className={classes} {...rest}>
				<FabIconEl>
					{children}
				</FabIconEl>
			</FabEl>
		);
	}
}

export default Fab;
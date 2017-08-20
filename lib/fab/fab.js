import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../button/button';
import { simpleComponentFactory } from '../_base/simple-component-factory';

export const FabRoot = simpleComponentFactory('FabRoot', {
	tag: 'button',
	classNames: props => [
		'mdc-fab',
		{
			'mdc-fab--mini': props.mini,
			'mdc-fab--plain': props.plain
		}
	],
	propTypes: {
		mini: PropTypes.bool,
		plain: PropTypes.bool
	},
	defaultProps: {
		mini: false,
		plain: false
	},
	consumeProps: [
		'mini',
		'plain'
	]
});

export const FabIcon = simpleComponentFactory('FabIcon', {
	tag: 'span',
	classNames: 'mdc-fab__icon'
});

export class Fab extends Button {
	static contextTypes = {
		RMDCOptions: PropTypes.object
	}

	static propTypes = {
		...FabRoot.propTypes,
		ripple: PropTypes.bool
	}

	static defaultProps = {
		...FabRoot.defaultProps
	}

	render() {
		const {
			className,
			children,
			ripple,
			...rest } = this.props;

		const classes = classNames(
			this.providerOptions.iconPrefix,
			className
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
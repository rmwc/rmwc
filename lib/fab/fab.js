import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../button/button';
import simpleComponentFactory from '../_base/simple-component-factory';

const FabBase = simpleComponentFactory('FabBase', 'button');

export class Fab extends Button {
	static contextTypes = {
		RMDCOptions: PropTypes.object
	}

	static propTypes = {
		...FabBase.propTypes,
		mini: PropTypes.bool,
		plain: PropTypes.bool,
		ripple: PropTypes.bool
	}

	static defaultProps = {
		...FabBase.defaultProps,
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
			'mdc-fab',
			this.providerOptions.iconPrefix,
			className,
			{
				'mdc-fab--mini': mini,
				'mdc-fab--plain': plain
			}
		);
		return (
			<FabBase className={classes} {...rest}>
				<span className="mdc-fab__icon">
					{children}
				</span>
			</FabBase>
		);
	}
}

export default Fab;
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCToolbar } from '@material/toolbar';

import MDCComponentBase from '../_base/mdc-component-base';
import simpleComponentFactory from '../_base/simple-component-factory';

export const ToolbarRoot = simpleComponentFactory('Toolbar', 'header');

export class Toolbar extends MDCComponentBase {
	static MDCComponentClass = MDCToolbar;

	static propTypes = {
		...Toolbar.propTypes,
		...MDCComponentBase.propTypes,
		fixed: PropTypes.bool,
		waterfall: PropTypes.bool,
		fixedLastrowOnly: PropTypes.bool,
		flexible: PropTypes.bool
	}

	static defaultProps = {
		...Toolbar.defaultProps,
		...MDCComponentBase.defaultProps,
		fixed: false,
		waterfall: false,
		fixedLastrowOnly: false,
		flexible: false
	}

	render() {
		const { className, children, fixed, waterfall, fixedLastrowOnly, flexible, apiRef, ...rest } = this.props;

		const classes = classNames(
			'mdc-toolbar',
			className,
			{
				'mdc-toolbar--fixed': fixed,
				'mdc-toolbar--waterfall': waterfall,
				'mdc-toolbar--fixed-lastrow-only': fixedLastrowOnly,
				'mdc-toolbar--flexible': flexible
			}
		);
		return (
			<ToolbarRoot elementRef={el => this.MDCSetRootElement(el)} className={classes} {...rest}>
				{ children }
			</ToolbarRoot>
		);
	}
}

export default Toolbar;
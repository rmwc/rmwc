import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCToolbar } from '@material/toolbar';

import MDCComponentBase from '../_base/mdc-component-base';
import simpleComponentFactory from '../_base/simple-component-factory';

const ToolbarBase = simpleComponentFactory('ToolbarBase', 'header');

export class Toolbar extends MDCComponentBase {
	static MDCComponentClass = MDCToolbar;

	static propTypes = {
		...ToolbarBase.propTypes,
		...MDCComponentBase.propTypes,
		fixed: PropTypes.bool,
		waterfall: PropTypes.bool,
		fixedLastrowOnly: PropTypes.bool,
		flexible: PropTypes.bool
	}

	static defaultProps = {
		...ToolbarBase.defaultProps,
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
			<ToolbarBase className={classes} {...rest}>
				{ children }
			</ToolbarBase>
		);
	}
}

export default Toolbar;
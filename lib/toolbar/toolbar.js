import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCToolbar } from '@material/toolbar';

import MDCComponentBase from '../_base/mdc-component-base';
import simpleComponentFactory from '../_base/simple-component-factory';
import { propMeta } from '../_base/prop-meta';

export const ToolbarRoot = simpleComponentFactory('Toolbar', {tag: 'header'});

export class Toolbar extends MDCComponentBase {
	static MDCComponentClass = MDCToolbar;

	static propTypes = {
		fixed: PropTypes.bool,
		waterfall: PropTypes.bool,
		fixedLastrowOnly: PropTypes.bool,
		flexible: PropTypes.bool,
		...MDCComponentBase.propTypes,
		...ToolbarRoot.propTypes
	}

	static defaultProps = {
		fixed: false,
		waterfall: false,
		fixedLastrowOnly: false,
		flexible: false,
		...MDCComponentBase.defaultProps,
		...ToolbarRoot.defaultProps
	}

	static propMeta = propMeta({
		fixed: {
			type: 'Boolean',
			desc: 'Fixes the Toolbar to the top of the screen.'
		},
		waterfall: {
			type: 'Boolean',
			desc: 'Makes the toolbar a waterfall.'
		},
		fixedLastrowOnly: {
			type: 'Boolean',
			desc: 'Fixes the last row only.'
		},
		flexible: {
			type: 'Boolean',
			desc: 'Makes the Toolbar flexible.'
		},
		...MDCComponentBase.propMeta,
		...ToolbarRoot.propMeta
	});

	render() {
		const { className, fixed, waterfall, fixedLastrowOnly, flexible, apiRef, ...rest } = this.props;

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
			<ToolbarRoot elementRef={el => this.MDCSetRootElement(el)} className={classes} {...rest}/>
		);
	}
}

export default Toolbar;
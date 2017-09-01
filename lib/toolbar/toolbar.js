import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { toolbar as mdcToolbar } from 'material-components-web';

import MDCComponentBase from '../_base/mdc-component-base';
import simpleComponentFactory from '../_base/simple-component-factory';
import { propMeta } from '../_base/prop-meta';

const { MDCToolbar } = mdcToolbar;

export const ToolbarRoot = simpleComponentFactory('Toolbar', {
	tag: 'header'
});

export const ToolbarTitle = simpleComponentFactory('ToolbarTitle', {
	classNames: 'mdc-toolbar__title'
});

export const ToolbarSection = simpleComponentFactory('ToolbarSection', {
	tag: 'section',
	classNames: props => [
		'mdc-toolbar__section',
		{
			'mdc-toolbar__section--align-start': props.alignStart,
			'mdc-toolbar__section--align-end': props.alignEnd,
			'mdc-toolbar__section--shrink-to-fit': props.shrinkToFit
		}
	],
	propTypes: {
		alignStart: PropTypes.bool,
		alignEnd: PropTypes.bool,
		shrinkToFit: PropTypes.bool
	},
	defaultProps: {
		alignStart: false,
		alignEnd: false,
		shrinkToFit: false
	},
	propMeta: {
		alignStart: {
			type: 'Boolean',
			desc: 'Aligns the ToolbarSection at the start.'
		},
		alignEnd: {
			type: 'Boolean',
			desc: 'Aligns the ToolbarSection at the end.'
		},
		shrinkToFit: {
			type: 'Boolean',
			desc: 'Makes the ToolbarSection shrink to fit.'
		}
	},
	consumeProps: [
		'alignStart',
		'alignEnd',
		'shrinkToFit'
	]
});

export const ToolbarRow = simpleComponentFactory('ToolbarRow', {
	classNames: 'mdc-toolbar__row'
});

export const ToolbarFixedAdjust = simpleComponentFactory('ToolbarFixedAdjust', {
	classNames: 'mdc-toolbar-fixed-adjust'
});

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
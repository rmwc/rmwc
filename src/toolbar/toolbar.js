import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { toolbar as mdcToolbar } from 'material-components-web';

import MDCComponentBase from '../_base/mdc-component-base';
import simpleComponentFactory from '../_base/simple-component-factory';
import { propMeta } from '../_base/prop-meta';

const { MDCToolbar } = mdcToolbar;

export const ToolbarRoot = simpleComponentFactory('Toolbar', {
	tag: 'header',
	classNames: props => [
		'mdc-toolbar',
		{
			'mdc-toolbar--fixed': props.fixed,
			'mdc-toolbar--waterfall': props.waterfall,
			'mdc-toolbar--fixed-lastrow-only': props.fixedLastrowOnly,
			'mdc-toolbar--flexible': props.flexible
		}
	],
	propTypes: {
		fixed: PropTypes.bool,
		waterfall: PropTypes.bool,
		fixedLastrowOnly: PropTypes.bool,
		flexible: PropTypes.bool
	},
	defaultProps: {
		fixed: false,
		waterfall: false,
		fixedLastrowOnly: false,
		flexible: false
	},
	consumeProps: [
		'fixed',
		'waterfall',
		'fixedLastrowOnly',
		'flexible'
	]

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
		...ToolbarRoot.propTypes,
		...MDCComponentBase.propTypes
	}

	static defaultProps = {
		...ToolbarRoot.defaultProps,
		...MDCComponentBase.defaultProps
	}

	static propMeta = propMeta({
		...ToolbarRoot.propMeta,
		...MDCComponentBase.propMeta
	});

	componentDidUpdate(prevProps) {
		const didChange = ['fixedLastrowOnly', 'flexible'].some(key => (this.MDCApi[key] !== prevProps[key]));
		if (didChange) {
			const firstRow = this.MDCGetRootElement().querySelector('.mdc-toolbar__row');
			firstRow && firstRow.removeAttribute('style');
			this.MDCComponentReinit();
		}
	}

	render() {
		const { apiRef, ...rest } = this.props;
		return (
			<ToolbarRoot elementRef={el => this.MDCSetRootElement(el)} {...rest}/>
		);
	}
}

export default Toolbar;
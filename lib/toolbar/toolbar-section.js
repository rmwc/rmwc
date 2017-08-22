import React from 'react';
import PropTypes from 'prop-types';
import simpleComponentFactory from '../_base/simple-component-factory';

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

export default ToolbarSection;
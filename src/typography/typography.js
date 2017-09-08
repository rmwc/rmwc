import React from 'react';
import PropTypes from 'prop-types';
import simpleComponentFactory from '../_base/simple-component-factory';

export const Typography = simpleComponentFactory('Typography', {
	tag: 'span',
	classNames: props => [
		{
			[`mdc-typography--${props.kind}`]: props.kind,
			'mdc-typography--adjust-margin': props.adjustMargin
		}
	],
	propTypes: {
		kind: PropTypes.oneOf([
			'display4',
			'display3',
			'display2',
			'display1',
			'headline',
			'title',
			'subheading2',
			'subheading1',
			'body2',
			'body1',
			'caption',
			'button'
		]).isRequired,
		adjustMargin: PropTypes.bool
	},
	defaultProps: {
		kind: undefined,
		adjustMargin: false
	},
	propMeta: {
		kind: {
			type: 'String',
			desc: 'The typography style. display4, display3, display2, display1, headline, title, subheading2, subheading1, body2, body1, caption, button.'
		},
		adjustMargin: {
			type: 'Boolean',
			desc: 'Sets adjust margin modifier for Typography. Should be accompanied by a type class.'
		}
	},
	consumeProps: [
		'kind',
		'adjustMargin'
	]
});

export default Typography;
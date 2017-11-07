import React from 'react';
import PropTypes from 'prop-types';
import simpleComponentFactory from '../Base/simple-component-factory';

export const Typography = simpleComponentFactory('Typography', {
	tag: 'span',
	classNames: props => [
		{
			[`mdc-typography--${props.use}`]: props.use,
			'mdc-typography--adjust-margin': props.adjustMargin
		}
	],
	propTypes: {
		use: PropTypes.oneOf([
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
		use: undefined,
		adjustMargin: false
	},
	propMeta: {
		use: {
			type: 'String',
			desc:
				'The typography style. display4, display3, display2, display1, headline, title, subheading2, subheading1, body2, body1, caption, button.'
		},
		adjustMargin: {
			type: 'Boolean',
			desc:
				'Sets adjust margin modifier for Typography. Should be accompanied by a type class.'
		}
	},
	consumeProps: ['use', 'adjustMargin']
});

export default Typography;

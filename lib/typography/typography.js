import React from 'react';
import PropTypes from 'prop-types';
import simpleComponentFactory from '../_base/simple-component-factory';

const Typography = simpleComponentFactory('Typography', {
	tag: 'span',
	classNames: props => [
		{
			'mdc-typography--display4': props.display4,
			'mdc-typography--display3': props.display3,
			'mdc-typography--display2': props.display2,
			'mdc-typography--display1': props.display1,
			'mdc-typography--headline': props.headline,
			'mdc-typography--title': props.title,
			'mdc-typography--subheading2': props.subheading2,
			'mdc-typography--subheading1': props.subheading1,
			'mdc-typography--body2': props.body2,
			'mdc-typography--body1': props.body1,
			'mdc-typography--caption': props.caption,
			'mdc-typography--button': props.button
		}
	],
	propTypes: {
		display4: PropTypes.bool,
		display3: PropTypes.bool,
		display2: PropTypes.bool,
		display1: PropTypes.bool,
		headline: PropTypes.bool,
		title: PropTypes.bool,
		subheading2: PropTypes.bool,
		subheading1: PropTypes.bool,
		body2: PropTypes.bool,
		body1: PropTypes.bool,
		caption: PropTypes.bool,
		button: PropTypes.bool
	},
	defaultProps: {
		display4: false,
		display3: false,
		display2: false,
		display1: false,
		headline: false,
		title: false,
		subheading2: false,
		subheading1: false,
		body2: false,
		body1: false,
		caption: false,
		button: false
	},
	consumeProps: [
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
	]
});

export default Typography;
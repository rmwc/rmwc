function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import simpleComponentFactory from '../Base/simple-component-factory';

export var Typography = simpleComponentFactory('Typography', {
	tag: 'span',
	classNames: function classNames(props) {
		var _ref;

		return [(_ref = {}, _defineProperty(_ref, 'mdc-typography--' + props.use, props.use), _defineProperty(_ref, 'mdc-typography--adjust-margin', props.adjustMargin), _ref)];
	},
	propTypes: {
		use: PropTypes.oneOf(['display4', 'display3', 'display2', 'display1', 'headline', 'title', 'subheading2', 'subheading1', 'body2', 'body1', 'caption', 'button']).isRequired,
		adjustMargin: PropTypes.bool
	},
	defaultProps: {
		use: undefined,
		adjustMargin: false
	},
	propMeta: {
		use: {
			type: 'String',
			desc: 'The typography style. display4, display3, display2, display1, headline, title, subheading2, subheading1, body2, body1, caption, button.'
		},
		adjustMargin: {
			type: 'Boolean',
			desc: 'Sets adjust margin modifier for Typography. Should be accompanied by a type class.'
		}
	},
	consumeProps: ['use', 'adjustMargin']
});

export default Typography;

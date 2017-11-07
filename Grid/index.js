function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { simpleComponentFactory } from '../Base/simple-component-factory';

export var GridCell = simpleComponentFactory('GridCell', {
	classNames: function classNames(props) {
		var _ref;

		return ['mdc-layout-grid__cell', (_ref = {}, _defineProperty(_ref, 'mdc-layout-grid__cell--span-' + props.span, props.span !== undefined), _defineProperty(_ref, 'mdc-layout-grid__cell--span-' + props.phone + '-phone', props.phone !== undefined), _defineProperty(_ref, 'mdc-layout-grid__cell--span-' + props.tablet + '-tablet', props.tablet !== undefined), _defineProperty(_ref, 'mdc-layout-grid__cell--span-' + props.desktop + '-desktop', props.desktop !== undefined), _ref)];
	},
	propTypes: {
		span: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		tablet: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		desktop: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	},
	defaultProps: {
		span: undefined,
		phone: undefined,
		tablet: undefined,
		desktop: undefined
	},
	propMeta: {
		span: {
			type: 'Number',
			desc: 'A generic span value for all screen sizes.'
		},
		phone: {
			type: 'Number',
			desc: 'A span value for phone screen sizes.'
		},
		tablet: {
			type: 'Number',
			desc: 'A span value for tablet screen sizes.'
		},
		desktop: {
			type: 'Number',
			desc: 'A span value for desktop screen sizes.'
		}
	},
	consumeProps: ['span', 'phone', 'tablet', 'desktop']
});

export var GridRoot = simpleComponentFactory('GridRoot', {
	classNames: 'mdc-layout-grid'
});

export var GridInner = simpleComponentFactory('GridInner', {
	classNames: 'mdc-layout-grid__inner'
});

var Grid = function Grid(props) {
	var children = props.children,
	    rest = _objectWithoutProperties(props, ['children']);

	return React.createElement(
		GridRoot,
		rest,
		React.createElement(
			GridInner,
			null,
			children
		)
	);
};
export { Grid };

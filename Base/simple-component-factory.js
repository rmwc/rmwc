var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { propMeta } from './prop-meta';
import { themeOptions } from '../Theme/theme-options';

var simpleComponentFactory = function simpleComponentFactory() {
	var componentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'GenericComponent';
	var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	var defaultTag = opts.tag || 'div';

	var propTypes = Object.assign({}, opts.propTypes || {}, (typeof defaultTag === 'undefined' ? 'undefined' : _typeof(defaultTag)) === 'object' && defaultTag.propTypes ? defaultTag.propTypes : {}, {
		elementRef: PropTypes.func,
		tag: PropTypes.any,
		wrap: PropTypes.bool,
		theme: PropTypes.oneOfType([PropTypes.oneOf(themeOptions), PropTypes.arrayOf(PropTypes.oneOf(themeOptions))])
	});

	var defaultProps = Object.assign({}, opts.defaultProps || {}, (typeof defaultTag === 'undefined' ? 'undefined' : _typeof(defaultTag)) === 'object' && defaultTag.defaultProps ? defaultTag.defaultProps : {}, {
		elementRef: undefined,
		tag: defaultTag,
		wrap: opts.defaultProps && opts.defaultProps.wrap ? opts.defaultProps.wrap : false,
		theme: undefined
	});

	var Component = function Component(props) {
		var className = props.className,
		    wrap = props.wrap,
		    tag = props.tag,
		    children = props.children,
		    elementRef = props.elementRef,
		    rest = _objectWithoutProperties(props, ['className', 'wrap', 'tag', 'children', 'elementRef']);

		var defaultClassNames = typeof opts.classNames === 'string' ? [opts.classNames] : typeof opts.classNames === 'function' ? opts.classNames(props) : opts.classNames || [];

		var themeClasses = props.theme ? (!Array.isArray(props.theme) ? [props.theme] : props.theme).map(function (t) {
			return 'mdc-theme--' + t;
		}) : [];

		var classes = classNames.apply(undefined, _toConsumableArray(defaultClassNames).concat(_toConsumableArray(themeClasses), [className]));

		var elementRefProp = elementRef ? { ref: elementRef } : {};

		// This gets around unknown prop warning
		// https://facebook.github.io/react/warnings/unknown-prop.html
		if (opts.consumeProps) {
			opts.consumeProps.forEach(function (key) {
				return delete rest[key];
			});
		}

		var mergedProps = Object.assign({
			className: classes
		}, elementRefProp, rest);

		var Tag = tag;

		if (wrap) {
			return React.cloneElement(children, Object.assign({}, children.props, mergedProps, { className: classNames(classes, children.props.className) }));
		} else {
			return React.createElement(
				Tag,
				mergedProps,
				children
			);
		}
	};

	Component.propTypes = propTypes;
	Component.defaultProps = defaultProps;
	Component.propMeta = propMeta(Object.assign({}, opts.propMeta || {}, {
		elementRef: {
			type: 'Function',
			desc: 'A ref for the DOM element.'
		},
		tag: {
			type: ['String', 'Component'],
			desc: 'The tag to be used when rendering. If a component is passed, it will be cloned with new props merged in.'
		},
		wrap: {
			type: 'Boolean',
			desc: 'Whether or not this creates its own DOM element, or simply adds functionality to its child.'
		},
		theme: {
			type: 'String | Array',
			desc: 'Sets the text and color theme. Can be a string or array of any valid theme string.'
		}
	}));

	Object.defineProperty(Component, 'name', {
		value: componentName,
		writable: false
	});

	return Component;
};

export { simpleComponentFactory };
export default simpleComponentFactory;

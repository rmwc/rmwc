var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Ripple } from '../Ripple';
import { getProviderOptions } from '../Provider';
import { simpleComponentFactory } from '../Base/simple-component-factory';
import { propMeta } from '../Base/prop-meta';

export var ButtonRoot = simpleComponentFactory('ButtonRoot', {
	tag: 'button',
	classNames: function classNames(props) {
		return ['mdc-button', {
			'mdc-button--dense': props.dense,
			'mdc-button--raised': props.raised,
			'mdc-button--compact': props.compact,
			'mdc-button--unelevated': props.unelevated,
			'mdc-button--stroked': props.stroked
		}];
	},
	propTypes: {
		dense: PropTypes.bool,
		raised: PropTypes.bool,
		compact: PropTypes.bool,
		unelevated: PropTypes.bool,
		stroked: PropTypes.bool
	},
	defaultProps: {
		dense: false,
		raised: false,
		compact: false,
		unelevated: false,
		stroked: false
	},
	propMeta: {
		dense: {
			type: 'Boolean',
			desc: 'Make the Button text dense.'
		},
		raised: {
			type: 'Boolean',
			desc: 'Make the Button raised.'
		},
		compact: {
			type: 'Boolean',
			desc: "Reduce the Button's padding."
		},
		unelevated: {
			type: 'Boolean',
			desc: 'Make the button unelevated.'
		},
		stroked: {
			type: 'Boolean',
			desc: 'Use the stroked palette.'
		}
	},
	consumeProps: ['dense', 'raised', 'compact', 'unelevated', 'stroked']
});

export var Button = function (_React$Component) {
	_inherits(Button, _React$Component);

	function Button() {
		_classCallCheck(this, Button);

		return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
	}

	_createClass(Button, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.providerOptions = getProviderOptions(this.context);
		}
	}, {
		key: 'render',
		value: function render() {
			var buttonDefaultRipple = this.providerOptions.buttonDefaultRipple;

			var _props = this.props,
			    ripple = _props.ripple,
			    rest = _objectWithoutProperties(_props, ['ripple']);

			var shouldRipple = ripple === undefined ? buttonDefaultRipple : ripple;

			var button = React.createElement(ButtonRoot, rest);

			if (shouldRipple) {
				return React.createElement(
					Ripple,
					null,
					button
				);
			}

			return button;
		}
	}]);

	return Button;
}(React.Component);

Object.defineProperty(Button, 'contextTypes', {
	enumerable: true,
	writable: true,
	value: {
		RMWCOptions: PropTypes.object
	}
});
Object.defineProperty(Button, 'propTypes', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		ripple: PropTypes.bool
	}, ButtonRoot.propTypes)
});
Object.defineProperty(Button, 'defaultProps', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		ripple: undefined
	}, ButtonRoot.defaultProps)
});
Object.defineProperty(Button, 'propMeta', {
	enumerable: true,
	writable: true,
	value: propMeta(Object.assign({}, ButtonRoot.propMeta, {
		ripple: {
			type: 'Boolean',
			desc: 'Adds or disables a ripple from the Button.'
		}
	}))
});
export default Button;

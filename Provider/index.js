var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

var providerDefaults = {
	buttonDefaultRipple: true,
	iconPrefix: 'material-icons '
};

export var getProviderOptions = function getProviderOptions(context) {
	return context && context.RMWCOptions ? context.RMWCOptions : providerDefaults;
};

/**
 * Provides default options for children
 * Prop override options in providerDefaults with the same name
 * @export
 * @class RMWCProvider
 * @extends {React.Component}
 */
export var RMWCProvider = function (_React$Component) {
	_inherits(RMWCProvider, _React$Component);

	function RMWCProvider(props) {
		var _ref;

		_classCallCheck(this, RMWCProvider);

		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_ref = RMWCProvider.__proto__ || Object.getPrototypeOf(RMWCProvider)).call.apply(_ref, [this, props].concat(args)));

		_this.options = _this.buildOptions(props);
		return _this;
	}

	_createClass(RMWCProvider, [{
		key: 'componentWillUpdate',
		value: function componentWillUpdate(nextProps) {
			this.options = this.buildOptions(nextProps);
		}
	}, {
		key: 'buildOptions',
		value: function buildOptions(props) {
			return Object.assign({}, providerDefaults, props || {});
		}
	}, {
		key: 'getChildContext',
		value: function getChildContext() {
			return {
				RMWCOptions: this.options
			};
		}
	}, {
		key: 'render',
		value: function render() {
			return this.props.children;
		}
	}]);

	return RMWCProvider;
}(React.Component);

Object.defineProperty(RMWCProvider, 'childContextTypes', {
	enumerable: true,
	writable: true,
	value: {
		RMWCOptions: PropTypes.object
	}
});
Object.defineProperty(RMWCProvider, 'propTypes', {
	enumerable: true,
	writable: true,
	value: {
		RMWCOptions: PropTypes.object
	}
});
export default RMWCProvider;

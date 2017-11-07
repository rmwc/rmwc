var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { propMeta } from './prop-meta';
import { noop } from './noop';

export var MDCComponentBase = function (_React$Component) {
	_inherits(MDCComponentBase, _React$Component);

	function MDCComponentBase() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, MDCComponentBase);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MDCComponentBase.__proto__ || Object.getPrototypeOf(MDCComponentBase)).call.apply(_ref, [this].concat(args))), _this), Object.defineProperty(_this, 'MDCListeners', {
			enumerable: true,
			writable: true,
			value: []
		}), Object.defineProperty(_this, 'MDCRootElement', {
			enumerable: true,
			writable: true,
			value: undefined
		}), _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(MDCComponentBase, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.MDCComponentInit(this.props);
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate(nextProps) {
			this.MDCHandleProps(nextProps);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.MDCComponentDestroy();
		}
	}, {
		key: 'MDCComponentInit',
		value: function MDCComponentInit() {
			if (this.constructor.MDCComponentClass) {
				var el = this.MDCGetRootElement();

				// a stupid hack for the test environment where this ends up undefined
				if (process.env.NODE_ENV === 'test') {
					el.dataset = {};
				}

				this.MDCApi = new this.constructor.MDCComponentClass(el);
				this.props.apiRef(this.MDCApi);
			}
			this.MDCComponentDidMount();
			this.MDCHandleProps(this.props, true);
		}
	}, {
		key: 'MDCComponentReinit',
		value: function MDCComponentReinit() {
			this.MDCComponentDestroy();
			this.MDCComponentInit();
		}
	}, {
		key: 'MDCComponentDestroy',
		value: function MDCComponentDestroy() {
			this.MDCUnregisterAllListeners();
			this.MDCApi && this.MDCApi.destroy();
		}
	}, {
		key: 'MDCRegisterListener',
		value: function MDCRegisterListener(eventName, func) {
			var _this2 = this;

			this.MDCApi.listen(eventName, func);
			this.MDCListeners.push(function () {
				return _this2.MDCApi.unlisten(eventName, func);
			});
		}
	}, {
		key: 'MDCUnregisterAllListeners',
		value: function MDCUnregisterAllListeners() {
			this.MDCListeners.forEach(function (unlisten) {
				return unlisten();
			});
			this.MDCListeners.length = 0;
		}
	}, {
		key: 'MDCSetRootElement',
		value: function MDCSetRootElement(el) {
			this.MDCRootElement = el;
		}
	}, {
		key: 'MDCGetRootElement',
		value: function MDCGetRootElement() {
			return this.MDCRootElement || ReactDOM.findDOMNode(this);
		}
	}, {
		key: 'MDCHandleProps',
		value: function MDCHandleProps(props, isInitialMount) {
			// Use this in the consumer to handle any api props that have changed
		}
	}, {
		key: 'MDCComponentDidMount',
		value: function MDCComponentDidMount() {
			// Use this in the consumer to handle registering any listeners for MDC
		}
	}]);

	return MDCComponentBase;
}(React.Component);

Object.defineProperty(MDCComponentBase, 'MDCComponentClass', {
	enumerable: true,
	writable: true,
	value: undefined
});
Object.defineProperty(MDCComponentBase, 'propTypes', {
	enumerable: true,
	writable: true,
	value: {
		apiRef: PropTypes.func
	}
});
Object.defineProperty(MDCComponentBase, 'defaultProps', {
	enumerable: true,
	writable: true,
	value: {
		apiRef: noop
	}
});
Object.defineProperty(MDCComponentBase, 'propMeta', {
	enumerable: true,
	writable: true,
	value: propMeta({
		apiRef: {
			type: 'Function',
			desc: 'A callback that receives the MDC api instance as its only argument.'
		}
	})
});
export default MDCComponentBase;

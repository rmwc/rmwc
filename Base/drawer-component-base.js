var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import MDCComponentBase from './mdc-component-base';
import { propMeta } from './prop-meta';
import { noop } from '../Base/noop';

export var DrawerBase = function (_MDCComponentBase) {
	_inherits(DrawerBase, _MDCComponentBase);

	function DrawerBase() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, DrawerBase);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DrawerBase.__proto__ || Object.getPrototypeOf(DrawerBase)).call.apply(_ref, [this].concat(args))), _this), Object.defineProperty(_this, 'childOnClickRefs', {
			enumerable: true,
			writable: true,
			value: []
		}), _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(DrawerBase, [{
		key: 'MDCComponentDidMount',
		value: function MDCComponentDidMount() {
			var _this2 = this;

			// Reacts events are delegated to the body but Material is using stopPropagation, preventing any
			// onClick events in the drawer from firing/
			// Am unfortunate solution, monkeypatch the internal handlers to work without stopProp

			// store the handler
			var componentClickHandler = this.MDCApi.foundation_.componentClickHandler_;

			// remove the old one
			this.MDCApi.foundation_.adapter_.deregisterInteractionHandler('click', this.MDCApi.foundation_.componentClickHandler_);

			// The drawer click handler only stopsProp, we are just going to remove it
			// and add logic to check if the drawer should close to the component click handler
			this.MDCApi.foundation_.adapter_.deregisterDrawerInteractionHandler('click', this.MDCApi.foundation_.drawerClickHandler_);

			// replace with new function
			this.MDCApi.foundation_.componentClickHandler_ = function (evt) {
				var path = evt.composedPath ? evt.composedPath() : evt.deepPath || evt.path;
				var drawerClickedWasClicked = path.some(function (el) {
					return el.classList && el.classList.contains('mdc-temporary-drawer__drawer');
				});
				if (!drawerClickedWasClicked && componentClickHandler) {
					componentClickHandler(evt);
				}
			};

			// rebind
			this.MDCApi.foundation_.adapter_.registerInteractionHandler('click', this.MDCApi.foundation_.componentClickHandler_);

			this.MDCRegisterListener(this.constructor.drawerConstructorName + ':open', function (evt) {
				return _this2.props.onOpen(evt);
			});
			this.MDCRegisterListener(this.constructor.drawerConstructorName + ':close', function (evt) {
				return _this2.props.onClose(evt);
			});
		}
	}, {
		key: 'MDCHandleProps',
		value: function MDCHandleProps(nextProps) {
			if (this.MDCApi.open !== !!nextProps.open) {
				this.MDCApi.open = !!nextProps.open;
			}
		}
	}]);

	return DrawerBase;
}(MDCComponentBase);

Object.defineProperty(DrawerBase, 'drawerConstructorName', {
	enumerable: true,
	writable: true,
	value: ''
});
Object.defineProperty(DrawerBase, 'propTypes', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		open: PropTypes.bool,
		onClose: PropTypes.func,
		onOpen: PropTypes.func
	}, MDCComponentBase.propTypes)
});
Object.defineProperty(DrawerBase, 'defaultProps', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		open: false,
		onClose: noop,
		onOpen: noop
	}, MDCComponentBase.defaultProps)
});
Object.defineProperty(DrawerBase, 'propMeta', {
	enumerable: true,
	writable: true,
	value: propMeta(Object.assign({
		open: {
			type: 'Boolean',
			desc: 'Opens or closes the Drawer.'
		},
		onClose: {
			type: 'Function',
			desc: 'Callback that fires when the Drawer is closed,'
		},
		onOpen: {
			type: 'Function',
			desc: 'Callback that fires when the Drawer is opened.'
		}
	}, MDCComponentBase.propMeta))
});
export default DrawerBase;

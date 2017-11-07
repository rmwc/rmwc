var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { MDCSimpleMenu } from '@material/menu/dist/mdc.menu';
import { propMeta } from '../Base/prop-meta';
import { noop } from '../Base/noop';
import MDCComponentBase from '../Base/mdc-component-base';
import { List, ListItem } from '../List';
import { simpleComponentFactory } from '../Base/simple-component-factory';

export var MenuItem = function MenuItem(props) {
	return React.createElement(
		ListItem,
		Object.assign({ role: 'menuitem', tabIndex: '0' }, props),
		props.children
	);
};

MenuItem.propTypes = ListItem.propTypes;
MenuItem.defaultProps = ListItem.defaultProps;
MenuItem.propMeta = ListItem.propMeta;

export var MenuAnchor = simpleComponentFactory('MenuAnchor', {
	classNames: 'mdc-menu-anchor'
});

export var MenuRoot = simpleComponentFactory('MenuRoot', {
	classNames: 'mdc-simple-menu',
	defaultProps: {
		tabIndex: '-1'
	}
});

export var Menu = function (_MDCComponentBase) {
	_inherits(Menu, _MDCComponentBase);

	function Menu() {
		_classCallCheck(this, Menu);

		return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
	}

	_createClass(Menu, [{
		key: 'MDCComponentDidMount',
		value: function MDCComponentDidMount() {
			var _this2 = this;

			this.MDCRegisterListener('MDCSimpleMenu:cancel', function (evt) {
				return _this2.handleOnChange(evt);
			});
			this.MDCRegisterListener('MDCSimpleMenu:selected', function (evt) {
				_this2.handleOnChange(evt);
				_this2.props.onSelected(evt);
			});
		}
	}, {
		key: 'MDCHandleProps',
		value: function MDCHandleProps(nextProps) {
			if (nextProps.open !== undefined && this.MDCApi.open !== nextProps.open) {
				this.MDCApi.open = nextProps.open;
			}
		}
	}, {
		key: 'handleOnChange',
		value: function handleOnChange(evt) {
			evt.target.value = false;
			this.props.onClose(evt);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props = this.props,
			    children = _props.children,
			    open = _props.open,
			    onClose = _props.onClose,
			    onSelected = _props.onSelected,
			    apiRef = _props.apiRef,
			    rest = _objectWithoutProperties(_props, ['children', 'open', 'onClose', 'onSelected', 'apiRef']);

			return React.createElement(
				MenuRoot,
				Object.assign({ elementRef: function elementRef(el) {
						return _this3.MDCSetRootElement(el);
					} }, rest),
				React.createElement(
					List,
					{ className: 'mdc-simple-menu__items', role: 'menu', 'aria-hidden': 'true' },
					children
				)
			);
		}
	}]);

	return Menu;
}(MDCComponentBase);
Object.defineProperty(Menu, 'MDCComponentClass', {
	enumerable: true,
	writable: true,
	value: MDCSimpleMenu
});
Object.defineProperty(Menu, 'propTypes', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		open: PropTypes.bool,
		onClose: PropTypes.func,
		onSelected: PropTypes.func
	}, MDCComponentBase.propTypes, MenuRoot.propTypes)
});
Object.defineProperty(Menu, 'defaultProps', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		onClose: noop,
		onSelected: noop
	}, MDCComponentBase.defaultProps, MenuRoot.defaultProps)
});
Object.defineProperty(Menu, 'propMeta', {
	enumerable: true,
	writable: true,
	value: propMeta(Object.assign({
		open: {
			type: 'Boolean',
			desc: 'Whether or not the Menu is open.'
		},
		onClose: {
			type: 'Function',
			desc: 'Callback that fires when the Menu closes.'
		},
		onSelected: {
			type: 'Function',
			desc: 'Callback that fires when a Menu item is selected.'
		}
	}, MDCComponentBase.propMeta, MenuRoot.propMeta))
});

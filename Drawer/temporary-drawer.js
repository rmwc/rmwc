var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { simpleComponentFactory } from '../Base/simple-component-factory';
import { propMeta } from '../Base/prop-meta';
import { List } from '../List';
import { DrawerBase } from '../Base/drawer-component-base';
import { MDCTemporaryDrawer } from '@material/drawer/dist/mdc.drawer';

/***************************************************************************************
 * Drawer Headers
 ***************************************************************************************/
export var TemporaryDrawerHeaderRoot = simpleComponentFactory('TemporaryDrawerHeader', {
	classNames: 'mdc-temporary-drawer__header'
});

export var TemporaryDrawerHeaderContent = simpleComponentFactory('TemporaryDrawerHeaderContent', {
	classNames: 'mdc-temporary-drawer__header-content'
});

export var TemporaryDrawerHeader = function (_React$Component) {
	_inherits(TemporaryDrawerHeader, _React$Component);

	function TemporaryDrawerHeader() {
		_classCallCheck(this, TemporaryDrawerHeader);

		return _possibleConstructorReturn(this, (TemporaryDrawerHeader.__proto__ || Object.getPrototypeOf(TemporaryDrawerHeader)).apply(this, arguments));
	}

	_createClass(TemporaryDrawerHeader, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    children = _props.children,
			    rest = _objectWithoutProperties(_props, ['children']);

			return React.createElement(
				TemporaryDrawerHeaderRoot,
				rest,
				React.createElement(
					TemporaryDrawerHeaderContent,
					null,
					children
				)
			);
		}
	}]);

	return TemporaryDrawerHeader;
}(React.Component);

/***************************************************************************************
 * Drawer Content
 ***************************************************************************************/
Object.defineProperty(TemporaryDrawerHeader, 'propTypes', {
	enumerable: true,
	writable: true,
	value: Object.assign({}, TemporaryDrawerHeaderRoot.propTypes)
});
Object.defineProperty(TemporaryDrawerHeader, 'defaultProps', {
	enumerable: true,
	writable: true,
	value: Object.assign({}, TemporaryDrawerHeaderRoot.defaultProps)
});
Object.defineProperty(TemporaryDrawerHeader, 'propMeta', {
	enumerable: true,
	writable: true,
	value: propMeta(Object.assign({}, TemporaryDrawerHeaderRoot.propMeta))
});
export var TemporaryDrawerContent = simpleComponentFactory('TemporaryDrawerContent', {
	tag: List,
	classNames: 'mdc-temporary-drawer__content'
});

/***************************************************************************************
 * Drawers
 ***************************************************************************************/
export var TemporaryDrawerRoot = simpleComponentFactory('TemporaryDrawerRoot', {
	tag: 'aside',
	classNames: 'mdc-temporary-drawer'
});

export var TemporaryDrawerDrawer = simpleComponentFactory('TemporaryDrawerDrawer', {
	tag: 'header',
	classNames: 'mdc-temporary-drawer__drawer'
});

export var TemporaryDrawer = function (_DrawerBase) {
	_inherits(TemporaryDrawer, _DrawerBase);

	function TemporaryDrawer() {
		_classCallCheck(this, TemporaryDrawer);

		return _possibleConstructorReturn(this, (TemporaryDrawer.__proto__ || Object.getPrototypeOf(TemporaryDrawer)).apply(this, arguments));
	}

	_createClass(TemporaryDrawer, [{
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props2 = this.props,
			    children = _props2.children,
			    onOpen = _props2.onOpen,
			    onClose = _props2.onClose,
			    open = _props2.open,
			    apiRef = _props2.apiRef,
			    rest = _objectWithoutProperties(_props2, ['children', 'onOpen', 'onClose', 'open', 'apiRef']);

			return React.createElement(
				TemporaryDrawerRoot,
				Object.assign({
					elementRef: function elementRef(el) {
						return _this3.MDCSetRootElement(el);
					}
				}, rest),
				React.createElement(
					TemporaryDrawerDrawer,
					{ elementRef: function elementRef(el) {
							return _this3.drawerEl = el;
						} },
					children
				)
			);
		}
	}]);

	return TemporaryDrawer;
}(DrawerBase);

Object.defineProperty(TemporaryDrawer, 'MDCComponentClass', {
	enumerable: true,
	writable: true,
	value: MDCTemporaryDrawer
});
Object.defineProperty(TemporaryDrawer, 'drawerConstructorName', {
	enumerable: true,
	writable: true,
	value: 'MDCTemporaryDrawer'
});
Object.defineProperty(TemporaryDrawer, 'propTypes', {
	enumerable: true,
	writable: true,
	value: Object.assign({}, DrawerBase.propTypes, TemporaryDrawerRoot.propTypes)
});
Object.defineProperty(TemporaryDrawer, 'defaultProps', {
	enumerable: true,
	writable: true,
	value: Object.assign({}, DrawerBase.defaultProps, TemporaryDrawerRoot.defaultProps)
});
Object.defineProperty(TemporaryDrawer, 'propMeta', {
	enumerable: true,
	writable: true,
	value: propMeta(Object.assign({}, DrawerBase.propMeta, TemporaryDrawerRoot.propMeta))
});
export default TemporaryDrawer;

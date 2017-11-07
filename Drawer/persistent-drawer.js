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
import { MDCPersistentDrawer } from '@material/drawer/dist/mdc.drawer';

/***************************************************************************************
 * Drawer Headers
 ***************************************************************************************/
export var PersistentDrawerHeaderRoot = simpleComponentFactory('PersistentDrawerHeader', {
	classNames: 'mdc-persistent-drawer__header'
});

export var PersistentDrawerHeaderContent = simpleComponentFactory('PersistentDrawerHeaderContent', {
	classNames: 'mdc-persistent-drawer__header-content'
});

export var PersistentDrawerHeader = function (_React$Component) {
	_inherits(PersistentDrawerHeader, _React$Component);

	function PersistentDrawerHeader() {
		_classCallCheck(this, PersistentDrawerHeader);

		return _possibleConstructorReturn(this, (PersistentDrawerHeader.__proto__ || Object.getPrototypeOf(PersistentDrawerHeader)).apply(this, arguments));
	}

	_createClass(PersistentDrawerHeader, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    children = _props.children,
			    rest = _objectWithoutProperties(_props, ['children']);

			return React.createElement(
				PersistentDrawerHeaderRoot,
				rest,
				React.createElement(
					PersistentDrawerHeaderContent,
					null,
					children
				)
			);
		}
	}]);

	return PersistentDrawerHeader;
}(React.Component);

/***************************************************************************************
 * Drawer Content
 ***************************************************************************************/
Object.defineProperty(PersistentDrawerHeader, 'propTypes', {
	enumerable: true,
	writable: true,
	value: Object.assign({}, PersistentDrawerHeaderRoot.propTypes)
});
Object.defineProperty(PersistentDrawerHeader, 'defaultProps', {
	enumerable: true,
	writable: true,
	value: Object.assign({}, PersistentDrawerHeaderRoot.defaultProps)
});
Object.defineProperty(PersistentDrawerHeader, 'propMeta', {
	enumerable: true,
	writable: true,
	value: propMeta(Object.assign({}, PersistentDrawerHeaderRoot.propMeta))
});
export var PersistentDrawerContent = simpleComponentFactory('PersistentDrawerContent', {
	tag: List,
	classNames: 'mdc-persistent-drawer__content'
});

/***************************************************************************************
 * Drawers
 ***************************************************************************************/

export var PersistentDrawerRoot = simpleComponentFactory('PersistentDrawerRoot', {
	tag: 'aside',
	classNames: 'mdc-persistent-drawer'
});

export var PersistentDrawerDrawer = simpleComponentFactory('PersistentDrawerDrawer', {
	tag: 'header',
	classNames: 'mdc-persistent-drawer__drawer'
});

export var PersistentDrawer = function (_DrawerBase) {
	_inherits(PersistentDrawer, _DrawerBase);

	function PersistentDrawer() {
		_classCallCheck(this, PersistentDrawer);

		return _possibleConstructorReturn(this, (PersistentDrawer.__proto__ || Object.getPrototypeOf(PersistentDrawer)).apply(this, arguments));
	}

	_createClass(PersistentDrawer, [{
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
				PersistentDrawerRoot,
				Object.assign({
					elementRef: function elementRef(el) {
						return _this3.MDCSetRootElement(el);
					}
				}, rest),
				React.createElement(
					PersistentDrawerDrawer,
					{ elementRef: function elementRef(el) {
							return _this3.drawerEl = el;
						} },
					children
				)
			);
		}
	}]);

	return PersistentDrawer;
}(DrawerBase);

Object.defineProperty(PersistentDrawer, 'MDCComponentClass', {
	enumerable: true,
	writable: true,
	value: MDCPersistentDrawer
});
Object.defineProperty(PersistentDrawer, 'drawerConstructorName', {
	enumerable: true,
	writable: true,
	value: 'MDCPersistentDrawer'
});
Object.defineProperty(PersistentDrawer, 'propTypes', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		open: PropTypes.bool
	}, DrawerBase.propTypes, PersistentDrawerRoot.propTypes)
});
Object.defineProperty(PersistentDrawer, 'defaultProps', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		open: false
	}, DrawerBase.defaultProps, PersistentDrawerRoot.defaultProps)
});
Object.defineProperty(PersistentDrawer, 'propMeta', {
	enumerable: true,
	writable: true,
	value: propMeta(Object.assign({
		open: {
			type: 'Boolean',
			desc: 'Opens the drawer'
		}
	}, DrawerBase.propMeta, PersistentDrawerRoot.propMeta))
});
export default PersistentDrawer;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { MDCTabBar } from '@material/tabs/dist/mdc.tabs';
import { propMeta } from '../Base/prop-meta';
import { noop } from '../Base/noop';
import MDCComponentBase from '../Base/mdc-component-base';
import simpleComponentFactory from '../Base/simple-component-factory';

export var Tab = simpleComponentFactory('Tab', { classNames: 'mdc-tab' });

export var TabBarRoot = simpleComponentFactory('TabBarRoot', {
	tag: 'nav',
	classNames: 'mdc-tab-bar'
});

export var TabBarIndicatorEl = simpleComponentFactory('TabBarIndicatorEl', {
	tag: 'span',
	classNames: 'mdc-tab-bar__indicator'
});

export var TabBar = function (_MDCComponentBase) {
	_inherits(TabBar, _MDCComponentBase);

	function TabBar() {
		_classCallCheck(this, TabBar);

		return _possibleConstructorReturn(this, (TabBar.__proto__ || Object.getPrototypeOf(TabBar)).apply(this, arguments));
	}

	_createClass(TabBar, [{
		key: 'MDCComponentDidMount',
		value: function MDCComponentDidMount() {
			var _this2 = this;

			this.MDCRegisterListener('MDCTabBar:change', function (evt) {
				evt.target.value = _this2.MDCApi.activeTabIndex;
				_this2.props.onChange(evt);
			});
		}
	}, {
		key: 'MDCHandleProps',
		value: function MDCHandleProps(props) {
			if (props.activeTabIndex !== this.props.activeTabIndex) {
				this.MDCApi.activeTabIndex = props.activeTabIndex;
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props = this.props,
			    apiRef = _props.apiRef,
			    activeTabIndex = _props.activeTabIndex,
			    children = _props.children,
			    rest = _objectWithoutProperties(_props, ['apiRef', 'activeTabIndex', 'children']);

			return React.createElement(
				TabBarRoot,
				Object.assign({ elementRef: function elementRef(el) {
						return _this3.MDCSetRootElement(el);
					} }, rest),
				children,
				React.createElement(TabBarIndicatorEl, null)
			);
		}
	}]);

	return TabBar;
}(MDCComponentBase);

Object.defineProperty(TabBar, 'MDCComponentClass', {
	enumerable: true,
	writable: true,
	value: MDCTabBar
});
Object.defineProperty(TabBar, 'propTypes', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		onChange: PropTypes.func,
		activeTabIndex: PropTypes.number
	}, MDCComponentBase.propTypes, TabBarRoot.propTypes)
});
Object.defineProperty(TabBar, 'defaultProps', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		onChange: noop,
		activeTabIndex: 0
	}, TabBarRoot.defaultProps, MDCComponentBase.defaultProps)
});
Object.defineProperty(TabBar, 'propMeta', {
	enumerable: true,
	writable: true,
	value: propMeta(Object.assign({
		onChange: {
			type: 'Function',
			desc: 'Callback when the active tab changes. Receives event as an argument with event.target.value set to the activeTabIndex'
		},
		activeTabIndex: {
			type: 'Integer',
			desc: 'The index of the active tab'
		}
	}, TabBarRoot.propMeta, MDCComponentBase.propMeta))
});
export default TabBar;

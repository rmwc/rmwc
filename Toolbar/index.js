var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCToolbar } from '@material/toolbar/dist/mdc.toolbar';

import MDCComponentBase from '../Base/mdc-component-base';
import simpleComponentFactory from '../Base/simple-component-factory';
import { propMeta } from '../Base/prop-meta';

export var ToolbarRoot = simpleComponentFactory('Toolbar', {
	tag: 'header',
	classNames: function classNames(props) {
		return ['mdc-toolbar', {
			'mdc-toolbar--fixed': props.fixed,
			'mdc-toolbar--waterfall': props.waterfall,
			'mdc-toolbar--fixed-lastrow-only': props.fixedLastrowOnly,
			'mdc-toolbar--flexible': props.flexible
		}];
	},
	propTypes: {
		fixed: PropTypes.bool,
		waterfall: PropTypes.bool,
		fixedLastrowOnly: PropTypes.bool,
		flexible: PropTypes.bool
	},
	defaultProps: {
		fixed: false,
		waterfall: false,
		fixedLastrowOnly: false,
		flexible: false
	},
	consumeProps: ['fixed', 'waterfall', 'fixedLastrowOnly', 'flexible']
});

export var ToolbarTitle = simpleComponentFactory('ToolbarTitle', {
	classNames: 'mdc-toolbar__title'
});

export var ToolbarSection = simpleComponentFactory('ToolbarSection', {
	tag: 'section',
	classNames: function classNames(props) {
		return ['mdc-toolbar__section', {
			'mdc-toolbar__section--align-start': props.alignStart,
			'mdc-toolbar__section--align-end': props.alignEnd,
			'mdc-toolbar__section--shrink-to-fit': props.shrinkToFit
		}];
	},
	propTypes: {
		alignStart: PropTypes.bool,
		alignEnd: PropTypes.bool,
		shrinkToFit: PropTypes.bool
	},
	defaultProps: {
		alignStart: false,
		alignEnd: false,
		shrinkToFit: false
	},
	propMeta: {
		alignStart: {
			type: 'Boolean',
			desc: 'Aligns the ToolbarSection at the start.'
		},
		alignEnd: {
			type: 'Boolean',
			desc: 'Aligns the ToolbarSection at the end.'
		},
		shrinkToFit: {
			type: 'Boolean',
			desc: 'Makes the ToolbarSection shrink to fit.'
		}
	},
	consumeProps: ['alignStart', 'alignEnd', 'shrinkToFit']
});

export var ToolbarRow = simpleComponentFactory('ToolbarRow', {
	classNames: 'mdc-toolbar__row'
});

export var ToolbarFixedAdjust = simpleComponentFactory('ToolbarFixedAdjust', {
	classNames: 'mdc-toolbar-fixed-adjust'
});

export var Toolbar = function (_MDCComponentBase) {
	_inherits(Toolbar, _MDCComponentBase);

	function Toolbar() {
		_classCallCheck(this, Toolbar);

		return _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).apply(this, arguments));
	}

	_createClass(Toolbar, [{
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps) {
			var _this2 = this;

			var didChange = ['fixedLastrowOnly', 'flexible'].some(function (key) {
				return _this2.MDCApi[key] !== prevProps[key];
			});
			if (didChange) {
				var firstRow = this.MDCGetRootElement().querySelector('.mdc-toolbar__row');
				firstRow && firstRow.removeAttribute('style');
				this.MDCComponentReinit();
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props = this.props,
			    apiRef = _props.apiRef,
			    rest = _objectWithoutProperties(_props, ['apiRef']);

			return React.createElement(ToolbarRoot, Object.assign({ elementRef: function elementRef(el) {
					return _this3.MDCSetRootElement(el);
				} }, rest));
		}
	}]);

	return Toolbar;
}(MDCComponentBase);

Object.defineProperty(Toolbar, 'MDCComponentClass', {
	enumerable: true,
	writable: true,
	value: MDCToolbar
});
Object.defineProperty(Toolbar, 'propTypes', {
	enumerable: true,
	writable: true,
	value: Object.assign({}, ToolbarRoot.propTypes, MDCComponentBase.propTypes)
});
Object.defineProperty(Toolbar, 'defaultProps', {
	enumerable: true,
	writable: true,
	value: Object.assign({}, ToolbarRoot.defaultProps, MDCComponentBase.defaultProps)
});
Object.defineProperty(Toolbar, 'propMeta', {
	enumerable: true,
	writable: true,
	value: propMeta(Object.assign({}, ToolbarRoot.propMeta, MDCComponentBase.propMeta))
});
export default Toolbar;

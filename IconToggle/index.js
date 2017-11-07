var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCIconToggle } from '@material/icon-toggle/dist/mdc.iconToggle';
import { Icon } from '../Icon';
import { propMeta } from '../Base/prop-meta';
import { noop } from '../Base/noop';
import MDCComponentBase from '../Base/mdc-component-base';

export var IconToggle = function (_MDCComponentBase) {
	_inherits(IconToggle, _MDCComponentBase);

	function IconToggle() {
		_classCallCheck(this, IconToggle);

		return _possibleConstructorReturn(this, (IconToggle.__proto__ || Object.getPrototypeOf(IconToggle)).apply(this, arguments));
	}

	_createClass(IconToggle, [{
		key: 'MDCComponentDidMount',
		value: function MDCComponentDidMount() {
			var _this2 = this;

			if (this.props.onChange) {
				this.MDCRegisterListener('MDCIconToggle:change', function (_ref) {
					var detail = _ref.detail;

					_this2.props.onChange(Object.assign({}, detail, {
						target: {
							value: detail.isOn
						}
					}));
				});
			}
		}
	}, {
		key: 'MDCHandleProps',
		value: function MDCHandleProps(props) {
			if (props.value !== undefined) {
				this.api.on = !!props.value;
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props = this.props,
			    className = _props.className,
			    children = _props.children,
			    value = _props.value,
			    apiRef = _props.apiRef,
			    on = _props.on,
			    off = _props.off,
			    rest = _objectWithoutProperties(_props, ['className', 'children', 'value', 'apiRef', 'on', 'off']);

			var classes = classNames('mdc-icon-toggle', className);

			var ariaPressed = value !== undefined ? !!value : false;
			var toggleOnJSON = JSON.stringify(on);
			var toggleOffJSON = JSON.stringify(off);
			return React.createElement(Icon, Object.assign({
				elementRef: function elementRef(el) {
					return _this3.MDCSetRootElement(el);
				},
				className: classes
			}, rest, {
				'data-toggle-on': toggleOnJSON,
				'data-toggle-off': toggleOffJSON,
				role: 'button',
				'aria-pressed': ariaPressed,
				tabIndex: '0'
			}));
		}
	}]);

	return IconToggle;
}(MDCComponentBase);

Object.defineProperty(IconToggle, 'MDCComponentClass', {
	enumerable: true,
	writable: true,
	value: MDCIconToggle
});
Object.defineProperty(IconToggle, 'propTypes', {
	enumerable: true,
	writable: true,
	value: Object.assign({}, MDCComponentBase.propTypes, {
		onChange: PropTypes.func,
		on: PropTypes.object.isRequired,
		off: PropTypes.object.isRequired
	})
});
Object.defineProperty(IconToggle, 'defaultProps', {
	enumerable: true,
	writable: true,
	value: Object.assign({}, MDCComponentBase.defaultProps, {
		onChange: noop,
		on: undefined,
		off: undefined
	})
});
Object.defineProperty(IconToggle, 'propMeta', {
	enumerable: true,
	writable: true,
	value: propMeta(Object.assign({}, MDCComponentBase.propMeta, {
		onChange: {
			type: 'Function',
			desc: 'An onChange callback that receives an event with event.target.value set to true or false.'
		},
		on: {
			type: 'Object',
			desc: 'An object that can be parsed as valid JSON that gets passed to the MDC constructor.'
		},
		off: {
			type: 'Object',
			desc: 'An object that can be parsed as valid JSON that gets passed to the MDC constructor.'
		}
	}))
});
export default IconToggle;

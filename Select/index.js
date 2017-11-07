var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { MDCSelect } from '@material/select/dist/mdc.select';
import MDCComponentBase from '../Base/mdc-component-base';
import { propMeta } from '../Base/prop-meta';
import { List, ListItem } from '../List';
import { simpleComponentFactory } from '../Base/simple-component-factory';

export var SelectRoot = simpleComponentFactory('SelectRoot', {
	classNames: 'mdc-select',
	defaultProps: {
		role: 'listbox',
		tabIndex: '0'
	}
});

export var SelectSelectedText = simpleComponentFactory('SelectSelectedText', {
	tag: 'span',
	classNames: 'mdc-select__selected-text'
});

export var SelectLabel = function SelectLabel(props) {
	return React.createElement(
		'div',
		{
			style: { position: 'absolute', marginTop: '34px', whiteSpace: 'nowrap' }
		},
		React.createElement(
			'label',
			{ className: 'mdc-textfield__label mdc-textfield__label--float-above' },
			props.children
		)
	);
};

export var SelectMenu = simpleComponentFactory('SelectMenu', {
	classNames: 'mdc-simple-menu mdc-select__menu'
});

export var SelectFormField = simpleComponentFactory('SelectMenu', {
	classNames: 'rmwc-select-form-field',
	defaultProps: {
		style: {
			height: '48px',
			marginTop: '16px',
			marginBottom: '8px',
			display: 'inline-flex',
			alignItems: 'flex-end'
		}
	}
});

export var Select = function (_MDCComponentBase) {
	_inherits(Select, _MDCComponentBase);

	function Select() {
		_classCallCheck(this, Select);

		return _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).apply(this, arguments));
	}

	_createClass(Select, [{
		key: 'MDCComponentDidMount',
		value: function MDCComponentDidMount() {
			var _this2 = this;

			this.MDCRegisterListener('MDCSelect:change', function (evt) {
				evt.target.value = _this2.MDCApi.value;
				_this2.props.onChange && _this2.props.onChange(evt);
			});
			window.requestAnimationFrame(function () {
				return _this2.MDCApi.foundation_.resize();
			});
		}
	}, {
		key: 'MDCHandleProps',
		value: function MDCHandleProps(nextProps) {
			if (this.props.value !== nextProps.value) {
				var newIndex = this.MDCApi.options.indexOf(this.MDCApi.nameditem(nextProps.value));
				this.MDCApi.selectedIndex = newIndex == -1 && this.props.placeholder ? 0 : newIndex;
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps) {
			this.MDCApi.foundation_.resize();
		}
	}, {
		key: 'getDisplayValue',
		value: function getDisplayValue(value, options, placeholder) {
			placeholder = placeholder || '\xA0';

			if (options) {
				return options[value] !== undefined ? options[value] : placeholder;
			}

			return value || placeholder;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props = this.props,
			    _props$placeholder = _props.placeholder,
			    placeholder = _props$placeholder === undefined ? '' : _props$placeholder,
			    value = _props.value,
			    _props$label = _props.label,
			    label = _props$label === undefined ? '' : _props$label,
			    options = _props.options,
			    apiRef = _props.apiRef,
			    rest = _objectWithoutProperties(_props, ['placeholder', 'value', 'label', 'options', 'apiRef']);

			var selectOptions = Array.isArray(options) ? new Map(options.map(function (val) {
				return [val, val];
			})) : new Map(Object.entries(options).map(function (_ref) {
				var _ref2 = _slicedToArray(_ref, 2),
				    val = _ref2[0],
				    label = _ref2[1];

				return [label, val];
			}));

			var displayValue = this.getDisplayValue(value, selectOptions, placeholder);

			return React.createElement(
				SelectRoot,
				Object.assign({ elementRef: function elementRef(el) {
						return _this3.MDCSetRootElement(el);
					} }, rest),
				React.createElement(
					SelectSelectedText,
					null,
					displayValue
				),
				!!label.length && React.createElement(
					SelectLabel,
					null,
					label
				),
				React.createElement(
					SelectMenu,
					null,
					React.createElement(
						List,
						{ className: 'mdc-simple-menu__items' },
						!!placeholder.length && React.createElement(
							ListItem,
							{ role: 'option', id: 'placeholder', 'aria-disabled': 'true' },
							placeholder
						),
						options && Array.from(selectOptions).map(function (_ref3, i) {
							var _ref4 = _slicedToArray(_ref3, 2),
							    optionLabel = _ref4[0],
							    optionVal = _ref4[1];

							return React.createElement(
								ListItem,
								{ key: i, role: 'option', id: optionVal, tabIndex: '0' },
								optionLabel
							);
						})
					)
				)
			);
		}
	}]);

	return Select;
}(MDCComponentBase);

Object.defineProperty(Select, 'MDCComponentClass', {
	enumerable: true,
	writable: true,
	value: MDCSelect
});
Object.defineProperty(Select, 'propTypes', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
		label: PropTypes.string,
		placeholder: PropTypes.string,
		disabled: PropTypes.bool
	}, MDCComponentBase.propTypes)
});
Object.defineProperty(Select, 'defaultProps', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		options: undefined,
		label: undefined,
		placeholder: undefined,
		disabled: false
	}, MDCComponentBase.defaultProps)
});
Object.defineProperty(Select, 'propMeta', {
	enumerable: true,
	writable: true,
	value: propMeta(Object.assign({
		placeholder: {
			type: 'String',
			desc: 'Placeholder text for the form control.'
		},
		options: {
			type: ['Array', 'Object'],
			desc: 'An array of values or a map of {value: "label"}. Arrays will be converted to a map of {value: value}.'
		},
		label: {
			type: 'String',
			desc: 'A label for the form control.'
		},
		disabled: {
			type: 'Boolean',
			desc: 'Disables the form control.'
		}
	}, MDCComponentBase.propMeta))
});
export default Select;

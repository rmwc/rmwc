var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { MDCTextfield } from '@material/textfield/dist/mdc.textfield';
import classNames from 'classnames';
import { propMeta } from '../Base/prop-meta';
import { noop } from '../Base/noop';
import MDCComponentBase from '../Base/mdc-component-base';
import simpleComponentFactory from '../Base/simple-component-factory';

export var TextfieldRoot = simpleComponentFactory('TextfieldRoot', {
	tag: 'label',
	classNames: function classNames(props) {
		return ['mdc-textfield', { 'mdc-textfield--textarea': props.textarea }];
	},
	consumeProps: ['textarea']
});

export var TextfieldLabel = simpleComponentFactory('TextfieldLabel', {
	tag: 'span',
	classNames: function classNames(props) {
		return ['mdc-textfield__label', {
			'mdc-textfield__label--float-above': props.value
		}];
	},
	consumeProps: ['value']
});

export var TextfieldInput = simpleComponentFactory('TextfieldInput', {
	tag: 'input',
	classNames: 'mdc-textfield__input',
	defaultProps: {
		type: 'text'
	}
});

export var TextfieldTextarea = simpleComponentFactory('TextfieldTextarea', {
	tag: 'textarea',
	classNames: 'mdc-textfield__input'
});

export var Textfield = function (_MDCComponentBase) {
	_inherits(Textfield, _MDCComponentBase);

	function Textfield() {
		_classCallCheck(this, Textfield);

		return _possibleConstructorReturn(this, (Textfield.__proto__ || Object.getPrototypeOf(Textfield)).apply(this, arguments));
	}

	_createClass(Textfield, [{
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps) {
			if (prevProps.textarea !== this.props.textarea) {
				this.MDCComponentReinit();
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    _props$label = _props.label,
			    label = _props$label === undefined ? '' : _props$label,
			    className = _props.className,
			    inputRef = _props.inputRef,
			    apiRef = _props.apiRef,
			    children = _props.children,
			    textarea = _props.textarea,
			    rest = _objectWithoutProperties(_props, ['label', 'className', 'inputRef', 'apiRef', 'children', 'textarea']);

			var tagProps = Object.assign({
				elementRef: inputRef
			}, rest);

			var tag = textarea ? React.createElement(TextfieldTextarea, tagProps) : React.createElement(TextfieldInput, tagProps);

			return React.createElement(
				TextfieldRoot,
				{
					className: className,
					textarea: textarea,
					elementRef: function elementRef(el) {
						return _this2.MDCSetRootElement(el);
					}
				},
				children,
				tag,
				React.createElement(
					TextfieldLabel,
					{ value: this.props.value },
					label
				)
			);
		}
	}]);

	return Textfield;
}(MDCComponentBase);

Object.defineProperty(Textfield, 'MDCComponentClass', {
	enumerable: true,
	writable: true,
	value: MDCTextfield
});
Object.defineProperty(Textfield, 'propTypes', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		inputRef: PropTypes.func,
		disabled: PropTypes.bool,
		label: PropTypes.any,
		textarea: PropTypes.bool
	}, MDCComponentBase.propTypes)
});
Object.defineProperty(Textfield, 'defaultProps', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		inputRef: noop,
		disabled: false,
		label: undefined,
		textarea: undefined
	}, MDCComponentBase.defaultProps)
});
Object.defineProperty(Textfield, 'propMeta', {
	enumerable: true,
	writable: true,
	value: propMeta(Object.assign({
		inputRef: {
			type: 'Function',
			desc: 'A ref for the native input.'
		},
		disabled: {
			type: 'Boolean',
			desc: 'Disables the input.'
		},
		label: {
			type: 'Any',
			desc: 'A label for the input.'
		},
		textarea: {
			type: 'Boolean',
			desc: 'Creates a multiline textfield'
		}
	}, MDCComponentBase.propMeta))
});
export default Textfield;

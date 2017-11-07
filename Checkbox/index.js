var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import classNames from 'classnames';
import { MDCCheckbox } from '@material/checkbox/dist/mdc.checkbox';
import ToggleBase from '../Base/toggle-component-base';
import FormField from '../FormField';
import { simpleComponentFactory } from '../Base/simple-component-factory';

export var CheckboxRoot = simpleComponentFactory('CheckboxRoot', {
	classNames: 'mdc-checkbox'
});

export var CheckboxNativeControl = simpleComponentFactory('CheckboxNativeControl', {
	tag: 'input',
	classNames: 'mdc-checkbox__native-control',
	defaultProps: {
		type: 'checkbox'
	}
});

export var CheckboxBackground = simpleComponentFactory('CheckboxBackground', {
	classNames: 'mdc-checkbox__background'
});

export var CheckboxCheckmark = simpleComponentFactory('CheckboxCheckmark', {
	tag: 'svg',
	classNames: 'mdc-checkbox__checkmark',
	defaultProps: {
		viewBox: '0 0 24 24'
	}
});

export var CheckboxCheckmarkPath = simpleComponentFactory('CheckboxCheckmarkPath', {
	tag: 'path',
	classNames: 'mdc-checkbox__checkmark__path',
	defaultProps: {
		fill: 'none',
		stroke: 'white',
		d: 'M1.73,12.91 8.1,19.28 22.79,4.59'
	}
});

export var CheckboxMixedmark = simpleComponentFactory('CheckboxMixedmark', {
	classNames: 'mdc-checkbox__mixedmark'
});

export var CheckboxLabel = simpleComponentFactory('CheckboxLabel', {
	tag: 'label'
});

export var Checkbox = function (_ToggleBase) {
	_inherits(Checkbox, _ToggleBase);

	function Checkbox() {
		_classCallCheck(this, Checkbox);

		return _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).apply(this, arguments));
	}

	_createClass(Checkbox, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    _props$label = _props.label,
			    label = _props$label === undefined ? '' : _props$label,
			    id = _props.id,
			    children = _props.children,
			    checked = _props.checked,
			    apiRef = _props.apiRef,
			    indeterminate = _props.indeterminate,
			    rest = _objectWithoutProperties(_props, ['label', 'id', 'children', 'checked', 'apiRef', 'indeterminate']);

			var labelId = id || this.generatedId;
			var checkedProp = checked !== undefined ? { checked: checked } : {};
			var classes = classNames({ 'mdc-checkbox--disabled': rest.disabled });

			var checkbox = React.createElement(
				CheckboxRoot,
				{
					elementRef: function elementRef(el) {
						return _this2.MDCSetRootElement(el);
					},
					className: classes
				},
				React.createElement(CheckboxNativeControl, Object.assign({ id: labelId }, checkedProp, rest)),
				React.createElement(
					CheckboxBackground,
					null,
					React.createElement(
						CheckboxCheckmark,
						null,
						React.createElement(CheckboxCheckmarkPath, null)
					),
					React.createElement(CheckboxMixedmark, null)
				)
			);

			/**
    * We have to conditionally wrap our checkbox in a formfield
    * If we have a label
    */
			if (label.length || children) {
				return React.createElement(
					FormField,
					null,
					checkbox,
					React.createElement(
						CheckboxLabel,
						{ id: labelId + 'label', htmlFor: labelId },
						label,
						children
					)
				);
			} else {
				return checkbox;
			}
		}
	}]);

	return Checkbox;
}(ToggleBase);

Object.defineProperty(Checkbox, 'MDCComponentClass', {
	enumerable: true,
	writable: true,
	value: MDCCheckbox
});
export default Checkbox;

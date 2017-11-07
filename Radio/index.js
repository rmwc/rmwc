var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { MDCRadio } from '@material/radio/dist/mdc.radio';
import ToggleBase from '../Base/toggle-component-base';
import FormField from '../FormField';
import classNames from 'classnames';
import { simpleComponentFactory } from '../Base/simple-component-factory';

export var RadioRoot = simpleComponentFactory('RadioRoot', {
	classNames: 'mdc-radio'
});

export var RadioNativeControl = simpleComponentFactory('RadioNativeControl', {
	tag: 'input',
	classNames: 'mdc-radio__native-control',
	defaultProps: {
		type: 'radio'
	}
});

export var RadioBackground = simpleComponentFactory('RadioBackground', {
	classNames: 'mdc-radio__background'
});

export var RadioOuterCircle = simpleComponentFactory('RadioOuterCircle', {
	classNames: 'mdc-radio__outer-circle'
});

export var RadioInnerCircle = simpleComponentFactory('RadioInnerCircle', {
	classNames: 'mdc-radio__inner-circle'
});

export var RadioLabel = simpleComponentFactory('RadioLabel', {
	tag: 'label'
});

export var Radio = function (_ToggleBase) {
	_inherits(Radio, _ToggleBase);

	function Radio() {
		_classCallCheck(this, Radio);

		return _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).apply(this, arguments));
	}

	_createClass(Radio, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    _props$label = _props.label,
			    label = _props$label === undefined ? '' : _props$label,
			    id = _props.id,
			    children = _props.children,
			    apiRef = _props.apiRef,
			    rest = _objectWithoutProperties(_props, ['label', 'id', 'children', 'apiRef']);

			var labelId = id || this.generatedId;

			var radio = React.createElement(
				RadioRoot,
				{
					elementRef: function elementRef(el) {
						return _this2.MDCSetRootElement(el);
					},
					className: classNames({ 'mdc-radio--disabled': rest.disabled })
				},
				React.createElement(RadioNativeControl, Object.assign({ id: labelId }, rest)),
				React.createElement(
					RadioBackground,
					null,
					React.createElement(RadioOuterCircle, null),
					React.createElement(RadioInnerCircle, null)
				)
			);

			/**
    * We have to conditionally wrap our radio in a FormField
    * If we have a label
    */
			if (label.length || children) {
				return React.createElement(
					FormField,
					null,
					radio,
					React.createElement(
						RadioLabel,
						{ id: labelId + 'label', htmlFor: labelId },
						label,
						children
					)
				);
			} else {
				return radio;
			}
		}
	}]);

	return Radio;
}(ToggleBase);

Object.defineProperty(Radio, 'MDCComponentClass', {
	enumerable: true,
	writable: true,
	value: MDCRadio
});
export default Radio;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ToggleBase from '../Base/toggle-component-base';
import FormField from '../FormField';
import classNames from 'classnames';

import { simpleComponentFactory } from '../Base/simple-component-factory';

export var SwitchRoot = simpleComponentFactory('SwitchRoot', {
	classNames: 'mdc-switch'
});

export var SwitchNativeControl = simpleComponentFactory('SwitchNativeControl', {
	tag: 'input',
	classNames: 'mdc-switch__native-control',
	defaultProps: {
		type: 'checkbox'
	}
});

export var SwitchBackground = simpleComponentFactory('SwitchBackground', {
	classNames: 'mdc-switch__background'
});

export var SwitchKnob = simpleComponentFactory('SwitchKnob', {
	classNames: 'mdc-switch__knob'
});

export var SwitchLabel = simpleComponentFactory('SwitchLabel', {
	tag: 'label'
});

export var Switch = function (_ToggleBase) {
	_inherits(Switch, _ToggleBase);

	function Switch() {
		_classCallCheck(this, Switch);

		return _possibleConstructorReturn(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).apply(this, arguments));
	}

	_createClass(Switch, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    _props$label = _props.label,
			    label = _props$label === undefined ? '' : _props$label,
			    id = _props.id,
			    children = _props.children,
			    apiRef = _props.apiRef,
			    rest = _objectWithoutProperties(_props, ['label', 'id', 'children', 'apiRef']);

			var labelId = id || this.generatedId;

			var switchTag = React.createElement(
				SwitchRoot,
				{
					className: classNames({ 'mdc-switch--disabled': rest.disabled })
				},
				React.createElement(SwitchNativeControl, Object.assign({ id: labelId }, rest)),
				React.createElement(
					SwitchBackground,
					null,
					React.createElement(SwitchKnob, null)
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
					switchTag,
					React.createElement(
						SwitchLabel,
						{ id: labelId + 'label', htmlFor: labelId },
						label,
						children
					)
				);
			} else {
				return switchTag;
			}
		}
	}]);

	return Switch;
}(ToggleBase);

export default Switch;

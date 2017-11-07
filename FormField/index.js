var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';
import { MDCFormField } from '@material/form-field/dist/mdc.formField';
import { simpleComponentFactory } from '../Base/simple-component-factory';
import MDCComponentBase from '../Base/mdc-component-base';

export var FormFieldRoot = simpleComponentFactory('FormFieldRoot', {
	classNames: 'mdc-form-field'
});

export var FormField = function (_MDCComponentBase) {
	_inherits(FormField, _MDCComponentBase);

	function FormField() {
		_classCallCheck(this, FormField);

		return _possibleConstructorReturn(this, (FormField.__proto__ || Object.getPrototypeOf(FormField)).apply(this, arguments));
	}

	_createClass(FormField, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    apiRef = _props.apiRef,
			    rest = _objectWithoutProperties(_props, ['apiRef']);

			return React.createElement(FormFieldRoot, Object.assign({ elementRef: function elementRef(el) {
					return _this2.MDCSetRootElement(el);
				} }, rest));
		}
	}]);

	return FormField;
}(MDCComponentBase);

Object.defineProperty(FormField, 'MDCComponentClass', {
	enumerable: true,
	writable: true,
	value: MDCFormField
});
Object.defineProperty(FormField, 'propTypes', {
	enumerable: true,
	writable: true,
	value: Object.assign({}, MDCComponentBase.propTypes, FormFieldRoot.propTypes)
});
Object.defineProperty(FormField, 'defaultProps', {
	enumerable: true,
	writable: true,
	value: Object.assign({}, MDCComponentBase.defaultProps, FormFieldRoot.defaultProps)
});
Object.defineProperty(FormField, 'propMeta', {
	enumerable: true,
	writable: true,
	value: Object.assign({}, MDCComponentBase.propMeta, FormFieldRoot.propMeta)
});
export default FormField;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import MDCComponentBase from './mdc-component-base';
import { propMeta } from './prop-meta';

export var ToggleBase = function (_MDCComponentBase) {
	_inherits(ToggleBase, _MDCComponentBase);

	function ToggleBase(props) {
		_classCallCheck(this, ToggleBase);

		var _this = _possibleConstructorReturn(this, (ToggleBase.__proto__ || Object.getPrototypeOf(ToggleBase)).call(this, props));

		_this.generatedId = Date.now() + Math.random() + '';
		return _this;
	}

	_createClass(ToggleBase, [{
		key: 'MDCHandleProps',
		value: function MDCHandleProps(nextProps) {
			if (this.MDCApi && nextProps.indeterminate !== this.MDCApi.indeterminate) {
				this.MDCApi.indeterminate = nextProps.indeterminate;
			}
		}
	}]);

	return ToggleBase;
}(MDCComponentBase);

Object.defineProperty(ToggleBase, 'propTypes', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		id: PropTypes.string,
		disabled: PropTypes.bool,
		checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
		indeterminate: PropTypes.bool,
		label: PropTypes.string
	}, MDCComponentBase.propTypes)
});
Object.defineProperty(ToggleBase, 'defaultProps', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		label: undefined,
		id: undefined,
		checked: undefined,
		indeterminate: undefined,
		disabled: false
	}, MDCComponentBase.defaultProps)
});
Object.defineProperty(ToggleBase, 'propMeta', {
	enumerable: true,
	writable: true,
	value: propMeta(Object.assign({
		label: {
			type: 'String',
			desc: 'A label for the form control.'
		},
		id: {
			type: 'String',
			desc: 'A unique ID for the form control. One will be dynamically generated if not provided.'
		},
		checked: {
			type: 'Boolean',
			desc: 'Whether or not the form control is checked.'
		},
		indeterminate: {
			type: 'Boolean',
			desc: '(Checkbox only) puts the check in a half-checked state. Note, that this does not affect the checked property.'
		},
		disabled: {
			type: 'Boolean',
			desc: 'Disables the form control.'
		}
	}, MDCComponentBase.propMeta))
});
export default ToggleBase;

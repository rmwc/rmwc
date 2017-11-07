var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCSlider } from '@material/slider/dist/mdc.slider';
import { propMeta } from '../Base/prop-meta';
import { noop } from '../Base/noop';
import MDCComponentBase from '../Base/mdc-component-base';
import { simpleComponentFactory } from '../Base/simple-component-factory';

export var SliderRoot = simpleComponentFactory('SliderRoot', {
	classNames: 'mdc-slider'
});

export var SliderTrackContainer = simpleComponentFactory('SliderTrackContainer', {
	classNames: 'mdc-slider__track-container'
});

export var SliderTrack = simpleComponentFactory('SliderTrack', {
	classNames: 'mdc-slider__track'
});

export var SliderTrackMarkerContainer = simpleComponentFactory('SliderTrackMarkerContainer', {
	classNames: 'mdc-slider__track-marker-container'
});

export var SliderThumbContainer = simpleComponentFactory('SliderThumbContainer', {
	classNames: 'mdc-slider__thumb-container'
});

export var SliderPin = simpleComponentFactory('SliderPin', {
	classNames: 'mdc-slider__pin'
});

export var SliderPinValueMarker = simpleComponentFactory('SliderPinValueMarker', {
	tag: 'span',
	classNames: 'mdc-slider__pin-value-marker'
});

export var SliderThumb = function SliderThumb(props) {
	return React.createElement(
		'svg',
		{ className: 'mdc-slider__thumb', width: '21', height: '21' },
		React.createElement('circle', { cx: '10.5', cy: '10.5', r: '7.875' })
	);
};

export var SliderFocusRing = simpleComponentFactory('SliderFocusRing', {
	classNames: 'mdc-slider__focus-ring'
});

export var Slider = function (_MDCComponentBase) {
	_inherits(Slider, _MDCComponentBase);

	function Slider() {
		_classCallCheck(this, Slider);

		return _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).apply(this, arguments));
	}

	_createClass(Slider, [{
		key: 'MDCComponentDidMount',
		value: function MDCComponentDidMount() {
			var _this2 = this;

			this.MDCRegisterListener('MDCSlider:input', function (evt) {
				evt.target.value = _this2.MDCApi.value;
				_this2.props.onChange(evt);
			});

			this.MDCRegisterListener('MDCSlider:change', function (evt) {
				evt.target.value = _this2.MDCApi.value;
				_this2.props.onChange(evt);
			});
		}
	}, {
		key: 'MDCHandleProps',
		value: function MDCHandleProps(props) {
			var _this3 = this;

			if (this.MDCApi.value !== props.value) {
				this.MDCApi.value = props.value;
				this.props.onChange({ target: { value: this.MDCApi.value } });
			}

			['min', 'max', 'step', 'disabled'].forEach(function (key) {
				return _this3.MDCApi[key] = props[key];
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var _props = this.props,
			    value = _props.value,
			    min = _props.min,
			    max = _props.max,
			    discrete = _props.discrete,
			    displayMarkers = _props.displayMarkers,
			    apiRef = _props.apiRef,
			    step = _props.step,
			    onChange = _props.onChange,
			    className = _props.className,
			    disabled = _props.disabled,
			    rest = _objectWithoutProperties(_props, ['value', 'min', 'max', 'discrete', 'displayMarkers', 'apiRef', 'step', 'onChange', 'className', 'disabled']);

			if (displayMarkers && !discrete) {
				console.warn('The \'displayMarkers\' prop on rmwc Slider will only work in conjunction with the \'discrete\' prop');
			}

			var classes = classNames(className, {
				'mdc-slider--discrete': discrete,
				'mdc-slider--display-markers': displayMarkers && discrete
			});

			var dataStep = step ? { 'data-step': step } : {};

			return React.createElement(
				SliderRoot,
				Object.assign({
					elementRef: function elementRef(el) {
						return _this4.MDCSetRootElement(el);
					},
					className: classes,
					tabIndex: '0',
					role: 'slider',
					'aria-valuemin': min,
					'aria-valuemax': max,
					'aria-valuenow': value,
					'aria-label': 'Select Value'
				}, disabled ? { 'aria-disabled': disabled } : {}, dataStep, rest),
				React.createElement(
					SliderTrackContainer,
					null,
					React.createElement(SliderTrack, null),
					displayMarkers && React.createElement(SliderTrackMarkerContainer, null)
				),
				React.createElement(
					SliderThumbContainer,
					null,
					discrete && React.createElement(
						SliderPin,
						null,
						React.createElement(SliderPinValueMarker, null)
					),
					React.createElement(SliderThumb, null),
					React.createElement(SliderFocusRing, null)
				)
			);
		}
	}]);

	return Slider;
}(MDCComponentBase);

Object.defineProperty(Slider, 'MDCComponentClass', {
	enumerable: true,
	writable: true,
	value: MDCSlider
});
Object.defineProperty(Slider, 'propTypes', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		onChange: PropTypes.func,
		value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		discrete: PropTypes.bool,
		displayMarkers: PropTypes.bool,
		disabled: PropTypes.bool
	}, MDCComponentBase.propTypes)
});
Object.defineProperty(Slider, 'defaultProps', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		onChange: noop,
		value: 0,
		min: 0,
		max: 100,
		step: undefined,
		discrete: false,
		displayMarkers: false,
		disabled: false
	}, MDCComponentBase.defaultProps)
});
Object.defineProperty(Slider, 'propMeta', {
	enumerable: true,
	writable: true,
	value: propMeta(Object.assign({
		onChange: {
			type: 'Function',
			desc: "A callback that takes an event with event.target.value set to the Slider's value."
		},
		value: {
			type: 'Number',
			desc: 'The value of the Slider.'
		},
		min: {
			type: 'Number',
			desc: 'The minimum value of the Slider.'
		},
		max: {
			type: 'Number',
			desc: 'The maximum value of the Slider'
		},
		step: {
			type: 'Number',
			desc: 'A step to quantize values by.'
		},
		discrete: {
			type: 'Boolean',
			desc: 'Displays the exact value of the Slider on the knob.'
		},
		displayMarkers: {
			type: 'Boolean',
			desc: 'Displays the individual step markers on the Slider track.'
		},
		disabled: {
			type: 'Boolean',
			desc: 'Disables the control.'
		}
	}, MDCComponentBase.propMeta))
});
export default Slider;

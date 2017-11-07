var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { MDCLinearProgress } from '@material/linear-progress/dist/mdc.linearProgress';
import MDCComponentBase from '../Base/mdc-component-base';
import { propMeta } from '../Base/prop-meta';
import { simpleComponentFactory } from '../Base/simple-component-factory';

export var LinearProgressRoot = simpleComponentFactory('LinearProgressRoot', {
	tag: 'nav',
	classNames: function classNames(props) {
		return ['mdc-linear-progress', {
			'mdc-linear-progress--indeterminate': !props.determinate,
			'mdc-linear-progress--reversed': props.reversed,
			'mdc-linear-progress--accent': props.accent
		}];
	},
	propTypes: {
		determinate: PropTypes.bool,
		reversed: PropTypes.bool,
		accent: PropTypes.bool
	},
	defaultProps: {
		role: 'progressbar',
		determinate: true,
		reversed: false,
		accent: false
	},
	consumeProps: ['determinate', 'reversed', 'accent']
});

export var LinearProgressBufferingDots = simpleComponentFactory('LinearProgressBufferingDots', {
	classNames: 'mdc-linear-progress__buffering-dots'
});

export var LinearProgressBuffer = simpleComponentFactory('LinearProgressBuffer', {
	classNames: 'mdc-linear-progress__buffer'
});

export var LinearProgressPrimaryBar = simpleComponentFactory('LinearProgressPrimaryBar', {
	classNames: 'mdc-linear-progress__bar mdc-linear-progress__primary-bar'
});

export var LinearProgressSecondaryBar = simpleComponentFactory('LinearProgressSecondaryBar', {
	classNames: 'mdc-linear-progress__bar mdc-linear-progress__secondary-bar'
});

export var LinearProgressBarInner = simpleComponentFactory('LinearProgressBarInner', {
	classNames: 'mdc-linear-progress__bar-inner'
});

export var LinearProgress = function (_MDCComponentBase) {
	_inherits(LinearProgress, _MDCComponentBase);

	function LinearProgress() {
		_classCallCheck(this, LinearProgress);

		return _possibleConstructorReturn(this, (LinearProgress.__proto__ || Object.getPrototypeOf(LinearProgress)).apply(this, arguments));
	}

	_createClass(LinearProgress, [{
		key: 'MDCHandleProps',
		value: function MDCHandleProps(props) {
			var _this2 = this;

			['progress', 'buffer', 'determinate', 'reversed', 'accent'].forEach(function (key) {
				if (props[key] !== undefined && _this2.MDCApi[key] !== props[key]) {
					_this2.MDCApi[key] = props[key];
				}
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props = this.props,
			    progress = _props.progress,
			    buffer = _props.buffer,
			    apiRef = _props.apiRef,
			    rest = _objectWithoutProperties(_props, ['progress', 'buffer', 'apiRef']);

			return React.createElement(
				LinearProgressRoot,
				Object.assign({
					elementRef: function elementRef(el) {
						return _this3.MDCSetRootElement(el);
					}
				}, rest),
				React.createElement(LinearProgressBufferingDots, null),
				React.createElement(LinearProgressBuffer, null),
				React.createElement(
					LinearProgressPrimaryBar,
					null,
					React.createElement(LinearProgressBarInner, null)
				),
				React.createElement(
					LinearProgressSecondaryBar,
					null,
					React.createElement(LinearProgressBarInner, null)
				)
			);
		}
	}]);

	return LinearProgress;
}(MDCComponentBase);

Object.defineProperty(LinearProgress, 'MDCComponentClass', {
	enumerable: true,
	writable: true,
	value: MDCLinearProgress
});
Object.defineProperty(LinearProgress, 'propTypes', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		progress: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		buffer: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		determinate: PropTypes.bool,
		reversed: PropTypes.bool,
		accent: PropTypes.bool
	}, MDCComponentBase.propTypes)
});
Object.defineProperty(LinearProgress, 'defaultProps', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		progress: 0,
		buffer: undefined,
		determinate: true,
		reversed: false,
		accent: false
	}, MDCComponentBase.defaultProps)
});
Object.defineProperty(LinearProgress, 'propMeta', {
	enumerable: true,
	writable: true,
	value: propMeta(Object.assign({
		progress: {
			type: 'Float',
			desc: 'Progress float percentage between 0 and 1.'
		},
		buffer: {
			type: 'Float',
			desc: 'A Progress buffer float percentage between 0 and 1.'
		},
		determinate: {
			type: 'Boolean',
			desc: 'Whether or not the Progress bar is determinate.'
		},
		reversed: {
			type: 'Boolean',
			desc: 'Progress goes from right to left.'
		},
		accent: {
			type: 'Boolean',
			desc: 'Use the accent color palette.'
		}
	}, MDCComponentBase.propMeta))
});
export default LinearProgress;

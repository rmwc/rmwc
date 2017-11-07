var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { MDCSnackbar } from '@material/snackbar/dist/mdc.snackbar';
import { propMeta } from '../Base/prop-meta';
import { noop } from '../Base/noop';
import MDCComponentBase from '../Base/mdc-component-base';
import simpleComponentFactory from '../Base/simple-component-factory';
import Button from '../Button';

export var SnackbarRoot = simpleComponentFactory('SnackbarRoot', {
	classNames: function classNames(props) {
		return ['mdc-snackbar', {
			'mdc-snackbar--align-start': props.alignStart
		}];
	},
	propTypes: {
		alignStart: PropTypes.bool
	},
	defaultProps: {
		alignStart: false,
		'aria-live': 'assertive',
		'aria-atomic': true,
		'aria-hidden': true
	},
	propMeta: {
		alignStart: {
			type: 'Boolean',
			desc: 'Aligns the Snackbar to the start of the screen.'
		}
	},
	consumeProps: ['alignStart']
});

export var SnackbarText = simpleComponentFactory('SnackbarText', {
	classNames: 'mdc-snackbar__text'
});

export var SnackbarActionWrapper = simpleComponentFactory('SnackbarActionWrapper', {
	classNames: 'mdc-snackbar__action-wrapper'
});

export var SnackbarActionButton = simpleComponentFactory('SnackbarActionButton', {
	tag: Button,
	classNames: 'mdc-snackbar__action-button'
});

export var Snackbar = function (_MDCComponentBase) {
	_inherits(Snackbar, _MDCComponentBase);

	function Snackbar() {
		_classCallCheck(this, Snackbar);

		return _possibleConstructorReturn(this, (Snackbar.__proto__ || Object.getPrototypeOf(Snackbar)).apply(this, arguments));
	}

	_createClass(Snackbar, [{
		key: 'MDCHandleProps',
		value: function MDCHandleProps(nextProps, isInitialMount) {
			var show = nextProps.show,
			    dismissesOnAction = nextProps.dismissesOnAction;

			this.MDCApi.dismissesOnAction = dismissesOnAction;

			if ((show !== this.props.show || isInitialMount) && show) {
				this.show(nextProps);
			}
		}
	}, {
		key: 'show',
		value: function show(nextProps) {
			var message = nextProps.message,
			    timeout = nextProps.timeout,
			    actionHandler = nextProps.actionHandler,
			    actionText = nextProps.actionText,
			    multiline = nextProps.multiline,
			    actionOnBottom = nextProps.actionOnBottom,
			    onClose = nextProps.onClose;

			var timer = setTimeout(function () {
				return onClose();
			}, timeout || 2750);
			var wrappedActionHandler = actionHandler && this.MDCApi.dismissesOnAction ? function () {
				actionHandler();
				clearTimeout(timer);
				onClose();
			} : actionHandler;

			this.MDCApi.show({
				message: message,
				timeout: timeout,
				actionHandler: wrappedActionHandler,
				actionText: actionText,
				multiline: multiline,
				actionOnBottom: actionOnBottom
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    show = _props.show,
			    message = _props.message,
			    timeout = _props.timeout,
			    actionHandler = _props.actionHandler,
			    actionText = _props.actionText,
			    multiline = _props.multiline,
			    actionOnBottom = _props.actionOnBottom,
			    apiRef = _props.apiRef,
			    dismissesOnAction = _props.dismissesOnAction,
			    onClose = _props.onClose,
			    rest = _objectWithoutProperties(_props, ['show', 'message', 'timeout', 'actionHandler', 'actionText', 'multiline', 'actionOnBottom', 'apiRef', 'dismissesOnAction', 'onClose']);

			var isJSX = (typeof message === 'undefined' ? 'undefined' : _typeof(message)) === 'object';
			var snackbarTextStyle = {};
			if (isJSX) {
				snackbarTextStyle.display = 'none';
			}

			/**
    * The double SnackbarText below is a hack to allow for rendering JSX
    * The real message gets rendered in the hidden container, and the second one is
    * ignored and shows th rendered content :)
    */
			return React.createElement(
				SnackbarRoot,
				Object.assign({ elementRef: function elementRef(el) {
						return _this2.MDCSetRootElement(el);
					} }, rest),
				React.createElement(SnackbarText, { style: snackbarTextStyle }),
				isJSX && React.createElement(
					SnackbarText,
					null,
					message
				),
				React.createElement(
					SnackbarActionWrapper,
					null,
					React.createElement(SnackbarActionButton, null)
				)
			);
		}
	}]);

	return Snackbar;
}(MDCComponentBase);

Object.defineProperty(Snackbar, 'MDCComponentClass', {
	enumerable: true,
	writable: true,
	value: MDCSnackbar
});
Object.defineProperty(Snackbar, 'propTypes', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		show: PropTypes.bool,
		onClose: PropTypes.func,
		message: PropTypes.any,
		timeout: PropTypes.number,
		actionHandler: PropTypes.func,
		actionText: PropTypes.any,
		multiline: PropTypes.bool,
		actionOnBottom: PropTypes.bool,
		dismissesOnAction: PropTypes.bool
	}, SnackbarRoot.propTypes, MDCComponentBase.propTypes)
});
Object.defineProperty(Snackbar, 'defaultProps', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		show: false,
		onClose: noop,
		message: undefined,
		timeout: undefined,
		actionHandler: undefined,
		actionText: undefined,
		multiline: false,
		actionOnBottom: false,
		dismissesOnAction: true
	}, SnackbarRoot.defaultProps, MDCComponentBase.defaultProps)
});
Object.defineProperty(Snackbar, 'propMeta', {
	enumerable: true,
	writable: true,
	value: propMeta(Object.assign({
		show: {
			type: 'Boolean',
			desc: 'Show the Snackbar.'
		},
		onClose: {
			type: 'Function',
			desc: 'A callback thats fired when the Snackbar closes.'
		},
		message: {
			type: ['String', 'Element'],
			desc: 'A string or other renderable JSX to be used as the message body.'
		},
		timeout: {
			type: 'Number',
			desc: 'Milliseconds to show the Snackbar for.'
		},
		actionHandler: {
			type: 'Function',
			desc: 'Callback that fires when action is pressed. The actionText property must be set to use this.'
		},
		actionText: {
			type: 'String',
			desc: 'Label for the action button.'
		},
		multiline: {
			type: 'Boolean',
			desc: 'Lets the Snackbar text overflow onto multiple lines.'
		},
		actionOnBottom: {
			type: 'Boolean',
			desc: 'Places the action underneath the message text.'
		},
		dismissesOnAction: {
			type: 'Boolean',
			desc: 'Whether or not the Snackbar dismisses on the action press.'
		}
	}, MDCComponentBase.propMeta, SnackbarRoot.propMeta))
});
export default Snackbar;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { MDCDialog } from '@material/dialog/dist/mdc.dialog';

import Button from '../Button';
import MDCComponentBase from '../Base/mdc-component-base';
import { simpleComponentFactory } from '../Base/simple-component-factory';
import { propMeta } from '../Base/prop-meta';
import { noop } from '../Base/noop';

export var DialogRoot = simpleComponentFactory('DialogRoot', {
	tag: 'aside',
	classNames: 'mdc-dialog',
	defaultProps: {
		role: 'alertdialog'
	}
});

export var DialogBackdrop = simpleComponentFactory('DialogBackdrop', {
	classNames: 'mdc-dialog__backdrop'
});

export var DialogSurface = simpleComponentFactory('DialogSurface', {
	classNames: 'mdc-dialog__surface'
});

export var DialogHeader = simpleComponentFactory('DialogHeader', {
	tag: 'header',
	classNames: 'mdc-dialog__header'
});

export var DialogHeaderTitle = simpleComponentFactory('DialogHeaderTitle', {
	tag: 'h2',
	classNames: 'mdc-dialog__header__title'
});

export var DialogBody = simpleComponentFactory('DialogBody', {
	tag: 'section',
	classNames: 'mdc-dialog__body'
});

export var DialogFooter = simpleComponentFactory('DialogFooter', {
	tag: 'footer',
	classNames: 'mdc-dialog__footer'
});

export var DialogFooterButton = simpleComponentFactory('DialogFooterButton', {
	tag: Button,
	classNames: function classNames(props) {
		return ['mdc-dialog__footer__button', {
			'mdc-dialog__footer__button--cancel': props.cancel,
			'mdc-dialog__footer__button--accept': props.accept
		}];
	},
	propTypes: {
		accept: PropTypes.bool,
		cancel: PropTypes.bool
	},
	defaultProps: {
		accept: false,
		cancel: false
	},
	consumeProps: ['accept', 'cancel']
});

export var Dialog = function (_MDCComponentBase) {
	_inherits(Dialog, _MDCComponentBase);

	function Dialog() {
		_classCallCheck(this, Dialog);

		return _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).apply(this, arguments));
	}

	_createClass(Dialog, [{
		key: 'MDCHandleProps',
		value: function MDCHandleProps(nextProps) {
			if (this.MDCApi.open !== !!nextProps.open) {
				!!nextProps.open ? this.MDCApi.show() : this.MDCApi.close();
			}
		}
	}, {
		key: 'MDCComponentDidMount',
		value: function MDCComponentDidMount() {
			var _this2 = this;

			this.MDCRegisterListener('MDCDialog:accept', function (evt) {
				_this2.props.onAccept(evt);
				_this2.props.onClose(evt);
			});

			this.MDCRegisterListener('MDCDialog:cancel', function (evt) {
				_this2.props.onCancel(evt);
				_this2.props.onClose(evt);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props = this.props,
			    apiRef = _props.apiRef,
			    open = _props.open,
			    onAccept = _props.onAccept,
			    onCancel = _props.onCancel,
			    onClose = _props.onClose,
			    children = _props.children,
			    rest = _objectWithoutProperties(_props, ['apiRef', 'open', 'onAccept', 'onCancel', 'onClose', 'children']);

			var template = children || React.createElement(DialogTemplate, null);

			return React.cloneElement(template, Object.assign({}, template.props, rest, {
				elementRef: function elementRef(el) {
					return _this3.MDCSetRootElement(el);
				}
			}));
		}
	}]);

	return Dialog;
}(MDCComponentBase);

Object.defineProperty(Dialog, 'MDCComponentClass', {
	enumerable: true,
	writable: true,
	value: MDCDialog
});
Object.defineProperty(Dialog, 'propTypes', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		open: PropTypes.bool,
		onAccept: PropTypes.func,
		onCancel: PropTypes.func,
		onClose: PropTypes.func
	}, DialogRoot.propTypes, MDCComponentBase.propTypes)
});
Object.defineProperty(Dialog, 'defaultProps', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		open: false,
		onAccept: noop,
		onCancel: noop,
		onClose: noop
	}, MDCComponentBase.defaultProps, DialogRoot.defaultProps)
});
Object.defineProperty(Dialog, 'propMeta', {
	enumerable: true,
	writable: true,
	value: propMeta(Object.assign({
		open: {
			type: 'Boolean',
			desc: 'Whether or not the Dialog is showing.'
		},
		onAccept: {
			type: 'Function',
			desc: 'Callback for when the accept Button is pressed.'
		},
		onCancel: {
			type: 'Function',
			desc: 'Callback for when the Dialog was closed without acceptance.'
		},
		onClose: {
			type: 'Function',
			desc: 'Callback for when the Dialog closes.'
		}
	}, DialogRoot.propMeta, MDCComponentBase.propMeta))
});
var DialogTemplate = function DialogTemplate(props) {
	var title = props.title,
	    header = props.header,
	    body = props.body,
	    footer = props.footer,
	    acceptLabel = props.acceptLabel,
	    cancelLabel = props.cancelLabel,
	    children = props.children,
	    rest = _objectWithoutProperties(props, ['title', 'header', 'body', 'footer', 'acceptLabel', 'cancelLabel', 'children']);

	return React.createElement(
		DialogRoot,
		rest,
		React.createElement(
			DialogSurface,
			null,
			(!!title || !!header) && React.createElement(
				DialogHeader,
				null,
				!!title && React.createElement(
					DialogHeaderTitle,
					null,
					title
				),
				!!header && { header: header }
			),
			(!!body || children) && React.createElement(
				DialogBody,
				null,
				body,
				children
			),
			(!!cancelLabel || !!acceptLabel) && React.createElement(
				DialogFooter,
				null,
				!!footer && { footer: footer },
				!!cancelLabel && React.createElement(
					DialogFooterButton,
					{ cancel: true },
					'Decline'
				),
				!!acceptLabel && React.createElement(
					DialogFooterButton,
					{ accept: true },
					acceptLabel
				)
			)
		),
		React.createElement(DialogBackdrop, null)
	);
};

export { DialogTemplate };
DialogTemplate.propTypes = {
	title: PropTypes.any,
	header: PropTypes.any,
	body: PropTypes.any,
	footer: PropTypes.any,
	acceptLabel: PropTypes.any,
	cancelLabel: PropTypes.any
};

DialogTemplate.defaultProps = {
	title: undefined,
	header: undefined,
	body: undefined,
	footer: undefined,
	acceptLabel: 'Accept',
	cancelLabel: 'Cancel'
};

export default Dialog;

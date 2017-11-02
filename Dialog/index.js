import React from 'react';
import PropTypes from 'prop-types';
import { MDCDialog } from '@material/dialog';

import Button from '../Button';
import MDCComponentBase from '../Base/mdc-component-base';
import { simpleComponentFactory } from '../Base/simple-component-factory';
import { propMeta } from '../Base/prop-meta';
import { noop } from '../Base/noop';

export const DialogRoot = simpleComponentFactory('DialogRoot', {
	tag: 'aside',
	classNames: 'mdc-dialog',
	defaultProps: {
		role: 'alertdialog'
	}
});

export const DialogBackdrop = simpleComponentFactory('DialogBackdrop', {
	classNames: 'mdc-dialog__backdrop'
});

export const DialogSurface = simpleComponentFactory('DialogSurface', {
	classNames: 'mdc-dialog__surface'
});

export const DialogHeader = simpleComponentFactory('DialogHeader', {
	tag: 'header',
	classNames: 'mdc-dialog__header'
});

export const DialogHeaderTitle = simpleComponentFactory('DialogHeaderTitle', {
	tag: 'h2',
	classNames: 'mdc-dialog__header__title'
});

export const DialogBody = simpleComponentFactory('DialogBody', {
	tag: 'section',
	classNames: 'mdc-dialog__body'
});

export const DialogFooter = simpleComponentFactory('DialogFooter', {
	tag: 'footer',
	classNames: 'mdc-dialog__footer'
});

export const DialogFooterButton = simpleComponentFactory('DialogFooterButton', {
	tag: Button,
	classNames: props => [
		'mdc-dialog__footer__button',
		{
			'mdc-dialog__footer__button--cancel': props.cancel,
			'mdc-dialog__footer__button--accept': props.accept
		}
	],
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

export class Dialog extends MDCComponentBase {
	static MDCComponentClass = MDCDialog;

	static propTypes = {
		open: PropTypes.bool,
		onAccept: PropTypes.func,
		onCancel: PropTypes.func,
		onClose: PropTypes.func,
		...DialogRoot.propTypes,
		...MDCComponentBase.propTypes
	};

	static defaultProps = {
		open: false,
		onAccept: noop,
		onCancel: noop,
		onClose: noop,
		...MDCComponentBase.defaultProps,
		...DialogRoot.defaultProps
	};

	static propMeta = propMeta({
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
		},
		...DialogRoot.propMeta,
		...MDCComponentBase.propMeta
	});

	MDCHandleProps(nextProps) {
		if (this.MDCApi.open !== !!nextProps.open) {
			!!nextProps.open ? this.MDCApi.show() : this.MDCApi.close();
		}
	}

	MDCComponentDidMount() {
		this.MDCRegisterListener('MDCDialog:accept', evt => {
			this.props.onAccept(evt);
			this.props.onClose(evt);
		});

		this.MDCRegisterListener('MDCDialog:cancel', evt => {
			this.props.onCancel(evt);
			this.props.onClose(evt);
		});
	}

	render() {
		const {
			apiRef,
			open,
			onAccept,
			onCancel,
			onClose,
			children,
			...rest
		} = this.props;
		const template = children || <DialogTemplate />;

		return React.cloneElement(template, {
			...template.props,
			...rest,
			elementRef: el => this.MDCSetRootElement(el)
		});
	}
}

export const DialogTemplate = props => {
	const {
		title,
		header,
		body,
		footer,
		acceptLabel,
		cancelLabel,
		children,
		...rest
	} = props;

	return (
		<DialogRoot {...rest}>
			<DialogSurface>
				{(!!title || !!header) && (
					<DialogHeader>
						{!!title && <DialogHeaderTitle>{title}</DialogHeaderTitle>}
						{!!header && { header }}
					</DialogHeader>
				)}
				{(!!body || children) && (
					<DialogBody>
						{body}
						{children}
					</DialogBody>
				)}

				{(!!cancelLabel || !!acceptLabel) && (
					<DialogFooter>
						{!!footer && { footer }}
						{!!cancelLabel && (
							<DialogFooterButton cancel>Decline</DialogFooterButton>
						)}
						{!!acceptLabel && (
							<DialogFooterButton accept>{acceptLabel}</DialogFooterButton>
						)}
					</DialogFooter>
				)}
			</DialogSurface>
			<DialogBackdrop />
		</DialogRoot>
	);
};

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

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { MDCDialog } from '@material/dialog';
import MDCComponentBase from '../_base/mdc-component-base';
import { simpleComponentFactory } from '../_base/simple-component-factory';

import DialogFooterButton from './dialog-footer-button';

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

export class Dialog extends MDCComponentBase {
	static MDCComponentClass = MDCDialog;

	static propTypes = {
		...DialogRoot.propTypes,
		...MDCComponentBase.propTypes,
		open: PropTypes.bool,
		onAccept: PropTypes.func,
		onCancel: PropTypes.func,
		onClose: PropTypes.func
	}

	static defaultProps = {
		...DialogRoot.defaultProps,
		...MDCComponentBase.defaultProps,
		open: false,
		onAccept: () => {},
		onCancel: () => {},
		onClose: () => {}
	}

	MDCHandleProps(nextProps) {
		if (this.MDCApi.open !== !!nextProps.open) {
			(!!nextProps.open) ? this.MDCApi.show() : this.MDCApi.close();
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
		const { apiRef, open, onAccept, onCancel, onClose, children, ...rest } = this.props;
		const template = children || <DialogTemplate/>;

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
		children
	} = props;

	return (
		<DialogRoot>
			<DialogSurface>
				{(!!title || !!header) &&
					<DialogHeader>
						{!!title &&
							<DialogHeaderTitle>{ title }</DialogHeaderTitle>
						}
						{!!header &&
							{header}
						}
					</DialogHeader>
				}
				{(!!body || children) &&
					<DialogBody>{ body }{ children }</DialogBody>
				}

				{(!!cancelLabel || !!acceptLabel) &&
					<DialogFooter>
						{!!footer &&
							{footer}
						}
						{!!cancelLabel &&
							<DialogFooterButton cancel>Decline</DialogFooterButton>
						}
						{!!acceptLabel &&
							<DialogFooterButton accept>{acceptLabel}</DialogFooterButton>
						}
					</DialogFooter>
				}
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
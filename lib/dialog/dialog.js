import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { MDCDialog } from '@material/dialog';
import MDCComponentBase from '../_base/mdc-component-base';
import simpleComponentFactory from '../_base/simple-component-factory';

import DialogFooterButton from './dialog-footer-button';

export const DialogRoot = simpleComponentFactory(
	'DialogRoot', 'aside',
	{className: 'mdc-dialog', role: 'alertdialog'}
);

export const DialogBackdrop = simpleComponentFactory(
	'DialogBackdrop', 'div',
	{className: 'mdc-dialog__backdrop'}
);

export const DialogSurface = simpleComponentFactory(
	'DialogSurface', 'div',
	{className: 'mdc-dialog__surface'}
);

export const DialogHeader = simpleComponentFactory(
	'DialogHeader', 'header',
	{className: 'mdc-dialog__header'}
);

export const DialogHeaderTitle = simpleComponentFactory(
	'DialogHeaderTitle', 'h2',
	{className: 'mdc-dialog__header__title'}
);

export const DialogBody = simpleComponentFactory(
	'DialogBody', 'section',
	{className: 'mdc-dialog__body'}
);

export const DialogFooter = simpleComponentFactory(
	'DialogFooter', 'footer',
	{className: 'mdc-dialog__footer'}
);

export class DialogController extends MDCComponentBase {
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

		return React.cloneElement(children, {
			...children.props,
			...rest,
			elementRef: el => this.MDCSetRootElement(el)
		});
	}
}

export const Dialog = props => {
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
		<DialogController {...rest}>
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
		</DialogController>
	);
};

Dialog.propTypes = {
	...DialogController.propTypes,
	title: PropTypes.any,
	header: PropTypes.any,
	body: PropTypes.any,
	footer: PropTypes.any,
	acceptLabel: PropTypes.any,
	cancelLabel: PropTypes.any
};

Dialog.defaultProps = {
	...DialogController.defaultProps,
	title: undefined,
	header: undefined,
	body: undefined,
	footer: undefined,
	acceptLabel: 'Accept',
	cancelLabel: 'Cancel'
};

export default Dialog;
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { MDCDialog } from '@material/dialog';
import MDCComponentBase from '../_base/mdc-component-base';
import simpleComponentFactory from '../_base/simple-component-factory';

import DialogFooterButton from './dialog-footer-button';

export const DialogEl = simpleComponentFactory(
	'DialogEl', 'aside',
	{className: 'mdc-dialog', role: 'alertdialog'}
);

export const DialogBackdropEl = simpleComponentFactory(
	'DialogBackdropEl', 'div',
	{className: 'mdc-dialog__backdrop'}
);

export const DialogSurfaceEl = simpleComponentFactory(
	'DialogSurfaceEl', 'div',
	{className: 'mdc-dialog__surface'}
);

export const DialogHeaderEl = simpleComponentFactory(
	'DialogHeaderEl', 'header',
	{className: 'mdc-dialog__header'}
);

export const DialogHeaderTitleEl = simpleComponentFactory(
	'DialogHeaderTitleEl', 'h2',
	{className: 'mdc-dialog__header__title'}
);

export const DialogBodyEl = simpleComponentFactory(
	'DialogBodyEl', 'section',
	{className: 'mdc-dialog__body'}
);

export const DialogFooterEl = simpleComponentFactory(
	'DialogFooterEl', 'footer',
	{className: 'mdc-dialog__footer'}
);

export class DialogController extends MDCComponentBase {
	static MDCComponentClass = MDCDialog;

	static propTypes = {
		...DialogEl.propTypes,
		...MDCComponentBase.propTypes,
		open: PropTypes.bool,
		onAccept: PropTypes.func,
		onCancel: PropTypes.func,
		onClose: PropTypes.func
	}

	static defaultProps = {
		...DialogEl.defaultProps,
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
			...rest
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
			<DialogEl>
				<DialogSurfaceEl>
					{(!!title || !!header) &&
						<DialogHeaderEl>
							{!!title &&
								<DialogHeaderTitleEl>{ title }</DialogHeaderTitleEl>
							}
							{!!header &&
								{header}
							}
						</DialogHeaderEl>
					}
					{(!!body || children) &&
						<DialogBodyEl>{ body }{ children }</DialogBodyEl>
					}

					{(!!cancelLabel || !!acceptLabel) &&
						<DialogFooterEl>
							{!!footer &&
								{footer}
							}
							{!!cancelLabel &&
								<DialogFooterButton cancel>Decline</DialogFooterButton>
							}
							{!!acceptLabel &&
								<DialogFooterButton accept>{acceptLabel}</DialogFooterButton>
							}
						</DialogFooterEl>
					}
				</DialogSurfaceEl>
				<DialogBackdropEl />
			</DialogEl>
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
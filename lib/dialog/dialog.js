import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { MDCDialog } from '@material/dialog';

import simpleComponentFactory from '../_base/simple-component-factory';
import MDCComponentBase from '../_base/mdc-component-base';

const DialogBase = simpleComponentFactory('DialogBase', 'aside', {className: 'mdc-dialog', role: 'alertdialog'});

export class Dialog extends MDCComponentBase {
	static MDCComponentClass = MDCDialog;

	static propTypes = {
		...DialogBase.propTypes,
		...MDCComponentBase.propTypes,
		open: PropTypes.bool,
		onAccept: PropTypes.func,
		onCancel: PropTypes.func,
		onClose: PropTypes.func
	}

	static defaultProps = {
		...DialogBase.defaultProps,
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
		const { apiRef, open, onAccept, onCancel, onClose, ...rest } = this.props;
		return (
			<DialogBase { ...rest }/>
		);
	}
}

export default Dialog;
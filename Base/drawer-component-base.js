import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import MDCComponentBase from './mdc-component-base';
import { propMeta } from './prop-meta';
import { noop } from '../Base/noop';

export class DrawerBase extends MDCComponentBase {
	static drawerConstructorName = '';

	static propTypes = {
		open: PropTypes.bool,
		onClose: PropTypes.func,
		onOpen: PropTypes.func,
		...MDCComponentBase.propTypes
	};

	static defaultProps = {
		open: false,
		onClose: noop,
		onOpen: noop,
		...MDCComponentBase.defaultProps
	};

	static propMeta = propMeta({
		open: {
			type: 'Boolean',
			desc: 'Opens or closes the Drawer.'
		},
		onClose: {
			type: 'Function',
			desc: 'Callback that fires when the Drawer is closed,'
		},
		onOpen: {
			type: 'Function',
			desc: 'Callback that fires when the Drawer is opened.'
		},
		...MDCComponentBase.propMeta
	});

	childOnClickRefs = [];

	MDCComponentDidMount() {
		// Reacts events are delegated to the body but Material is using stopPropagation, preventing any
		// onClick events in the drawer from firing/
		// Am unfortunate solution, monkeypatch the internal handlers to work without stopProp

		// store the handler
		const componentClickHandler = this.MDCApi.foundation_
			.componentClickHandler_;

		// remove the old one
		this.MDCApi.foundation_.adapter_.deregisterInteractionHandler(
			'click',
			this.MDCApi.foundation_.componentClickHandler_
		);

		// The drawer click handler only stopsProp, we are just going to remove it
		// and add logic to check if the drawer should close to the component click handler
		this.MDCApi.foundation_.adapter_.deregisterDrawerInteractionHandler(
			'click',
			this.MDCApi.foundation_.drawerClickHandler_
		);

		// replace with new function
		this.MDCApi.foundation_.componentClickHandler_ = evt => {
			const path = evt.composedPath
				? evt.composedPath()
				: evt.deepPath || evt.path;
			const drawerClickedWasClicked = path.some(
				el =>
					el.classList && el.classList.contains('mdc-temporary-drawer__drawer')
			);
			if (!drawerClickedWasClicked && componentClickHandler) {
				componentClickHandler(evt);
			}
		};

		// rebind
		this.MDCApi.foundation_.adapter_.registerInteractionHandler(
			'click',
			this.MDCApi.foundation_.componentClickHandler_
		);

		this.MDCRegisterListener(
			`${this.constructor.drawerConstructorName}:open`,
			evt => this.props.onOpen(evt)
		);
		this.MDCRegisterListener(
			`${this.constructor.drawerConstructorName}:close`,
			evt => this.props.onClose(evt)
		);
	}

	MDCHandleProps(nextProps) {
		if (this.MDCApi.open !== !!nextProps.open) {
			this.MDCApi.open = !!nextProps.open;
		}
	}
}

export default DrawerBase;

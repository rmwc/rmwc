import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import MDCComponentBase from './mdc-component-base';
import { propMeta } from './prop-meta';
import { noop } from '../_base/noop';

export class DrawerBase extends MDCComponentBase {
	static drawerConstructorName = '';

	static propTypes = {
		open: PropTypes.bool,
		onClose: PropTypes.func,
		onOpen: PropTypes.func,
		...MDCComponentBase.propTypes
	}

	static defaultProps = {
		open: false,
		onClose: noop,
		onOpen: noop,
		...MDCComponentBase.defaultProps
	}

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
	})

	childOnClickRefs = [];

	MDCComponentDidMount() {
		/**
		 * A very hacky fix to a problem in Material Drawers and React.
		 * It blocks the native click event from firing, so we have to jump through hoops
		 * To call our React onClick handler
		 */
		this.drawerEl.addEventListener('click', evt => {
			const drawerIndex = evt.path.findIndex(el => el === this.drawerEl);
			if (~drawerIndex) {
				const elements = evt.path.slice(0, drawerIndex - 1);
				const firedCallbacks = [];
				this.childOnClickRefs.forEach(ref => {
					const el = ReactDOM.findDOMNode(ref);
					if (~elements.indexOf(el) && ~firedCallbacks.indexOf(ref.props.onClick)) {
						firedCallbacks.push(ref.props.onClick);
						ref.props.onClick(evt);
					}
				});
			}
		});

		this.MDCRegisterListener(`${this.constructor.drawerConstructorName}:open`, evt => this.props.onOpen(evt));
		this.MDCRegisterListener(`${this.constructor.drawerConstructorName}:close`, evt => this.props.onClose(evt));
	}

	MDCHandleProps(nextProps) {
		if (this.MDCApi.open !== !!nextProps.open) {
			this.MDCApi.open = !!nextProps.open;
		}
	}

	onClickCallbackFixForChildren(children) {
		this.childOnClickRefs = [];

		const recursiveCloneChildren = (children) => {
			return React.Children.map(children, child => {
				if (!React.isValidElement(child)) { return child }

				return React.cloneElement(child, {
					...child.props,
					...(child.props.onClick ? {ref: el => this.childOnClickRefs.push(el)} : {}),
					children: recursiveCloneChildren(child.props.children)
				});
			});
		};

		return recursiveCloneChildren(children);
	}
}

export default DrawerBase;
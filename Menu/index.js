import React from 'react';
import PropTypes from 'prop-types';
import { MDCSimpleMenu } from '@material/menu';
import { propMeta } from '../Base/prop-meta';
import { noop } from '../Base/noop';
import MDCComponentBase from '../Base/mdc-component-base';
import { List, ListItem } from '../List';
import { simpleComponentFactory } from '../Base/simple-component-factory';

export const MenuItem = props => (
	<ListItem role="menuitem" tabIndex="0" {...props}>
		{props.children}
	</ListItem>
);

MenuItem.propTypes = ListItem.propTypes;
MenuItem.defaultProps = ListItem.defaultProps;
MenuItem.propMeta = ListItem.propMeta;

export const MenuAnchor = simpleComponentFactory('MenuAnchor', {
	classNames: 'mdc-menu-anchor'
});

export const MenuRoot = simpleComponentFactory('MenuRoot', {
	classNames: 'mdc-simple-menu',
	defaultProps: {
		tabIndex: '-1'
	}
});

export class Menu extends MDCComponentBase {
	static MDCComponentClass = MDCSimpleMenu;

	static propTypes = {
		open: PropTypes.bool,
		onClose: PropTypes.func,
		onSelected: PropTypes.func,
		...MDCComponentBase.propTypes,
		...MenuRoot.propTypes
	};

	static defaultProps = {
		onClose: noop,
		onSelected: noop,
		...MDCComponentBase.defaultProps,
		...MenuRoot.defaultProps
	};

	static propMeta = propMeta({
		open: {
			type: 'Boolean',
			desc: 'Whether or not the Menu is open.'
		},
		onClose: {
			type: 'Function',
			desc: 'Callback that fires when the Menu closes.'
		},
		onSelected: {
			type: 'Function',
			desc: 'Callback that fires when a Menu item is selected.'
		},
		...MDCComponentBase.propMeta,
		...MenuRoot.propMeta
	});

	MDCComponentDidMount() {
		this.MDCRegisterListener('MDCSimpleMenu:cancel', evt =>
			this.handleOnChange(evt)
		);
		this.MDCRegisterListener('MDCSimpleMenu:selected', evt => {
			this.handleOnChange(evt);
			this.props.onSelected(evt);
		});
	}

	MDCHandleProps(nextProps) {
		if (nextProps.open !== undefined && this.MDCApi.open !== nextProps.open) {
			this.MDCApi.open = nextProps.open;
		}
	}

	handleOnChange(evt) {
		evt.target.value = false;
		this.props.onClose(evt);
	}

	render() {
		const { children, open, onClose, onSelected, apiRef, ...rest } = this.props;

		return (
			<MenuRoot elementRef={el => this.MDCSetRootElement(el)} {...rest}>
				<List className="mdc-simple-menu__items" role="menu" aria-hidden="true">
					{children}
				</List>
			</MenuRoot>
		);
	}
}

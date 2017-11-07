import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { simpleComponentFactory } from '../Base/simple-component-factory';
import { propMeta } from '../Base/prop-meta';
import { List } from '../List';
import { DrawerBase } from '../Base/drawer-component-base';
import { MDCPersistentDrawer } from '@material/drawer/dist/mdc.drawer';

/***************************************************************************************
 * Drawer Headers
 ***************************************************************************************/
export const PersistentDrawerHeaderRoot = simpleComponentFactory(
	'PersistentDrawerHeader',
	{
		classNames: 'mdc-persistent-drawer__header'
	}
);

export const PersistentDrawerHeaderContent = simpleComponentFactory(
	'PersistentDrawerHeaderContent',
	{
		classNames: 'mdc-persistent-drawer__header-content'
	}
);

export class PersistentDrawerHeader extends React.Component {
	static propTypes = {
		...PersistentDrawerHeaderRoot.propTypes
	};

	static defaultProps = {
		...PersistentDrawerHeaderRoot.defaultProps
	};

	static propMeta = propMeta({
		...PersistentDrawerHeaderRoot.propMeta
	});

	render() {
		const { children, ...rest } = this.props;
		return (
			<PersistentDrawerHeaderRoot {...rest}>
				<PersistentDrawerHeaderContent>
					{children}
				</PersistentDrawerHeaderContent>
			</PersistentDrawerHeaderRoot>
		);
	}
}

/***************************************************************************************
 * Drawer Content
 ***************************************************************************************/
export const PersistentDrawerContent = simpleComponentFactory(
	'PersistentDrawerContent',
	{
		tag: List,
		classNames: 'mdc-persistent-drawer__content'
	}
);

/***************************************************************************************
 * Drawers
 ***************************************************************************************/

export const PersistentDrawerRoot = simpleComponentFactory(
	'PersistentDrawerRoot',
	{
		tag: 'aside',
		classNames: 'mdc-persistent-drawer'
	}
);

export const PersistentDrawerDrawer = simpleComponentFactory(
	'PersistentDrawerDrawer',
	{
		tag: 'header',
		classNames: 'mdc-persistent-drawer__drawer'
	}
);

export class PersistentDrawer extends DrawerBase {
	static MDCComponentClass = MDCPersistentDrawer;
	static drawerConstructorName = 'MDCPersistentDrawer';

	static propTypes = {
		open: PropTypes.bool,
		...DrawerBase.propTypes,
		...PersistentDrawerRoot.propTypes
	};

	static defaultProps = {
		open: false,
		...DrawerBase.defaultProps,
		...PersistentDrawerRoot.defaultProps
	};

	static propMeta = propMeta({
		open: {
			type: 'Boolean',
			desc: 'Opens the drawer'
		},
		...DrawerBase.propMeta,
		...PersistentDrawerRoot.propMeta
	});

	render() {
		const { children, onOpen, onClose, open, apiRef, ...rest } = this.props;

		return (
			<PersistentDrawerRoot
				elementRef={el => this.MDCSetRootElement(el)}
				{...rest}
			>
				<PersistentDrawerDrawer elementRef={el => (this.drawerEl = el)}>
					{children}
				</PersistentDrawerDrawer>
			</PersistentDrawerRoot>
		);
	}
}

export default PersistentDrawer;

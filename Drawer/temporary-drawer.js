import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { simpleComponentFactory } from '../Base/simple-component-factory';
import { propMeta } from '../Base/prop-meta';
import { List } from '../List';
import { DrawerBase } from '../Base/drawer-component-base';
import { MDCTemporaryDrawer } from '@material/drawer';

/***************************************************************************************
 * Drawer Headers
 ***************************************************************************************/
export const TemporaryDrawerHeaderRoot = simpleComponentFactory(
	'TemporaryDrawerHeader',
	{
		classNames: 'mdc-temporary-drawer__header'
	}
);

export const TemporaryDrawerHeaderContent = simpleComponentFactory(
	'TemporaryDrawerHeaderContent',
	{
		classNames: 'mdc-temporary-drawer__header-content'
	}
);

export class TemporaryDrawerHeader extends React.Component {
	static propTypes = {
		...TemporaryDrawerHeaderRoot.propTypes
	};

	static defaultProps = {
		...TemporaryDrawerHeaderRoot.defaultProps
	};

	static propMeta = propMeta({
		...TemporaryDrawerHeaderRoot.propMeta
	});

	render() {
		const { children, ...rest } = this.props;
		return (
			<TemporaryDrawerHeaderRoot {...rest}>
				<TemporaryDrawerHeaderContent>{children}</TemporaryDrawerHeaderContent>
			</TemporaryDrawerHeaderRoot>
		);
	}
}

/***************************************************************************************
 * Drawer Content
 ***************************************************************************************/
export const TemporaryDrawerContent = simpleComponentFactory(
	'TemporaryDrawerContent',
	{
		tag: List,
		classNames: 'mdc-temporary-drawer__content'
	}
);

/***************************************************************************************
 * Drawers
 ***************************************************************************************/
export const TemporaryDrawerRoot = simpleComponentFactory(
	'TemporaryDrawerRoot',
	{
		tag: 'aside',
		classNames: 'mdc-temporary-drawer'
	}
);

export const TemporaryDrawerDrawer = simpleComponentFactory(
	'TemporaryDrawerDrawer',
	{
		tag: 'header',
		classNames: 'mdc-temporary-drawer__drawer'
	}
);

export class TemporaryDrawer extends DrawerBase {
	static MDCComponentClass = MDCTemporaryDrawer;
	static drawerConstructorName = 'MDCTemporaryDrawer';

	static propTypes = {
		...DrawerBase.propTypes,
		...TemporaryDrawerRoot.propTypes
	};

	static defaultProps = {
		...DrawerBase.defaultProps,
		...TemporaryDrawerRoot.defaultProps
	};

	static propMeta = propMeta({
		...DrawerBase.propMeta,
		...TemporaryDrawerRoot.propMeta
	});

	render() {
		const { children, onOpen, onClose, open, apiRef, ...rest } = this.props;
		return (
			<TemporaryDrawerRoot
				elementRef={el => this.MDCSetRootElement(el)}
				{...rest}
			>
				<TemporaryDrawerDrawer elementRef={el => (this.drawerEl = el)}>
					{children}
				</TemporaryDrawerDrawer>
			</TemporaryDrawerRoot>
		);
	}
}

export default TemporaryDrawer;

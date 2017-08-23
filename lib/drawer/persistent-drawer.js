import React from 'react';
import PropTypes from 'prop-types';
import { simpleComponentFactory } from '../_base/simple-component-factory';
import { propMeta } from '../_base/prop-meta';
import { List } from '../list/list';
import { MDCComponentBase } from '../_base/mdc-component-base';
import { MDCPersistentDrawer } from '@material/drawer';

export const PersistentDrawerRoot = simpleComponentFactory('PersistentDrawerRoot', {
	tag: 'aside',
	classNames: 'mdc-persistent-drawer'
});

export const PersistentDrawerDrawer = simpleComponentFactory('PersistentDrawerDrawer', {
	tag: 'header',
	classNames: 'mdc-persistent-drawer__drawer'
});

export const PersistentDrawerHeaderContent = simpleComponentFactory('PersistentDrawerHeaderContent', {
	classNames: 'mdc-persistent-drawer__header-content'
});

export const PersistentDrawerHeader = simpleComponentFactory('PersistentDrawerHeader', {
	classNames: 'mdc-persistent-drawer__header'
});

export const PersistentDrawerContent = simpleComponentFactory('PersistentDrawerContent', {
	tag: List,
	classNames: 'mdc-persistent-drawer__content'
});

export class PersistentDrawer extends MDCComponentBase {
	static MDCComponentClass = MDCPersistentDrawer;

	static propTypes = {
		open: PropTypes.bool,
		...MDCComponentBase.propTypes,
		...PersistentDrawerRoot.propTypes
	}

	static defaultProps = {
		open: false,
		...MDCComponentBase.defaultProps,
		...PersistentDrawerRoot.defaultProps
	}

	static propMeta = propMeta({
		open: {
			type: 'Boolean',
			desc: 'Opens the drawer'
		},
		...MDCComponentBase.propMeta,
		...PersistentDrawerRoot.propMeta
	})

	MDCHandleProps(nextProps) {
		console.log(this);
		if (this.MDCApi.open !== !!nextProps.open) {
			this.MDCApi.open = !!nextProps.open;
		}
	}

	render() {
		const {
			children,
			apiRef,
			...rest } = this.props;

		return (
			<PersistentDrawerRoot elementRef={el => this.MDCSetRootElement(el)} {...rest}>
				<PersistentDrawerDrawer>
					{children}
				</PersistentDrawerDrawer>
			</PersistentDrawerRoot>
		);
	}
}

export default PersistentDrawer;
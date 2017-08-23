import React from 'react';
import PropTypes from 'prop-types';
import { simpleComponentFactory } from '../_base/simple-component-factory';
import { ListItem } from '../list/list';

export const PermanentDrawer = simpleComponentFactory('PermanentDrawerRoot', {
	tag: 'nav',
	classNames: 'mdc-permanent-drawer'
});

export const PermanentDrawerToolbarSpacer = simpleComponentFactory('PermanentDrawerToolbarSpacer', {
	classNames: 'mdc-permanent-drawer__toolbar-spacer'
});

export const PermanentDrawerContent = simpleComponentFactory('PermanentDrawerContent', {
	classNames: 'mdc-permanent-drawer__content'
});

export const PersistentDrawerListItem = simpleComponentFactory('PersistentDrawerListItem', {
	tag: ListItem,
	classNames: props => [{
		'mdc-persistent-drawer--selected': props.selected
	}],
	propTypes: {
		selected: PropTypes.boolean
	},
	defaultProps: {
		selected: false
	},
	propMeta: {
		type: 'Boolean',
		desc: 'A special selected class for list items in the Drawer.'
	}
});

export default PermanentDrawer;
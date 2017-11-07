import React from 'react';
import PropTypes from 'prop-types';
import { simpleComponentFactory } from '../Base/simple-component-factory';
import { ListItem } from '../List';

export var PermanentDrawer = simpleComponentFactory('PermanentDrawerRoot', {
	tag: 'nav',
	classNames: 'mdc-permanent-drawer'
});

export var PermanentDrawerToolbarSpacer = simpleComponentFactory('PermanentDrawerToolbarSpacer', {
	classNames: 'mdc-permanent-drawer__toolbar-spacer'
});

export var PermanentDrawerContent = simpleComponentFactory('PermanentDrawerContent', {
	classNames: 'mdc-permanent-drawer__content'
});

export default PermanentDrawer;

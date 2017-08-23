import React from 'react';
import { simpleComponentFactory } from '../_base/simple-component-factory';

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

export default PermanentDrawer;
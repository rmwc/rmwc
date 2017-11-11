import React from 'react';
import { simpleTag } from '../Base';

export const PermanentDrawer = simpleTag({
  name: 'PermanentDrawerRoot',
  tag: 'nav',
  classNames: 'mdc-permanent-drawer'
});

export const PermanentDrawerToolbarSpacer = simpleTag({
  name: 'PermanentDrawerToolbarSpacer',

  classNames: 'mdc-permanent-drawer__toolbar-spacer'
});

export const PermanentDrawerContent = simpleTag({
  name: 'PermanentDrawerContent',

  classNames: 'mdc-permanent-drawer__content'
});

export default PermanentDrawer;

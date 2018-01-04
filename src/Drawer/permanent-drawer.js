import { simpleTag } from '../Base';

export const PermanentDrawer = simpleTag({
  displayName: 'PermanentDrawerRoot',
  tag: 'nav',
  classNames: 'mdc-permanent-drawer'
});

export const PermanentDrawerToolbarSpacer = simpleTag({
  displayName: 'PermanentDrawerToolbarSpacer',

  classNames: 'mdc-permanent-drawer__toolbar-spacer'
});

export const PermanentDrawerContent = simpleTag({
  displayName: 'PermanentDrawerContent',

  classNames: 'mdc-permanent-drawer__content'
});

export default PermanentDrawer;

// @flow
import * as React from 'react';
import { simpleTag } from '../Base';
import { List } from '../List';
import { withMDCDrawer } from '../Base';
import { MDCPersistentDrawer } from '@material/drawer/dist/mdc.drawer';

/***************************************************************************************
 * Drawer Headers
 ***************************************************************************************/
export const PersistentDrawerHeaderRoot = simpleTag({
  displayName: 'PersistentDrawerHeader',

  classNames: 'mdc-persistent-drawer__header'
});

export const PersistentDrawerHeaderContent = simpleTag({
  displayName: 'PersistentDrawerHeaderContent',

  classNames: 'mdc-persistent-drawer__header-content'
});

export class PersistentDrawerHeader extends React.Component<*> {
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
export const PersistentDrawerContent = simpleTag({
  displayName: 'PersistentDrawerContent',

  tag: List,
  classNames: 'mdc-persistent-drawer__content'
});

/***************************************************************************************
 * Drawers
 ***************************************************************************************/

export const PersistentDrawerRoot = simpleTag({
  displayName: 'PersistentDrawerRoot',

  tag: 'aside',
  classNames: 'mdc-persistent-drawer'
});

export const PersistentDrawerDrawer = simpleTag({
  displayName: 'PersistentDrawerDrawer',

  tag: 'header',
  classNames: 'mdc-persistent-drawer__drawer'
});

type PersistentDrawerPropsT = {
  /* Opens the drawer. */
  open: boolean
};

export const PersistentDrawer: React.ComponentType<
  PersistentDrawerPropsT
> = withMDCDrawer({
  mdcConstructor: MDCPersistentDrawer,
  mdcElementRef: true,
  drawerConstructorName: 'MDCPersistentDrawer',
  defaultProps: {
    open: false
  }
})(({ children, onOpen, onClose, open, mdcElementRef, ...rest }) => (
  <PersistentDrawerRoot elementRef={mdcElementRef} {...rest}>
    <PersistentDrawerDrawer>{children}</PersistentDrawerDrawer>
  </PersistentDrawerRoot>
));

export default PersistentDrawer;

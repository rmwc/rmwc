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

export class PersistentDrawerHeader extends React.Component<{}> {
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
  /** Opens or closes the Drawer. */
  open: boolean,
  /** Callback that fires when the Drawer is closed. */
  onClose?: (evt: Event) => mixed,
  /** Callback that fires when the Drawer is opened. */
  onOpen?: (evt: Event) => mixed
};

export const PersistentDrawer = withMDCDrawer({
  mdcConstructor: MDCPersistentDrawer,
  mdcElementRef: true,
  drawerConstructorName: 'MDCPersistentDrawer',
  defaultProps: {
    open: false
  }
})(
  class extends React.Component<PersistentDrawerPropsT> {
    static displayName = 'PersistentDrawer';

    render() {
      const {
        children,
        onOpen,
        onClose,
        open,
        mdcElementRef,
        ...rest
      } = this.props;
      return (
        <PersistentDrawerRoot elementRef={mdcElementRef} {...rest}>
          <PersistentDrawerDrawer>{children}</PersistentDrawerDrawer>
        </PersistentDrawerRoot>
      );
    }
  }
);

export default PersistentDrawer;

// @flow
import * as React from 'react';
import { simpleTag } from '../Base';
import { List } from '../List';
import { withMDCDrawer } from '../Base';
import { MDCTemporaryDrawer } from '@material/drawer/dist/mdc.drawer';

/***************************************************************************************
 * Drawer Headers
 ***************************************************************************************/
export const TemporaryDrawerHeaderRoot = simpleTag({
  displayName: 'TemporaryDrawerHeader',
  classNames: 'mdc-temporary-drawer__header'
});

export const TemporaryDrawerHeaderContent = simpleTag({
  displayName: 'TemporaryDrawerHeaderContent',
  classNames: 'mdc-temporary-drawer__header-content'
});

export class TemporaryDrawerHeader extends React.Component<*> {
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
export const TemporaryDrawerContent = simpleTag({
  displayName: 'TemporaryDrawerContent',

  tag: List,
  classNames: 'mdc-temporary-drawer__content'
});

/***************************************************************************************
 * Drawers
 ***************************************************************************************/
export const TemporaryDrawerRoot = simpleTag({
  displayName: 'TemporaryDrawerRoot',

  tag: 'aside',
  classNames: 'mdc-temporary-drawer'
});

export const TemporaryDrawerDrawer = simpleTag({
  displayName: 'TemporaryDrawerDrawer',

  tag: 'header',
  classNames: 'mdc-temporary-drawer__drawer'
});

type TemporaryDrawerPropsT = {
  /* Opens the drawer. */
  open: boolean
};

export const TemporaryDrawer: React.ComponentType<
  TemporaryDrawerPropsT
> = withMDCDrawer({
  mdcConstructor: MDCTemporaryDrawer,
  mdcElementRef: true,
  drawerConstructorName: 'MDCTemporaryDrawer',
  defaultProps: {
    open: false
  }
})(({ children, onOpen, onClose, open, mdcElementRef, ...rest }) => (
  <TemporaryDrawerRoot elementRef={mdcElementRef} {...rest}>
    <TemporaryDrawerDrawer>{children}</TemporaryDrawerDrawer>
  </TemporaryDrawerRoot>
));

export default TemporaryDrawer;

// @flow
import type { SimpleTagPropsT, CustomEventT } from '../Base';

import * as React from 'react';
import { simpleTag } from '../Base';
import { List } from '../List';
import { noop } from '../Base';
import {
  MDCPersistentDrawer,
  MDCTemporaryDrawer
} from '@material/drawer/dist/mdc.drawer';
import { withFoundation, syncFoundationProp } from '../Base/withFoundation';

/***************************************************************************************
 * Drawer Headers
 ***************************************************************************************/
export const DrawerHeaderRoot = simpleTag({
  displayName: 'DrawerHeaderRoot',
  classNames: 'mdc-drawer__header'
});

export const DrawerHeaderContent = simpleTag({
  displayName: 'DrawerHeaderContent',
  classNames: 'mdc-drawer__header-content'
});

/** A Header for Drawers */
export class DrawerHeader extends React.Component<SimpleTagPropsT> {
  render() {
    const { children, ...rest } = this.props;
    return (
      <DrawerHeaderRoot {...rest}>
        <DrawerHeaderContent>{children}</DrawerHeaderContent>
      </DrawerHeaderRoot>
    );
  }
}

/** If you are using fixed a Toolbar, this provides space for it. */
export const DrawerToolbarSpacer = simpleTag({
  displayName: 'DrawerToolbarSpacer',
  classNames: 'mdc-drawer__toolbar-spacer'
});

/***************************************************************************************
 * Drawer Content
 ***************************************************************************************/
/** Content for Drawers. Please note this is an instance of mdc-list by default. You can change this to a a non list container by specifying the tag as 'div' or anything else. */
export const DrawerContent = simpleTag({
  displayName: 'DrawerContent',
  tag: List,
  classNames: 'mdc-drawer__content'
});

/***************************************************************************************
 * Drawers
 ***************************************************************************************/
export type DrawerPropsT = {
  /** Opens or closes the Drawer. */
  open?: boolean,
  /** Callback that fires when the Drawer is closed. */
  onClose?: (evt: CustomEventT<void>) => mixed,
  /** Callback that fires when the Drawer is opened. */
  onOpen?: (evt: CustomEventT<void>) => mixed,
  /** Makes a permanent drawer. */
  permanent?: boolean,
  /** Makes a persistent drawer. */
  persistent?: boolean,
  /** Makes a temporary drawer. */
  temporary?: boolean
} & SimpleTagPropsT;

export const DrawerRoot = simpleTag({
  displayName: 'DrawerRoot',
  tag: 'aside',
  classNames: (props: DrawerPropsT) => [
    'mdc-drawer',
    {
      'mdc-drawer--permanent': props.permanent,
      'mdc-drawer--persistent': props.persistent,
      'mdc-drawer--temporary': props.temporary
    }
  ],
  consumeProps: ['permanent', 'persistent', 'temporary']
});

export const DrawerDrawer = simpleTag({
  displayName: 'DrawerDrawer',
  tag: 'nav',
  classNames: 'mdc-drawer__drawer'
});

const slidableDrawerFactory = (MDCConstructor, displayName) =>
  class extends withFoundation({
    constructor: MDCConstructor,
    adapter: {}
  })<DrawerPropsT> {
    static displayName = displayName;

    static defaultProps = {
      open: false,
      onOpen: noop,
      onClose: noop
    };

    open: boolean;

    syncWithProps(nextProps: DrawerPropsT) {
      // Open
      // MDC calls notify change before actually setting the Open value
      // which causes an infinite loop for reacts uni-directional data flow
      // The set timeout gives us a frame before we re-evaluate whether we are open
      setTimeout(() => {
        this.foundation_ &&
          syncFoundationProp(
            nextProps.open,
            this.open,
            () => (this.open = nextProps.open || false)
          );
      });
    }

    render() {
      const { children, onOpen, onClose, open, ...rest } = this.props;
      const { root_ } = this.foundationRefs;
      return (
        <DrawerRoot elementRef={root_} {...rest}>
          <DrawerDrawer>{children}</DrawerDrawer>
        </DrawerRoot>
      );
    }
  };

const TemporaryDrawer = slidableDrawerFactory(
  MDCTemporaryDrawer,
  'TemporaryDrawer'
);

const PersistentDrawer = slidableDrawerFactory(
  MDCPersistentDrawer,
  'PersistentDrawer'
);

class PermanentDrawer extends React.Component<DrawerPropsT> {
  static displayName = 'PermanentDrawer';

  static defaultProps = {
    open: false,
    onOpen: noop,
    onClose: noop
  };

  render() {
    const { children, onOpen, onClose, ...rest } = this.props;
    return <DrawerRoot {...rest}>{children}</DrawerRoot>;
  }
}

export const Drawer: React.ComponentType<DrawerPropsT> = (
  props: DrawerPropsT
) => {
  if (props.persistent) {
    return <PersistentDrawer {...props} />;
  }

  if (props.temporary) {
    return <TemporaryDrawer {...props} />;
  }

  return <PermanentDrawer {...props} />;
};

Drawer.displayName = 'Drawer';

// @flow
import type { SimpleTagPropsT } from '../Base';

import * as React from 'react';
import { simpleTag } from '../Base';
import { List } from '../List';
import { noop } from '../Base';
import {
  MDCPersistentDrawer,
  MDCTemporaryDrawer
} from '@material/drawer/dist/mdc.drawer';
import { withFoundation, syncFoundationProp } from '../Base/MDCFoundation';

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
export class DrawerHeader extends React.Component<{ children?: React.Node }> {
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
export const DrawerRoot = simpleTag({
  displayName: 'DrawerRoot',
  tag: 'aside',
  classNames: props => [
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

export type DrawerPropsT = {
  /** Opens or closes the Drawer. */
  open: boolean,
  /** Callback that fires when the Drawer is closed. */
  onClose?: (evt: Event) => mixed,
  /** Callback that fires when the Drawer is opened. */
  onOpen?: (evt: Event) => mixed,
  /** Makes a permanent drawer. */
  permanent?: boolean,
  /** Makes a persistent drawer. */
  persistent?: boolean,
  /** Makes a temporary drawer. */
  temporary?: boolean
} & SimpleTagPropsT;

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
            () => (this.open = nextProps.open)
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

export const Drawer = (props: DrawerPropsT) => {
  if (props.persistent) {
    return <PersistentDrawer {...props} />;
  }

  if (props.temporary) {
    return <TemporaryDrawer {...props} />;
  }

  return <PermanentDrawer {...props} />;
};

Drawer.displayName = 'Drawer';

// /** A Drawer component */
// export const Drawer = withMDC({
//   getMdcConstructorOrInstance: props => {
//     if (props.temporary) {
//       return MDCTemporaryDrawer;
//     } else if (props.persistent) {
//       return MDCPersistentDrawer;
//     }

//     return null;
//   },
//   defaultProps: {
//     open: false,
//     onOpen: noop,
//     onClose: noop,
//     permanent: false,
//     persistent: false,
//     temporary: false
//   },
//   mdcElementRef: true,
//   mdcEvents: props => {
//     let drawerConstructorName;

//     if (props.temporary) {
//       drawerConstructorName = 'MDCTemporaryDrawer';
//     } else if (props.persistent) {
//       drawerConstructorName = 'MDCPersistentDrawer';
//     } else {
//       // we dont have a valid event namespace, escape out
//       return {};
//     }

//     return {
//       [`${drawerConstructorName}:open`]: (evt, props) => props.onOpen(evt),
//       [`${drawerConstructorName}:close`]: (evt, props) => props.onClose(evt)
//     };
//   },
//   onUpdate(props, nextProps, api, inst) {
//     if (
//       props &&
//       ['permanent', 'persistent', 'temporary'].some(
//         p => props && props[p] !== nextProps[p]
//       )
//     ) {
//       inst.mdcComponentDestroy();
//       return;
//     }

//     if (api && api.open !== !!nextProps.open) {
//       api.open = !!nextProps.open;
//     }
//   },
//   didUpdate(props, nextProps, api, inst) {
//     if (
//       props &&
//       ['permanent', 'persistent', 'temporary'].some(
//         p => props && props[p] !== nextProps[p]
//       )
//     ) {
//       inst.mdcComponentInit();
//       return;
//     }
//   }
// })(
//   class extends React.Component<DrawerPropsT> {

// );

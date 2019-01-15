import { ComponentProps, CustomEventT } from '@rmwc/base';

import * as React from 'react';
import { componentFactory } from '@rmwc/base';
import { noop } from '@rmwc/base';
// @ts-ignore
import { MDCDrawer } from '@material/drawer';
import { withFoundation, syncFoundationProp } from '@rmwc/base/withFoundation';

/***************************************************************************************
 * Drawer Headers
 ***************************************************************************************/
/** An optional header for the Drawer. */
export const DrawerHeader = componentFactory({
  displayName: 'DrawerHeader',
  classNames: ['mdc-drawer__header']
});

/** An title for the DrawerHeader. */
export const DrawerTitle = componentFactory({
  displayName: 'DrawerTitle',
  classNames: ['mdc-drawer__title']
});

/** A subtitle for the DrawerHeader. */
export const DrawerSubtitle = componentFactory({
  displayName: 'DrawerSubtitle',
  classNames: ['mdc-drawer__subtitle']
});

/***************************************************************************************
 * Drawer Content
 ***************************************************************************************/
/** Content for Drawers. Please note this is an instance of mdc-list by default. You can change this to a a non list container by specifying the tag as 'div' or anything else. */
export const DrawerContent = componentFactory({
  displayName: 'DrawerContent',
  classNames: ['mdc-drawer__content']
});

/***************************************************************************************
 * Drawer Scrim
 ***************************************************************************************/
/**
 * Protects the app's UI from interactions while a modal drawer is open.
 * This is automatically included if you're using React 16 and above.
 * For React 15, you must manually include it immediately after a modal Drawer.
 * */
export const DrawerScrim = () => <div className="mdc-drawer-scrim" />;

/***************************************************************************************
 * DrawerAppContent
 ***************************************************************************************/
/** For the Dismissible variant only. Sibling element that is resized when the drawer opens/closes. */
export const DrawerAppContent = componentFactory({
  displayName: 'DrawerAppContent',
  classNames: ['mdc-drawer-app-content']
});

/***************************************************************************************
 * Drawers
 ***************************************************************************************/
export type DrawerPropsT = {
  /** Opens or closes the Drawer. */
  open?: boolean;
  /** Callback that fires when the Drawer is closed. */
  onClose?: (evt: CustomEventT<void>) => void;
  /** Callback that fires when the Drawer is opened. */
  onOpen?: (evt: CustomEventT<void>) => void;
  /** Makes a dismissible drawer. */
  dismissible?: boolean;
  /** Makes a modal / temporary drawer. */
  modal?: boolean;
} & ComponentProps;

export const DrawerRoot = componentFactory({
  displayName: 'DrawerRoot',
  tag: 'aside',
  classNames: (props: DrawerPropsT) => [
    'mdc-drawer',
    {
      'mdc-drawer--dismissible': props.dismissible,
      'mdc-drawer--modal': props.modal
    }
  ],
  consumeProps: ['dismissible', 'modal']
});

const slidableDrawerFactory = (MDCConstructor: Function, displayName: string) =>
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

    open: any;

    initialize() {
      console.log('HERE');
      //override to kill some abhorrent MDCWeb functionality...
    }

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
      const { onOpen, onClose, open, ...rest } = this.props;
      const { root_ } = this.foundationRefs;

      return <DrawerRoot ref={root_} {...rest} />;
    }
  };

const ModalDrawer = slidableDrawerFactory(MDCDrawer, 'ModalDrawer');

const DismissibleDrawer = slidableDrawerFactory(MDCDrawer, 'dismissibleDrawer');

export const Drawer: React.ComponentType<DrawerPropsT> = (
  props: DrawerPropsT
) => {
  if (props.dismissible) {
    return <DismissibleDrawer {...props} />;
  }

  if (props.modal) {
    if (React.Fragment !== undefined) {
      return (
        <React.Fragment>
          <ModalDrawer {...props} />
          <DrawerScrim />
        </React.Fragment>
      );
    } else {
      return <ModalDrawer {...props} />;
    }
  }

  return <DrawerRoot {...props} />;
};

Drawer.displayName = 'Drawer';

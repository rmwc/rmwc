// @flow
import type { SimpleTagPropsT, CustomEventT } from '../Base';

import * as React from 'react';
import { MDCMenu, MDCMenuFoundation } from '@material/menu/dist/mdc.menu';
import { List, ListItem } from '../List';
import { simpleTag, withFoundation, syncFoundationProp } from '../Base';

/****************************************************************
 * Private
 ****************************************************************/
export const MenuRoot = simpleTag({
  displayName: 'MenuRoot',
  classNames: props => ['mdc-menu'],
  defaultProps: {
    tabIndex: '-1'
  }
});

export const MenuItems = simpleTag({
  displayName: 'MenuItems',
  tag: List,
  classNames: 'mdc-list mdc-menu__items',
  defaultProps: {
    role: 'menu',
    'aria-hidden': 'true'
  }
});

/****************************************************************
 * Public
 ****************************************************************/

/** This is just the ListItem component exported from the Menu module for convenience. You can use `ListItem` or `SimpleListItem` components from the List section as long as you add `role="menuitem"` and `tabIndex="0"` to the components for accessibility. */
export class MenuItem extends React.Component<any> {
  static displayName = 'MenuItem';

  render() {
    return <ListItem role="menuitem" tabIndex={0} {...this.props} />;
  }
}

/** A Menu Anchor. When using the anchorCorner prop of Menu, you must set MenuAnchors position to absolute. */
export const MenuAnchor = simpleTag({
  displayName: 'MenuAnchor',
  classNames: 'mdc-menu-anchor'
});

const ANCHOR_CORNER_MAP = {
  bottomEnd: 'BOTTOM_END',
  bottomLeft: 'BOTTOM_LEFT',
  bottomRight: 'BOTTOM_RIGHT',
  bottomStart: 'BOTTOM_START',
  topEnd: 'TOP_END',
  topLeft: 'TOP_LEFT',
  topRight: 'TOP_RIGHT',
  topStart: 'TOP_START'
};

// prettier-ignore
type AnchorT = 'bottomEnd' | 'bottomLeft' | 'bottomRight' | 'bottomStart' | 'topEnd' | 'topLeft' | 'topRight' | 'topStart';

export type SelectedEventDetailT = {
  index: number,
  item: HTMLElement
};

export type MenuPropsT = {
  /** Whether or not the Menu is open. */
  open?: boolean,
  /** Callback that fires for either onSelected or onCancel, convenient for setting the closed state. */
  onClose?: (evt: CustomEventT<void>) => mixed,
  /** Callback that fires when a Menu item is selected. */
  onSelected?: (evt: CustomEventT<SelectedEventDetailT>) => mixed,
  /** Callback that fires when the menu is closed with nothing selected. */
  onCancel?: (evt: CustomEventT<void>) => mixed,
  /** Manually position the menu to one of the corners. */
  anchorCorner?: AnchorT
} & SimpleTagPropsT;

/** A menu component */
export class Menu extends withFoundation({
  constructor: MDCMenu,
  adapter: {
    registerBodyClickHandler: function(handler) {
      // Corrects a sync issue with MDC, it was registering even though the menu was closed
      // This has to do with the necessity to sync the foundation and react whenever an event fires
      // $FlowFixMe
      this.open && document.body.addEventListener('click', handler);
    },
    notifySelected: function(evtData) {
      const evt = this.emit(MDCMenuFoundation.strings.SELECTED_EVENT, {
        index: evtData.index,
        item: this.items[evtData.index]
      });
      this.props.onClose && this.props.onClose(evt);
    },
    notifyCancel: function() {
      const evt = this.emit(MDCMenuFoundation.strings.CANCEL_EVENT, {});
      this.props.onClose && this.props.onClose(evt);
    }
  }
})<MenuPropsT> {
  static displayName = 'Menu';

  open: boolean;
  setAnchorCorner: Function;

  syncWithProps(nextProps: MenuPropsT) {
    // open
    // timeout corrects an issue the synchronicity of the events from MDCMenu
    setTimeout(() => {
      syncFoundationProp(nextProps.open, this.open, () => {
        this.open = !!nextProps.open;
      });
    });

    // anchorCorner
    if (
      this.foundation_ &&
      nextProps.anchorCorner !== undefined &&
      MDCMenuFoundation.Corner[ANCHOR_CORNER_MAP[nextProps.anchorCorner]] !==
        this.foundation_.anchorCorner_
    ) {
      this.setAnchorCorner(
        MDCMenuFoundation.Corner[ANCHOR_CORNER_MAP[nextProps.anchorCorner]]
      );
    }
  }

  render() {
    const {
      children,
      open,
      onClose,
      onCancel,
      onSelected,
      anchorCorner,
      ...rest
    } = this.props;

    const { root_ } = this.foundationRefs;

    return (
      <MenuRoot {...rest} elementRef={root_}>
        <MenuItems>{children}</MenuItems>
      </MenuRoot>
    );
  }
}

export type SimpleMenuPropsT = {
  /** An element that will open the menu when clicked  */
  handle: React.Element<any>,
  /** By default, props spread to the Menu component. These will spread to the MenuAnchor which is useful for things like overall positioning of the anchor.   */
  rootProps?: Object,
  /** Children to render */
  children?: React.Node
} & MenuPropsT;

export type SimpleMenuStateT = {
  open: boolean
};

/**
 * A Simplified menu component that allows you to pass a handle element and will automatically control the open state and add a MenuAnchor
 */
export class SimpleMenu extends React.Component<
  SimpleMenuPropsT,
  SimpleMenuStateT
> {
  static displayName = 'SimpleMenu';

  componentWillMount() {
    this.syncWithOpenProp(this.props.open);
  }

  componentWillReceiveProps(nextProps: SimpleMenuPropsT) {
    this.syncWithOpenProp(nextProps.open);
  }

  state = {
    open: false
  };

  syncWithOpenProp(open?: boolean) {
    if (open !== undefined && this.state.open !== open) {
      this.setState({ open });
    }
  }

  render() {
    const {
      handle,
      onClose,
      children,
      rootProps = {},
      open,
      ...rest
    } = this.props;
    const wrappedHandle = React.cloneElement(handle, {
      ...handle.props,
      onClick: evt => {
        this.setState({ open: true });
        if (handle.props.onClick) {
          handle.props.onClick(evt);
        }
      }
    });

    const wrappedOnClose = evt => {
      this.setState({ open: open || false });
      if (onClose) {
        onClose(evt);
      }
    };

    return (
      <MenuAnchor {...rootProps}>
        <Menu {...rest} onClose={wrappedOnClose} open={this.state.open}>
          {children}
        </Menu>
        {wrappedHandle}
      </MenuAnchor>
    );
  }
}

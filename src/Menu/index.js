// @flow
import * as React from 'react';
import {
  MDCMenu,
  MDCMenuFoundation
} from '@material/menu/dist/mdc.menu';
import { List, ListItem } from '../List';
import { simpleTag, withMDC, noop } from '../Base';

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
    "role": 'menu',
    'aria-hidden': 'true'
  }
});

/****************************************************************
 * Public
 ****************************************************************/

/** This is just the ListItem component exported from the Menu module for convience. */
export const MenuItem = (props: any) => (
  <ListItem role="menuitem" tabIndex="0" {...props} />
);

MenuItem.displayName = 'MenuItem';

/** A Menu Anchor. When using the anchorCorner prop of Menu, you must set MenuAnchors position to absolute. */
export const MenuAnchor = simpleTag({
  displayName: 'MenuAnchor',
  classNames: 'mdc-menu-anchor'
});

const ANCHOR_CORNER_MAP = {
  bottomEnd: 'BOTTOM_END',
  bottomeLeft: 'BOTTOM_LEFT',
  bottomRight: 'BOTTOM_RIGHT',
  bottomStart: 'BOTTOM_START',
  topEnd: 'TOP_END',
  topLeft: 'TOP_LEFT',
  topRight: 'TOP_RIGHT',
  topStart: 'TOP_START'
};

// prettier-ignore
type AnchorT = 'bottomEnd' | 'bottomeLeft' | 'bottomRight' | 'bottomStart' | 'topEnd' | 'topLeft' | 'topRight' | 'topStart';

type MenuPropsT = {
  /** Whether or not the Menu is open. */
  open?: boolean,
  /** Callback that fires when the Menu closes. */
  onClose?: (evt: Event) => mixed,
  /** Callback that fires when a Menu item is selected. */
  onSelected?: (evt: Event) => mixed,
  /** Manually position the menu to one of the corners. */
  anchorCorner?: AnchorT
};

const handleMenuChange = (evt, props) => {
  evt.target.value = false;
  props.onClose(evt);
};

/** A menu component */
export const Menu = withMDC({
  mdcConstructor: MDCMenu,
  mdcElementRef: true,
  mdcEvents: {
    'MDCMenu:cancel': (evt, props, api) => {
      handleMenuChange(evt, props);
    },
    'MDCMenu:selected': (evt, props, api) => {
      handleMenuChange(evt, props);
      props.onSelected(evt);
    }
  },
  defaultProps: {
    open: false,
    onSelected: noop,
    onClose: noop
  },
  onMount: (props, api) => {
    if (props.open) {
      api.quickOpen = true;
      api.open = true;
      api.quickOpen = false;
    }
  },
  onUpdate: (props, nextProps, api) => {
    if (
      api &&
      MDCMenuFoundation.Corner[
        ANCHOR_CORNER_MAP[nextProps.anchorCorner]
      ] !== api.foundation_.anchorCorner_
    ) {
      api.setAnchorCorner(
        MDCMenuFoundation.Corner[
          ANCHOR_CORNER_MAP[nextProps.anchorCorner]
        ]
      );
    }

    if (api && nextProps.open !== undefined && api.open !== nextProps.open) {
      api.open = nextProps.open;
    }
  }
})(
  class extends React.Component<MenuPropsT> {
    static displayName = 'Menu';

    render() {
      const {
        children,
        open,
        onClose,
        onSelected,
        mdcElementRef,
        anchorCorner,
        ...rest
      } = this.props;

      return (
        <MenuRoot elementRef={mdcElementRef} {...rest}>
          <MenuItems>{children}</MenuItems>
        </MenuRoot>
      );
    }
  }
);

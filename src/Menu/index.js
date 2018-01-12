// @flow
import * as React from 'react';
import {
  MDCSimpleMenu,
  MDCSimpleMenuFoundation
} from '@material/menu/dist/mdc.menu';
import { List, ListItem } from '../List';
import { simpleTag, withMDC, noop } from '../Base';

/****************************************************************
 * Private
 ****************************************************************/
export const SimpleMenuRoot = simpleTag({
  displayName: 'MenuRoot',
  classNames: props => ['mdc-simple-menu'],
  defaultProps: {
    tabIndex: '-1'
  }
});

export const SimpleMenuItems = simpleTag({
  displayName: 'MenuItems',
  tag: List,
  classNames: 'mdc-simple-menu__items',
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

/** A Menu Anchor. When using the anchorCorner prop of SimpleMenu, you must set MenuAnchors position to absolute. */
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

type SimpleMenuPropsT = {
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
export const SimpleMenu = withMDC({
  mdcConstructor: MDCSimpleMenu,
  mdcElementRef: true,
  mdcEvents: {
    'MDCSimpleMenu:cancel': (evt, props, api) => {
      handleMenuChange(evt, props);
    },
    'MDCSimpleMenu:selected': (evt, props, api) => {
      handleMenuChange(evt, props);
      props.onSelected(evt);
    }
  },
  defaultProps: {
    open: false,
    onSelected: noop,
    onClose: noop
  },
  onUpdate: (props, nextProps, api) => {
    if (
      api &&
      MDCSimpleMenuFoundation.Corner[
        ANCHOR_CORNER_MAP[nextProps.anchorCorner]
      ] !== api.foundation_.anchorCorner_
    ) {
      api.setAnchorCorner(
        MDCSimpleMenuFoundation.Corner[
          ANCHOR_CORNER_MAP[nextProps.anchorCorner]
        ]
      );
    }

    if (api && nextProps.open !== undefined && api.open !== nextProps.open) {
      api.open = nextProps.open;
    }
  }
})(
  class extends React.Component<SimpleMenuPropsT> {
    static displayName = 'SimpleMenu';

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
        <SimpleMenuRoot elementRef={mdcElementRef} {...rest}>
          <SimpleMenuItems>{children}</SimpleMenuItems>
        </SimpleMenuRoot>
      );
    }
  }
);

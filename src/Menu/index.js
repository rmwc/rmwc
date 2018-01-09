// @flow
import * as React from 'react';
import {
  MDCSimpleMenu,
  MDCSimpleMenuFoundation
} from '@material/menu/dist/mdc.menu';
import { List, ListItem } from '../List';
import { simpleTag, withMDC, noop } from '../Base';

export const MenuItem = (props: any) => (
  <ListItem role="menuitem" tabIndex="0" {...props} />
);

export const MenuAnchor = simpleTag({
  displayName: 'MenuAnchor',
  classNames: 'mdc-menu-anchor'
});

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

type MenuPropsT = {
  /** Whether or not the Menu is open. */
  open?: boolean,
  /** Callback that fires when the Menu closes. */
  onClose?: (evt: Event) => mixed,
  /** Callback that fires when a Menu item is selected. */
  onSelected?: (evt: Event) => mixed,
  /** Manually position the menu to one of the corners. */
  anchorCorner?:
    | 'BOTTOM_END'
    | 'BOTTOM_LEFT'
    | 'BOTTOM_RIGHT'
    | 'BOTTOM_START'
    | 'TOP_END'
    | 'TOP_LEFT'
    | 'TOP_RIGHT'
    | 'TOP_START'
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
    console.log(
      api,
      MDCSimpleMenuFoundation.Corner,
      MDCSimpleMenuFoundation.Corner[nextProps.anchorCorner],
      api.foundation_.anchorCorner_
    );
    if (
      api &&
      MDCSimpleMenuFoundation.Corner[nextProps.anchorCorner] !==
        api.foundation_.anchorCorner_
    ) {
      console.log(
        'set',
        MDCSimpleMenuFoundation.Corner[nextProps.anchorCorner]
      );
      api.setAnchorCorner(
        MDCSimpleMenuFoundation.Corner[nextProps.anchorCorner]
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
        <SimpleMenuRoot elementRef={mdcElementRef} {...rest}>
          <SimpleMenuItems>{children}</SimpleMenuItems>
        </SimpleMenuRoot>
      );
    }
  }
);

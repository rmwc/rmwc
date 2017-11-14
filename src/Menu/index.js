// @flow
import * as React from 'react';
import { MDCSimpleMenu } from '@material/menu/dist/mdc.menu';
import { List, ListItem } from '../List';
import { simpleTag, withMDC } from '../Base';

export const MenuItem = (props: any) => (
  <ListItem role="menuitem" tabIndex="0" {...props}>
    {props.children}
  </ListItem>
);

export const MenuAnchor = simpleTag({
  displayName: 'MenuAnchor',
  classNames: 'mdc-menu-anchor'
});

export const MenuRoot = simpleTag({
  displayName: 'MenuRoot',
  classNames: 'mdc-simple-menu',
  defaultProps: {
    tabIndex: '-1'
  }
});

type MenuPropsT = {
  /* Whether or not the Menu is open. */
  open: boolean,
  /* Callback that fires when the Menu closes. */
  onClose: Event => mixed,
  /* Callback that fires when a Menu item is selected. */
  onSelected: Event => mixed
};

const handleMenuChange = (evt, props) => {
  evt.target.value = false;
  props.onClose(evt);
};

export const Menu: React.ComponentType<MenuPropsT> = withMDC({
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
  onUpdate: (props, nextProps, api) => {
    if (api && nextProps.open !== undefined && api.open !== nextProps.open) {
      api.open = nextProps.open;
    }
  }
})(({ children, open, onClose, onSelected, mdcElementRef, ...rest }) => (
  <MenuRoot elementRef={mdcElementRef} {...rest}>
    <List className="mdc-simple-menu__items" role="menu" aria-hidden="true">
      {children}
    </List>
  </MenuRoot>
));

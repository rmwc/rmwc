import * as RMWC from '@rmwc/types';
import React from 'react';

import { List, ListItem, ListItemProps, ListProps, ListApi } from '@rmwc/list';
import { getDisplayName, classNames, useClassNames } from '@rmwc/base';

import {
  MenuSurface,
  MenuSurfaceAnchor,
  MenuSurfaceProps,
  MenuSurfaceOnCloseEventT,
  MenuSurfaceApi
} from './menu-surface';

import { useMenuFoundation } from './menu-foundation';

/****************************************************************
 * Menu
 ****************************************************************/
export type MenuOnSelectEventT = RMWC.CustomEventT<{
  index: number;
  item: HTMLElement;
}>;

export interface MenuApi extends ListApi, MenuSurfaceApi {
  items: () => HTMLLIElement[];
}

/** A menu component for displaying lists items. */
export interface MenuProps extends Omit<MenuSurfaceProps, 'apiRef'> {
  /** Callback that fires when a Menu item is selected. evt.detail = { index: number; item: HTMLElement; } */
  onSelect?: (evt: MenuOnSelectEventT) => void;
  /** Whether or not to focus the first list item on open. Defaults to true. */
  focusOnOpen?: boolean;
  /** Internal api reference for cross component communication. */
  apiRef?: (api: MenuApi) => void;
}

/** A wrapper for menu items */
export interface MenuItemsProps extends ListProps {}

/** A wrapper for menu items */
export const MenuItems = React.forwardRef(function MenuItems(
  props: MenuItemsProps & RMWC.ComponentProps,
  ref: React.Ref<any>
) {
  const className = useClassNames(props, ['mdc-list mdc-menu__items']);
  return <List role="menu" {...props} className={className} ref={ref} />;
});
MenuItems.displayName = 'MenuItems';

/** This is just the ListItem component exported from the Menu module for convenience. You can use `ListItem` or `SimpleListItem` components from the List section as long as you add `role="menuitem"` and `tabIndex="0"` to the components for accessibility. */
export interface MenuItemProps extends ListItemProps {}

/** This is just the ListItem component exported from the Menu module for convenience. You can use `ListItem` or `SimpleListItem` components from the List section as long as you add `role="menuitem"` and `tabIndex="0"` to the components for accessibility. */
export const MenuItem = React.forwardRef(function MenuItem(
  props: MenuItemProps & RMWC.ComponentProps,
  ref: React.Ref<any>
) {
  return <ListItem role="menuitem" tabIndex={0} {...props} ref={ref} />;
});
MenuItem.displayName = 'MenuItem';

const isMenuItems = (child: React.ReactNode) =>
  getDisplayName(child) === 'MenuItems';

/** A menu component for displaying lists items. */
export const Menu = React.forwardRef(function Menu(
  props: MenuProps & Omit<RMWC.ComponentProps, 'onSelect'>,
  ref: React.Ref<any>
) {
  const { children, focusOnOpen, onSelect, ...rest } = props;
  const { rootEl, setListApi, setMenuSurfaceApi } = useMenuFoundation(props);

  const needsMenuItemsWrapper = (
    React.Children.map(children, isMenuItems) || []
  ).every(val => val === false);

  const menuItemsProps = {
    apiRef: setListApi
  };

  return (
    <MenuSurface
      {...rootEl.props(rest)}
      aria-hidden={!rest.open}
      className={classNames('mdc-menu', rest.className)}
      apiRef={setMenuSurfaceApi}
      ref={ref}
    >
      {needsMenuItemsWrapper ? (
        <MenuItems {...menuItemsProps}>{children}</MenuItems>
      ) : (
        React.Children.map(children, child => {
          if (isMenuItems(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              ...(React.isValidElement(child) && child.props),
              ...menuItemsProps
            });
          }
          return child;
        })
      )}
    </MenuSurface>
  );
});
Menu.displayName = 'Menu';

/****************************************************************
 * Simple Menu
 ****************************************************************/

/** A Simplified menu component that allows you to pass a handle element and will automatically control the open state and add a MenuSurfaceAnchor */
export interface SimpleMenuProps extends MenuProps {
  /** An element that will open the menu when clicked  */
  handle: React.ReactElement<any>;
  /** By default, props spread to the Menu component. These will spread to the MenuSurfaceAnchor which is useful for things like overall positioning of the anchor.   */
  rootProps?: Object;
  /** Children to render */
  children?: React.ReactNode;
}

/** The same as SimpleMenu, but a generic surface. */
export interface SimpleMenuSurfaceProps extends MenuSurfaceProps {
  /** An element that will open the menu when clicked  */
  handle: React.ReactElement<any>;
  /** By default, props spread to the Menu component. These will spread to the MenuSurfaceAnchor which is useful for things like overall positioning of the anchor.   */
  rootProps?: Object;
  /** Children to render */
  children?: React.ReactNode;
}

export interface SimpleMenuState {
  open: boolean;
}

const simpleMenuFactory = <Props extends SimpleMenuProps>(
  MenuComponent: React.ComponentType<MenuProps | MenuSurfaceProps> &
    RMWC.ComponentProps
): React.ComponentType<Props> =>
  class extends React.Component<Props, SimpleMenuState> {
    static displayName = 'Simple' + MenuComponent.displayName;

    componentDidMount() {
      this.syncWithOpenProp(this.props.open);
    }

    componentDidUpdate(nextProps: Props) {
      this.syncWithOpenProp(nextProps.open);
    }

    state = {
      open: !!this.props.open
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
        onClick: (evt: React.MouseEvent) => {
          this.setState({ open: !this.state.open });
          if (handle.props.onClick) {
            handle.props.onClick(evt);
          }
        }
      });

      const wrappedOnClose = (evt: MenuSurfaceOnCloseEventT) => {
        this.setState({ open: !!open || false });
        if (onClose) {
          onClose(evt);
        }
      };

      return (
        <MenuSurfaceAnchor {...rootProps}>
          <MenuComponent
            {...rest}
            onClose={wrappedOnClose}
            open={this.state.open}
          >
            {children}
          </MenuComponent>
          {wrappedHandle}
        </MenuSurfaceAnchor>
      );
    }
  };

/** A Simplified menu component that allows you to pass a handle element and will automatically control the open state and add a MenuSurfaceAnchor */
export const SimpleMenu = simpleMenuFactory<SimpleMenuProps>(Menu);

/** The same as SimpleMenu, but a generic surface. */
export const SimpleMenuSurface = simpleMenuFactory<SimpleMenuSurfaceProps>(
  MenuSurface as any
);

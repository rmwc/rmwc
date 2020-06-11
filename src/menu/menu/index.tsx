import * as RMWC from '@rmwc/types';
import React, { useEffect, useState } from 'react';
import { MDCMenuFoundation } from '@material/menu';
import { List, ListItem, ListItemProps, ListProps, ListApi } from '@rmwc/list';
import {
  getDisplayName,
  classNames,
  useClassNames,
  createComponent
} from '@rmwc/base';

import {
  MenuSurface,
  MenuSurfaceAnchor,
  MenuSurfaceProps,
  MenuSurfaceOnCloseEventT,
  MenuSurfaceApi
} from '../menu-surface';

import { useMenuFoundation } from './foundation';

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
export interface MenuProps
  extends Omit<MenuSurfaceProps, 'apiRef' | 'foundationRef'> {
  /** Callback that fires when a Menu item is selected. evt.detail = { index: number; item: HTMLElement; } */
  onSelect?: (evt: MenuOnSelectEventT) => void;
  /** Whether or not to focus the first list item on open. Defaults to true. */
  focusOnOpen?: boolean;
  /** Internal api reference for cross component communication. */
  apiRef?: (api: MenuApi | null) => void;
  /** Advanced: A reference to the MDCFoundation. */
  foundationRef?: React.Ref<MDCMenuFoundation>;
}

export type MenuHTMLProps = RMWC.HTMLProps<
  HTMLInputElement,
  Omit<React.AllHTMLAttributes<HTMLInputElement>, 'onSelect'>
>;

/** A wrapper for menu items */
export interface MenuItemsProps extends ListProps {}

/** A wrapper for menu items */
export const MenuItems = createComponent<MenuItemsProps>(function MenuItems(
  props,
  ref
) {
  const className = useClassNames(props, ['mdc-list mdc-menu__items']);
  return <List role="menu" {...props} className={className} ref={ref} />;
});
MenuItems.displayName = 'MenuItems';

/** This is just the ListItem component exported from the Menu module for convenience. You can use `ListItem` or `SimpleListItem` components from the List section as long as you add `role="menuitem"` and `tabIndex="0"` to the components for accessibility. */
export interface MenuItemProps extends ListItemProps {}

/** This is just the ListItem component exported from the Menu module for convenience. You can use `ListItem` or `SimpleListItem` components from the List section as long as you add `role="menuitem"` and `tabIndex="0"` to the components for accessibility. */
export const MenuItem = createComponent<MenuItemProps>(function MenuItem(
  props,
  ref
) {
  return <ListItem role="menuitem" tabIndex={0} {...props} ref={ref} />;
});

const isMenuItems = (child: React.ReactNode) =>
  getDisplayName(child) === 'MenuItems';

/** A menu component for displaying lists items. */
export const Menu: RMWC.ComponentType<
  MenuProps,
  MenuHTMLProps,
  'div'
> = createComponent<MenuProps, MenuHTMLProps>(function Menu(props, ref) {
  const { children, focusOnOpen, onSelect, foundationRef, ...rest } = props;
  const { rootEl, setListApi, setMenuSurfaceApi } = useMenuFoundation(props);

  const needsMenuItemsWrapper = (
    React.Children.map(children, isMenuItems) || []
  ).every((val) => val === false);

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
        React.Children.map(children, (child) => {
          if (isMenuItems(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              ...(React.isValidElement(child) ? (child.props as Object) : {}),
              ...menuItemsProps
            });
          }
          return child;
        })
      )}
    </MenuSurface>
  );
});

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

const simpleMenuFactory = <
  Props extends SimpleMenuProps | SimpleMenuSurfaceProps
>(
  MenuComponent: typeof Menu | typeof MenuSurface
): React.ComponentType<Props> =>
  function (props: Props) {
    const [stateOpen, setStateOpen] = useState(!!props.open);

    useEffect(() => {
      if (props.open !== undefined && props.open !== stateOpen) {
        setStateOpen(!!props.open);
      }
    }, [props.open, stateOpen]);

    const {
      handle,
      onClose,
      children,
      rootProps = {},
      open,
      foundationRef,
      ...rest
    } = props;

    const wrappedHandle = React.cloneElement(handle, {
      ...handle.props,
      onClick: (evt: React.MouseEvent) => {
        setStateOpen(!stateOpen);
        if (handle.props.onClick) {
          handle.props.onClick(evt);
        }
      }
    });

    const wrappedOnClose = (evt: MenuSurfaceOnCloseEventT) => {
      setStateOpen(!!open || false);
      onClose?.(evt);
    };

    const RenderMenuComponent = MenuComponent as React.ComponentType<MenuProps>;

    return (
      <MenuSurfaceAnchor {...rootProps}>
        <RenderMenuComponent
          {...rest}
          onClose={wrappedOnClose}
          open={stateOpen}
        >
          {children}
        </RenderMenuComponent>
        {wrappedHandle}
      </MenuSurfaceAnchor>
    );
  };

/** A Simplified menu component that allows you to pass a handle element and will automatically control the open state and add a MenuSurfaceAnchor */
export const SimpleMenu = simpleMenuFactory<SimpleMenuProps>(Menu);

/** The same as SimpleMenu, but a generic surface. */
export const SimpleMenuSurface = simpleMenuFactory<SimpleMenuSurfaceProps>(
  MenuSurface
);

import * as RMWC from '@rmwc/types';
import * as React from 'react';

import { MDCMenuFoundation, Corner } from '@material/menu';

import { List, ListItem, ListItemProps, ListProps } from '@rmwc/list';
import { componentFactory, FoundationComponent, closest } from '@rmwc/base';

import {
  MenuSurface,
  MenuSurfaceAnchor,
  MenuSurfaceProps,
  MenuSurfaceOnOpenEventT,
  MenuSurfaceOnCloseEventT
} from './menu-surface';

/****************************************************************
 * Menu
 ****************************************************************/
export type MenuOnSelectEventT = RMWC.CustomEventT<{
  index: number;
  item: HTMLElement;
}>;

/** A menu component for displaying lists items. */
export interface MenuProps extends MenuSurfaceProps {
  /** Callback that fires when a Menu item is selected. evt.detail = { index: number; item: HTMLElement; } */
  onSelect?: (evt: MenuOnSelectEventT) => void;
  /** Whether or not to focus the first list item on open. Defaults to true. */
  focusOnOpen?: boolean;
}

/** A wrapper for menu items */
export interface MenuItemsProps extends ListProps {}

/** A wrapper for menu items */
export const MenuItems = componentFactory<MenuItemsProps>({
  displayName: 'MenuItems',
  tag: List,
  classNames: ['mdc-list mdc-menu__items'],
  defaultProps: {
    role: 'menu'
  }
});

/** This is just the ListItem component exported from the Menu module for convenience. You can use `ListItem` or `SimpleListItem` components from the List section as long as you add `role="menuitem"` and `tabIndex="0"` to the components for accessibility. */
export interface MenuItemProps extends ListItemProps {}

/** This is just the ListItem component exported from the Menu module for convenience. You can use `ListItem` or `SimpleListItem` components from the List section as long as you add `role="menuitem"` and `tabIndex="0"` to the components for accessibility. */
export const MenuItem = componentFactory<MenuItemProps>({
  displayName: 'MenuItem',
  tag: ListItem,
  defaultProps: {
    role: 'menuitem',
    tabIndex: 0
  }
});

/** A menu component for displaying lists items. */
export class Menu extends FoundationComponent<MDCMenuFoundation, MenuProps> {
  static displayName = 'Menu';
  static defaultProps = {
    focusOnOpen: true
  };

  list: List | null = null;
  menuSurface: MenuSurface | null = null;

  constructor(props: MenuProps) {
    super(props);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  get items() {
    return this.list ? this.list.listElements : [];
  }

  hoistMenuToBody() {
    this.menuSurface && this.menuSurface.hoistMenuToBody();
  }

  setAnchorCorner(corner: Corner) {
    this.menuSurface && this.menuSurface.setAnchorCorner(corner);
  }

  setAnchorElement(element: HTMLElement) {
    this.menuSurface && (this.menuSurface.anchorElement = element);
  }

  getDefaultFoundation() {
    return new MDCMenuFoundation({
      addClassToElementAtIndex: (index: number, className: string) => {
        const list = this.items;
        list[index].classList.add(className);
      },
      removeClassFromElementAtIndex: (index: number, className: string) => {
        const list = this.items;
        list[index].classList.remove(className);
      },
      addAttributeToElementAtIndex: (
        index: number,
        attr: string,
        value: string
      ) => {
        const list = this.items;
        list[index].setAttribute(attr, value);
      },
      removeAttributeFromElementAtIndex: (index: number, attr: string) => {
        const list = this.items;
        list[index].removeAttribute(attr);
      },
      elementContainsClass: (element: HTMLElement, className: string) =>
        element.classList.contains(className),
      closeSurface: () => {
        this.menuSurface && (this.menuSurface.open = false);
      },
      getElementIndex: (element: HTMLElement) =>
        this.items.indexOf(element as HTMLLIElement),
      getParentElement: (element: HTMLElement) => element.parentElement,
      getSelectedElementIndex: (selectionGroup: HTMLElement) => {
        return this.items.indexOf(selectionGroup.querySelector(
          `.${MDCMenuFoundation.cssClasses.MENU_SELECTED_LIST_ITEM}`
        ) as HTMLLIElement);
      },
      notifySelected: (evtData: { index: number; item: HTMLElement }) =>
        this.emit('onSelect', {
          index: evtData.index,
          item: this.items[evtData.index]
        })
    });
  }

  handleClick(evt: React.MouseEvent) {
    this.props.onClick && this.props.onClick(evt);
    // fixes an issue with nested span element on list items
    const el = closest(evt.target, '.mdc-list-item');
    el && this.foundation.handleItemAction(el);
  }

  handleKeydown(evt: React.KeyboardEvent & KeyboardEvent) {
    this.props.onKeyDown && this.props.onKeyDown(evt);
    this.foundation.handleKeydown(evt);

    // Jump through some hoops to find out
    // that we are selecting the list item
    // This is instead of trying to listen to an event on the list item
    // which is what MDC does
    if (
      evt.which === 13 &&
      evt.target instanceof Element &&
      evt.target.classList.contains(List.cssClasses.LIST_ITEM_CLASS)
    ) {
      this.foundation.handleItemAction(evt.target);
    }
  }

  handleOpen(evt: MenuSurfaceOnOpenEventT) {
    const list = this.items;
    if (
      this.props.focusOnOpen &&
      list.length > 0 &&
      !list.some(el => el === document.activeElement)
    ) {
      list[0].focus();
    }
    this.props.onOpen && this.props.onOpen(evt);
  }

  render() {
    const { children, focusOnOpen, ...rest } = this.props;

    const needsMenuItemsWrapper = !(
      children &&
      typeof children === 'object' &&
      ((children as any).type || {}).displayName === 'MenuItems'
    );

    return (
      <MenuSurface
        {...rest}
        aria-hidden={!rest.open}
        className={`mdc-menu ${rest.className || ''}`}
        onKeyDown={this.handleKeydown}
        onClick={this.handleClick}
        onOpen={this.handleOpen}
        ref={(menuSurfaceApi: MenuSurface) =>
          (this.menuSurface = menuSurfaceApi)
        }
      >
        {needsMenuItemsWrapper ? (
          <MenuItems ref={(listApi: List) => (this.list = listApi)}>
            {children}
          </MenuItems>
        ) : (
          React.cloneElement(children as React.ReactElement<any>, {
            ref: (listApi: List) => (this.list = listApi)
          })
        )}
      </MenuSurface>
    );
  }
}

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
  MenuSurface
);

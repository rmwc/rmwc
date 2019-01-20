import * as React from 'react';
// @ts-ignore
import { MDCMenuFoundation } from '@material/menu';

import { List, ListItem } from '@rmwc/list';
import {
  componentFactory,
  FoundationComponent,
  CustomEventT
} from '@rmwc/base';

import {
  MenuSurface,
  MenuSurfaceAnchor,
  MenuSurfaceProps
} from './menu-surface';

/****************************************************************
 * Menu
 ****************************************************************/

export interface MenuProps extends MenuSurfaceProps {
  /** Callback that fires when a Menu item is selected. */
  onSelect?: (
    evt:
      | CustomEventT<{
          index: number;
          item: HTMLElement;
        }>
      | any
  ) => void;
}

export const MenuRoot = componentFactory<MenuProps>({
  displayName: 'MenuRoot',
  classNames: (props: MenuProps) => [
    'mdc-menu',
    'mdc-menu-surface',
    {
      'mdc-menu-surface--fixed': props.fixed
    }
  ],
  consumeProps: ['fixed'],
  defaultProps: {
    tabIndex: -1
  }
});

export const MenuItems = componentFactory<{}>({
  displayName: 'MenuItems',
  tag: List,
  classNames: ['mdc-list mdc-menu__items'],
  defaultProps: {
    role: 'menu'
  }
});

/** This is just the ListItem component exported from the Menu module for convenience. You can use `ListItem` or `SimpleListItem` components from the List section as long as you add `role="menuitem"` and `tabIndex="0"` to the components for accessibility. */

export const MenuItem = componentFactory<{}>({
  displayName: 'MenuItem',
  tag: ListItem,
  defaultProps: {
    role: 'menuitem',
    tabIndex: 0
  }
});

/** A menu component for displaying lists items. */
export class Menu extends FoundationComponent<MenuProps> {
  static displayName = 'Menu';

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

  setAnchorCorner(corner: string) {
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
    this.foundation.handleClick(evt);
  }

  handleKeydown(evt: React.KeyboardEvent) {
    this.props.onKeyDown && this.props.onKeyDown(evt);
    this.foundation.handleKeydown(evt);
  }

  handleOpen(evt: CustomEventT<{}>) {
    this.props.onOpen && this.props.onOpen(evt);
    const list = this.items;
    if (list.length > 0) {
      list[0].focus();
    }
  }

  render() {
    const { children, anchorCorner, ...rest } = this.props;

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
        <MenuItems ref={(listApi: List) => (this.list = listApi)}>
          {children}
        </MenuItems>
      </MenuSurface>
    );
  }
}

/****************************************************************
 * Simple Menu
 ****************************************************************/
export interface SimpleMenuProps extends MenuProps {
  /** An element that will open the menu when clicked  */
  handle: React.ReactElement<any>;
  /** By default, props spread to the Menu component. These will spread to the MenuSurfaceAnchor which is useful for things like overall positioning of the anchor.   */
  rootProps?: Object;
  /** Children to render */
  children?: React.ReactNode;
}

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
  MenuComponent: React.ComponentType<MenuProps | MenuSurfaceProps>
): React.ComponentType<Props> =>
  class extends React.Component<Props, SimpleMenuState> {
    static displayName = 'SimpleMenu';

    componentWillMount() {
      this.syncWithOpenProp(this.props.open);
    }

    componentWillReceiveProps(nextProps: Props) {
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
        onClick: (evt: CustomEventT<void>) => {
          this.setState({ open: !this.state.open });
          if (handle.props.onClick) {
            handle.props.onClick(evt);
          }
        }
      });

      const wrappedOnClose = (evt: CustomEventT<{}>) => {
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

/**
 * A Simplified menu component that allows you to pass a handle element and will automatically control the open state and add a MenuSurfaceAnchor
 */
export const SimpleMenu = simpleMenuFactory<SimpleMenuProps>(Menu);

/**
 * The same as SimpleMenu, but a generic surface.
 */
export const SimpleMenuSurface = simpleMenuFactory<SimpleMenuSurfaceProps>(
  MenuSurface
);

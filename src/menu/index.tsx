import { CustomEventT, FoundationComponent } from '@rmwc/base';

import * as React from 'react';
// @ts-ignore
import { MDCMenuFoundation } from '@material/menu';
import {
  MDCMenuSurfaceFoundation,
  util
  // @ts-ignore
} from '@material/menu-surface';
import { List, ListItem } from '@rmwc/list';
import { componentFactory, ComponentProps } from '@rmwc/base';

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

/****************************************************************
 * Menu
 ****************************************************************/
export type SelectedEventDetailT = {
  index: number;
  item: HTMLElement;
};

export type MenuSurfacePropsT = {
  /** Opens the menu. */
  open?: boolean;
  /** Make the menu position fixed. */
  fixed?: boolean;
  /** Manually position the menu to one of the corners. */
  anchorCorner?: AnchorT;
  /** Callback for when the menu is opened. */
  onOpen?: (evt: CustomEventT<void>) => void;
  /** Callback for when the menu is closed. */
  onClose?: (evt: CustomEventT<void>) => void;
  /** Children to render. */
  children?: React.ReactNode;
} & ComponentProps;

export type MenuPropsT = {
  /** Callback that fires when a Menu item is selected. */
  onSelect?: (evt: CustomEventT<SelectedEventDetailT>) => void;
} & MenuSurfacePropsT &
  ComponentProps;

export const MenuRoot = componentFactory({
  displayName: 'MenuRoot',
  classNames: (props: MenuPropsT) => [
    'mdc-menu',
    'mdc-menu-surface',
    {
      'mdc-menu-surface--fixed': props.fixed
    }
  ],
  consumeProps: ['fixed'],
  defaultProps: {
    tabIndex: '-1'
  }
});

export const MenuItems = componentFactory({
  displayName: 'MenuItems',
  tag: List,
  classNames: ['mdc-list mdc-menu__items'],
  defaultProps: {
    role: 'menu'
  }
});

/** This is just the ListItem component exported from the Menu module for convenience. You can use `ListItem` or `SimpleListItem` components from the List section as long as you add `role="menuitem"` and `tabIndex="0"` to the components for accessibility. */
export class MenuItem extends React.Component<any> {
  static displayName = 'MenuItem';

  render() {
    return <ListItem role="menuitem" tabIndex={0} {...this.props} />;
  }
}

/** A menu component for displaying lists items. */
export class Menu extends FoundationComponent<MenuPropsT> {
  static displayName = 'Menu';

  list: List | null = null;
  menuSurface: MenuSurface | null = null;

  get items() {
    return this.list ? this.list.listElements : [];
  }

  get open() {
    return this.menuSurface && this.menuSurface.open;
  }

  /** @param {boolean} value */
  set open(value) {
    this.menuSurface && (this.menuSurface.open = value);
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
      closeSurface: () => (this.open = false),
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

  sync(props: MenuPropsT, prevProps: MenuPropsT) {
    // open
    if (!!props.open !== this.open) {
      this.open = !!props.open;
    }

    // anchorCorner
    // if (
    //   this.foundation &&
    //   nextProps.anchorCorner !== undefined &&
    //   MDCMenuSurfaceFoundation.Corner[
    //     ANCHOR_CORNER_MAP[nextProps.anchorCorner]
    //   ] !== this.foundation.anchorCorner_
    // ) {
    //   this.setAnchorCorner(
    //     MDCMenuSurfaceFoundation.Corner[
    //       ANCHOR_CORNER_MAP[nextProps.anchorCorner]
    //     ]
    //     );
    //   }
  }

  // open?: boolean;
  // setAnchorCorner: Function = () => {};
  // menuSurface_: any;

  // constructor(props: MenuPropsT) {
  //   super(props);
  //   //$FlowFixMe
  //   this.onCloseHandler_ = this.onCloseHandler_.bind(this);
  // }

  // syncWithProps(nextProps: MenuPropsT) {
  //   // open
  //   syncFoundationProp(nextProps.open, this.open, () => {
  //     this.open = !!nextProps.open;
  //   });

  //   // anchorCorner
  //   if (
  //     this.foundation &&
  //     nextProps.anchorCorner !== undefined &&
  //     MDCMenuSurfaceFoundation.Corner[
  //       ANCHOR_CORNER_MAP[nextProps.anchorCorner]
  //     ] !== this.foundation.anchorCorner_
  //   ) {
  //     this.setAnchorCorner(
  //       MDCMenuSurfaceFoundation.Corner[
  //         ANCHOR_CORNER_MAP[nextProps.anchorCorner]
  //       ]
  //     );
  //   }
  // }

  // componentDidMount() {
  //   super.componentDidMount();
  //   this.menuSurface_.listen(
  //     MDCMenuSurfaceFoundation.strings.CLOSED_EVENT,
  //     this.onCloseHandler_
  //   );

  //   this.menuSurface_.listen(
  //     MDCMenuSurfaceFoundation.strings.OPENED_EVENT,
  //     (evt: CustomEventT<void>) => this.props.onOpen && this.props.onOpen(evt)
  //   );

  //   if (this.foundation) {
  //     this.foundation.preventDefaultEvent_ = (evt: CustomEventT<void>) => {
  //       const target = evt.target;
  //       if (target instanceof Element) {
  //         const tagName = `${target.tagName}`.toLowerCase();
  //         if (
  //           ['input', 'button', 'textarea', 'select', 'a'].indexOf(tagName) ===
  //           -1
  //         ) {
  //           evt.preventDefault();
  //         }
  //       }
  //     };
  //   }
  // }

  // onCloseHandler_(evt: CustomEventT<void>) {
  //   this.props.onClose && this.props.onClose(evt);

  //   // little hack. We need to broadcast an CustomEvent from this component
  //   // in order to keep MDC and React in sync.
  //   // Otherwise, the internal state of the component can change and not be reflected in React
  //   this.emit('RESYNC', {});
  // }

  // destroy() {
  //   this.menuSurface_.unlisten(
  //     MDCMenuSurfaceFoundation.strings.CLOSED_EVENT,
  //     this.onCloseHandler_
  //   );
  // }

  render() {
    const {
      children,
      open,
      onClose,
      onOpen,
      onSelect,
      anchorCorner,
      ...rest
    } = this.props;

    return (
      <MenuSurface
        {...rest}
        aria-hidden={!open}
        className={`mdc-menu ${rest.className || ''}`}
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
 * MenuSurface
 ****************************************************************/
export const MenuSurfaceRoot = componentFactory({
  displayName: 'MenuSurfaceRoot',
  classNames: (props: MenuSurfacePropsT) => [
    'mdc-menu-surface',
    {
      'mdc-menu-surface--fixed': props.fixed
    }
  ],
  consumeProps: ['fixed']
});

/** A generic menu component for displaying any type of content. */
export class MenuSurface extends FoundationComponent<MenuSurfacePropsT> {
  root = this.createElement('root');
  anchorElement: HTMLElement | null = null;
  previousFocus: HTMLElement | null = null;
  firstFocusableElement: HTMLElement | null = null;
  lastFocusableElement: HTMLElement | null = null;

  get open() {
    return this.foundation.isOpen();
  }

  /** @param {boolean} value */
  set open(value) {
    if (value) {
      const focusableElements = this.root.el
        ? this.root.el.querySelectorAll(
            MDCMenuSurfaceFoundation.strings.FOCUSABLE_ELEMENTS
          )
        : [];
      this.firstFocusableElement =
        focusableElements.length > 0 ? focusableElements[0] : null;
      this.lastFocusableElement =
        focusableElements.length > 0
          ? focusableElements[focusableElements.length - 1]
          : null;
      this.foundation.open();
    } else {
      this.foundation.close();
    }
  }

  getDefaultFoundation() {
    return new MDCMenuSurfaceFoundation({
      addClass: (className: string) => this.root.addClass(className),
      removeClass: (className: string) => this.root.removeClass(className),
      hasClass: (className: string) =>
        className === 'mdc-menu-surface' ? true : this.root.hasClass(className),
      hasAnchor: () => !!this.anchorElement,
      notifyClose: () => this.emit('onClose', {}),
      notifyOpen: () => this.emit('onOpen', {}),
      isElementInContainer: (el: HTMLElement) =>
        this.root.el === el || (this.root.el && this.root.el.contains(el)),
      isRtl: () =>
        this.root.el &&
        getComputedStyle(this.root.el).getPropertyValue('direction') === 'rtl',
      setTransformOrigin: (origin: string) => {
        this.root.setStyle(
          `${util.getTransformPropertyName(window)}-origin`,
          origin
        );
      },
      ...this.getFocusAdapterMethods(),
      ...this.getDimensionAdapterMethods()
    });
  }

  getFocusAdapterMethods() {
    return {
      isFocused: () => document.activeElement === this.root.el,
      saveFocus: () => {
        this.previousFocus = document.activeElement as HTMLElement;
      },
      restoreFocus: () => {
        if (this.root.el && this.root.el.contains(document.activeElement)) {
          if (this.previousFocus && this.previousFocus.focus) {
            this.previousFocus.focus();
          }
        }
      },
      isFirstElementFocused: () =>
        this.firstFocusableElement &&
        this.firstFocusableElement === document.activeElement,
      isLastElementFocused: () =>
        this.firstFocusableElement &&
        this.firstFocusableElement === document.activeElement,
      focusFirstElement: () =>
        this.firstFocusableElement &&
        this.firstFocusableElement.focus &&
        this.firstFocusableElement.focus(),
      focusLastElement: () =>
        this.firstFocusableElement &&
        this.firstFocusableElement.focus &&
        this.firstFocusableElement.focus()
    };
  }

  getDimensionAdapterMethods() {
    return {
      getInnerDimensions: () => {
        return {
          width: this.root.el && this.root.el.offsetWidth,
          height: this.root.el && this.root.el.offsetHeight
        };
      },
      getAnchorDimensions: () =>
        this.anchorElement && this.anchorElement.getBoundingClientRect(),
      getWindowDimensions: () => {
        return { width: window.innerWidth, height: window.innerHeight };
      },
      getBodyDimensions: () => {
        return {
          width: document.body.clientWidth,
          height: document.body.clientHeight
        };
      },
      getWindowScroll: () => {
        return { x: window.pageXOffset, y: window.pageYOffset };
      },
      setPosition: (position: {
        top: string;
        right: string;
        bottom: string;
        left: string;
      }) => {
        this.root.setStyle('left', 'left' in position ? position.left : null);
        this.root.setStyle(
          'right',
          'right' in position ? position.right : null
        );
        this.root.setStyle('top', 'top' in position ? position.top : null);
        this.root.setStyle(
          'bottom',
          'bottom' in position ? position.bottom : null
        );
      },
      setMaxHeight: (height: number) => {
        this.root.setStyle('maxHeight', height);
      }
    };
  }
  // open?: boolean;
  // foundation: any;
  // setAnchorCorner: Function = () => {};
  // deregisterBodyClickListener_: Function = () => {};

  // syncWithProps(nextProps: MenuSurfacePropsT) {
  //   //open
  //   syncFoundationProp(nextProps.open, this.open, () => {
  //     this.open = !!nextProps.open;
  //   });

  //   // anchorCorner
  //   if (
  //     nextProps.anchorCorner !== undefined &&
  //     MDCMenuSurfaceFoundation.Corner[
  //       ANCHOR_CORNER_MAP[nextProps.anchorCorner]
  //     ] !== this.foundation.anchorCorner_
  //   ) {
  //     this.setAnchorCorner(
  //       MDCMenuSurfaceFoundation.Corner[
  //         ANCHOR_CORNER_MAP[nextProps.anchorCorner]
  //       ]
  //     );
  //   }
  // }

  // destroy() {
  //   super.destroy();
  //   // Some extra cleanup to avoid JS errors from MDC
  //   this.foundation.adapter_.removeClass = () => {};
  //   this.deregisterBodyClickListener_();
  // }

  render() {
    const {
      children,
      open,
      anchorCorner,
      onOpen,
      onClose,
      ...rest
    } = this.props;

    return (
      <MenuSurfaceRoot {...this.root.props(rest)} ref={this.root.setEl}>
        {children}
      </MenuSurfaceRoot>
    );
  }
}

/****************************************************************
 * MenuSurfaceAnchor
 ****************************************************************/

/** A Menu Anchor. When using the anchorCorner prop of Menu, you must set MenuSurfaceAnchors css style position to absolute. */
export const MenuSurfaceAnchor = componentFactory({
  displayName: 'MenuSurfaceAnchor',
  classNames: ['mdc-menu-surface--anchor']
});

/****************************************************************
 * Simple Menu
 ****************************************************************/
export type SimpleMenuPropsT = {
  /** An element that will open the menu when clicked  */
  handle: React.ReactElement<any>;
  /** By default, props spread to the Menu component. These will spread to the MenuSurfaceAnchor which is useful for things like overall positioning of the anchor.   */
  rootProps?: Object;
  /** Children to render */
  children?: React.ReactNode;
};

export type SimpleMenuFactoryPropsT = SimpleMenuPropsT &
  MenuPropsT &
  MenuSurfacePropsT;

export type SimpleMenuStateT = {
  open: boolean;
};

const simpleMenuFactory = (
  MenuComponent: any
): React.ComponentType<SimpleMenuFactoryPropsT> =>
  class extends React.Component<SimpleMenuFactoryPropsT, SimpleMenuStateT> {
    static displayName = 'SimpleMenu';

    componentWillMount() {
      this.syncWithOpenProp(this.props.open);
    }

    componentWillReceiveProps(nextProps: SimpleMenuFactoryPropsT) {
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
        onClick: (evt: CustomEventT<void>) => {
          this.setState({ open: true });
          if (handle.props.onClick) {
            handle.props.onClick(evt);
          }
        }
      });

      const wrappedOnClose = (evt: CustomEventT<void>) => {
        this.setState({ open: open || false });
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

const SimpleMenuRoot = simpleMenuFactory(Menu);

/**
 * A Simplified menu component that allows you to pass a handle element and will automatically control the open state and add a MenuSurfaceAnchor
 */
export const SimpleMenu = (props: SimpleMenuPropsT & MenuPropsT) => (
  <SimpleMenuRoot {...props} />
);

const SimpleMenuSurfaceRoot = simpleMenuFactory(MenuSurface);

/**
 * The same as SimpleMenu, but a generic surface.
 */
export const SimpleMenuSurface = (
  props: SimpleMenuPropsT & MenuSurfacePropsT
) => <SimpleMenuSurfaceRoot {...props} />;

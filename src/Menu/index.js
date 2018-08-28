// @flow
import type { SimpleTagPropsT, CustomEventT } from '../Base';

import * as React from 'react';
import { MDCMenu } from '@material/menu/dist/mdc.menu';
import {
  MDCMenuSurface,
  MDCMenuSurfaceFoundation
} from '@material/menu-surface/dist/mdc.menuSurface';
import { List, ListItem } from '../List';
import { simpleTag, withFoundation, syncFoundationProp } from '../Base';

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
export const MenuRoot = simpleTag({
  displayName: 'MenuRoot',
  classNames: props => ['mdc-menu', 'mdc-menu-surface'],
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

/** This is just the ListItem component exported from the Menu module for convenience. You can use `ListItem` or `SimpleListItem` components from the List section as long as you add `role="menuitem"` and `tabIndex="0"` to the components for accessibility. */
export class MenuItem extends React.Component<any> {
  static displayName = 'MenuItem';

  render() {
    return <ListItem role="menuitem" tabIndex={0} {...this.props} />;
  }
}

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
  /** Manually position the menu to one of the corners. */
  anchorCorner?: AnchorT
} & SimpleTagPropsT;

/** A menu component */
export class Menu extends withFoundation({
  constructor: MDCMenu,
  adapter: {}
})<MenuPropsT> {
  static displayName = 'Menu';

  open: boolean;
  setAnchorCorner: Function;
  onCloseHandler_: Function;
  menuSurface_: any;

  constructor(props: MenuPropsT) {
    super(props);
    this.onCloseHandler_ = this.onCloseHandler_.bind(this);
  }

  syncWithProps(nextProps: MenuPropsT) {
    // open
    syncFoundationProp(nextProps.open, this.open, () => {
      this.open = !!nextProps.open;
    });

    // anchorCorner
    if (
      this.foundation_ &&
      nextProps.anchorCorner !== undefined &&
      MDCMenuSurfaceFoundation.Corner[
        ANCHOR_CORNER_MAP[nextProps.anchorCorner]
      ] !== this.foundation_.anchorCorner_
    ) {
      this.setAnchorCorner(
        MDCMenuSurfaceFoundation.Corner[
          ANCHOR_CORNER_MAP[nextProps.anchorCorner]
        ]
      );
    }
  }

  componentDidMount() {
    super.componentDidMount();
    this.menuSurface_.listen(
      MDCMenuSurfaceFoundation.strings.CLOSED_EVENT,
      this.onCloseHandler_
    );
  }

  onCloseHandler_(evt: CustomEventT<void>) {
    this.props.onClose && this.props.onClose(evt);

    // little hack. We need to broadcast an CustomEvent from this component
    // in order to keep MDC and React in sync.
    // Otherwise, the internal state of the component can change and not be reflected in React
    this.emit('RESYNC', {});
  }

  destroy() {
    this.menuSurface_.unlisten(
      MDCMenuSurfaceFoundation.strings.CLOSED_EVENT,
      this.onCloseHandler_
    );
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

/****************************************************************
 * MenuSurface
 ****************************************************************/
type MenuSurfacePropsT = {
  /** Opens the menu. */
  open?: boolean,
  /** Make the menu position fixed. */
  fixed?: boolean,
  /** Manually position the menu to one of the corners. */
  anchorCorner?: AnchorT,
  /** Callback for when the menu is opened. */
  onOpen?: (evt: CustomEventT<void>) => mixed,
  /** Callback for when the menu is closed. */
  onClose?: (evt: CustomEventT<void>) => mixed,
  /** Children to render. */
  children?: React.Node
} & SimpleTagPropsT;

export const MenuSurfaceRoot = simpleTag({
  displayName: 'MenuSurfaceRoot',
  classNames: (props: MenuSurfacePropsT) => [
    'mdc-menu-surface',
    {
      'mdc-menu-surface--fixed': props.fixed
    }
  ],
  consumeProps: ['fixed']
});

export class MenuSurface extends withFoundation({
  constructor: MDCMenuSurface,
  adapter: {}
})<MenuSurfacePropsT> {
  open: boolean;
  foundation_: any;
  setAnchorCorner: Function;

  syncWithProps(nextProps: MenuSurfacePropsT) {
    //open
    syncFoundationProp(nextProps.open, this.open, () => {
      this.open = !!nextProps.open;
    });

    // anchorCorner
    if (
      nextProps.anchorCorner !== undefined &&
      MDCMenuSurfaceFoundation.Corner[
        ANCHOR_CORNER_MAP[nextProps.anchorCorner]
      ] !== this.foundation_.anchorCorner_
    ) {
      this.setAnchorCorner(
        MDCMenuSurfaceFoundation.Corner[
          ANCHOR_CORNER_MAP[nextProps.anchorCorner]
        ]
      );
    }
  }

  render() {
    const {
      children,
      open,
      anchorCorner,
      onOpen,
      onClose,
      ...rest
    } = this.props;

    const { root_ } = this.foundationRefs;
    return (
      <MenuSurfaceRoot {...rest} elementRef={root_}>
        {children}
      </MenuSurfaceRoot>
    );
  }
}

/****************************************************************
 * MenuSurfaceAnchor
 ****************************************************************/

/** A Menu Anchor. When using the anchorCorner prop of Menu, you must set MenuSurfaceAnchors css style position to absolute. */
export const MenuSurfaceAnchor = simpleTag({
  displayName: 'MenuSurfaceAnchor',
  classNames: 'mdc-menu-surface--anchor'
});

/****************************************************************
 * Simple Menu
 ****************************************************************/
export type SimpleMenuPropsT = {
  /** An element that will open the menu when clicked  */
  handle: React.Element<any>,
  /** By default, props spread to the Menu component. These will spread to the MenuSurfaceAnchor which is useful for things like overall positioning of the anchor.   */
  rootProps?: Object,
  /** Children to render */
  children?: React.Node
} & MenuPropsT;

export type SimpleMenuStateT = {
  open: boolean
};

const simpleMenuFactory = (
  MenuComponent
): React.ComponentType<SimpleMenuPropsT> =>
  class extends React.Component<SimpleMenuPropsT, SimpleMenuStateT> {
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
export const SimpleMenu = (props: SimpleMenuPropsT) => (
  <SimpleMenuRoot {...props} />
);

const SimpleMenuSurfaceRoot = simpleMenuFactory(MenuSurface);

/**
 * The same as SimpleMenu, but a generic surface.
 */
export const SimpleMenuSurface = (props: SimpleMenuPropsT) => (
  <SimpleMenuSurfaceRoot {...props} />
);

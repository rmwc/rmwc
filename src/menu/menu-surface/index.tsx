import * as RMWC from '@rmwc/types';
import React from 'react';
import { Corner, MDCMenuSurfaceFoundation } from '@material/menu-surface';
import { useClassNames, Tag, createComponent } from '@rmwc/base';
import { useMenuSurfaceFoundation } from './foundation';
import { PortalChild, PortalPropT } from '@rmwc/base';

export type AnchorT =
  | 'bottomEnd'
  | 'bottomLeft'
  | 'bottomRight'
  | 'bottomStart'
  | 'topEnd'
  | 'topLeft'
  | 'topRight'
  | 'topStart';

export type MenuSurfaceOnOpenEventT = RMWC.CustomEventT<{}>;
export type MenuSurfaceOnCloseEventT = RMWC.CustomEventT<{}>;

export interface MenuSurfaceApi {
  setAnchorCorner: (corner: Corner) => void;
  setAnchorElement: (element: HTMLElement) => void;
  setOpen: (open: boolean) => void;
  getSurfaceElement: () => HTMLElement | null;
}

export interface MenuSurfaceProps {
  /** Opens the menu. */
  open?: boolean;
  /** Make the menu position fixed. */
  fixed?: boolean;
  /** Renders the menu to a portal. Useful for situations where the content might be cutoff by an overflow: hidden container. You can pass "true" to render to the default RMWC portal. */
  renderToPortal?: PortalPropT;
  /** Manually position the menu to one of the corners. */
  anchorCorner?: AnchorT;
  /** Callback for when the menu is opened. */
  onOpen?: (evt: MenuSurfaceOnOpenEventT) => void;
  /** Callback for when the menu is closed. */
  onClose?: (evt: MenuSurfaceOnCloseEventT) => void;
  /** Children to render. */
  children?: React.ReactNode;
  /** An internal api for cross component communication. */
  apiRef?: (api: MenuSurfaceApi | null) => void;
  /** Advanced: A reference to the MDCFoundation. */
  foundationRef?: React.Ref<MDCMenuSurfaceFoundation>;
}

/****************************************************************
 * MenuSurface
 ****************************************************************/

/** A generic menu component for displaying any type of content. */
export const MenuSurface = createComponent<MenuSurfaceProps>(
  function MenuSurface(props, ref) {
    const {
      children,
      open,
      anchorCorner,
      onOpen,
      onClose,
      renderToPortal,
      fixed,
      apiRef,
      foundationRef,
      ...rest
    } = props;

    // menuSurfaceDomPositionRef is used to position the menu when it's rendered
    // into a portal. MenuSurfaceFoundation needs to crawl the dom parents
    // of 'children' to find the MenuSurfaceAnchor, and when children is rendered
    // in a portal it removes it from the dom hierarchy.
    const menuSurfaceDomPositionRef = React.useRef<HTMLDivElement | null>(null);

    const { rootEl } = useMenuSurfaceFoundation(
      props,
      menuSurfaceDomPositionRef
    );

    const className = useClassNames(props, [
      'mdc-menu-surface',
      {
        'mdc-menu-surface--fixed': fixed
      }
    ]);

    return (
      <>
        <PortalChild
          renderTo={renderToPortal}
          menuSurfaceDomPositionRef={menuSurfaceDomPositionRef}
        >
          <Tag {...rest} element={rootEl} className={className} ref={ref}>
            {children}
          </Tag>
        </PortalChild>
      </>
    );
  }
);

/****************************************************************
 * MenuSurfaceAnchor
 ****************************************************************/
export interface MenuSurfaceAnchorProps {}

/** A Menu Anchor. When using the anchorCorner prop of Menu, you must set MenuSurfaceAnchors css style position to absolute. */
export const MenuSurfaceAnchor = createComponent<MenuSurfaceAnchorProps>(
  function MenuSurfaceAnchor(props, ref) {
    const className = useClassNames(props, ['mdc-menu-surface--anchor']);
    return <Tag {...props} className={className} ref={ref} />;
  }
);

import * as RMWC from '@rmwc/types';
import React from 'react';
import { Corner } from '@material/menu-surface';
import { componentFactory, useClassNames, Tag } from '@rmwc/base';
import { useMenuSurfaceFoundation } from './menu-surface-foundation';

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
  hoistMenuToBody: () => void;
  setAnchorCorner: (corner: Corner) => void;
  setAnchorElement: (element: HTMLElement) => void;
  setOpen: (open: boolean) => void;
}

export interface MenuSurfaceProps {
  /** Opens the menu. */
  open?: boolean;
  /** Make the menu position fixed. */
  fixed?: boolean;
  /** Moves the menu to the body. Useful for situations where the content might be cutoff by an overflow: hidden container. */
  hoistToBody?: boolean;
  /** Manually position the menu to one of the corners. */
  anchorCorner?: AnchorT;
  /** Callback for when the menu is opened. */
  onOpen?: (evt: MenuSurfaceOnOpenEventT) => void;
  /** Callback for when the menu is closed. */
  onClose?: (evt: MenuSurfaceOnCloseEventT) => void;
  /** Children to render. */
  children?: React.ReactNode;
  /** An internal api for cross component communication. */
  apiRef?: (api: MenuSurfaceApi) => void;
}

/****************************************************************
 * MenuSurface
 ****************************************************************/

/** A generic menu component for displaying any type of content. */
export const MenuSurface = React.forwardRef(function MenuSurface(
  props: MenuSurfaceProps & RMWC.ComponentProps,
  ref: React.Ref<any>
) {
  const {
    children,
    open,
    anchorCorner,
    onOpen,
    onClose,
    hoistToBody,
    fixed,
    apiRef,
    ...rest
  } = props;

  const { rootEl } = useMenuSurfaceFoundation(props);

  const className = useClassNames(props, [
    'mdc-menu-surface',
    {
      'mdc-menu-surface--fixed': fixed
    }
  ]);

  return (
    <Tag {...rest} element={rootEl} className={className} ref={ref}>
      {children}
    </Tag>
  );
});
MenuSurface.displayName = 'MenuSurface';

/****************************************************************
 * MenuSurfaceAnchor
 ****************************************************************/

/** A Menu Anchor. When using the anchorCorner prop of Menu, you must set MenuSurfaceAnchors css style position to absolute. */
export const MenuSurfaceAnchor = componentFactory({
  displayName: 'MenuSurfaceAnchor',
  classNames: ['mdc-menu-surface--anchor']
});

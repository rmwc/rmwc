import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { mergeRefs, useTag, useClassNames } from '@rmwc/base';
import {
  useDismissableDrawerFoundation,
  useModalDrawerFoundation
} from './foundation';

/***************************************************************************************
 * Events
 ***************************************************************************************/

export type DrawerOnCloseEventT = RMWC.CustomEventT<{}>;
export type DrawerOnOpenEventT = RMWC.CustomEventT<{}>;

/***************************************************************************************
 * Drawers
 ***************************************************************************************/

/** A Drawer component. */
export interface DrawerProps {
  /** Opens or closes the Drawer. */
  open?: boolean;
  /** Callback that fires when the Drawer is closed. */
  onClose?: (evt: DrawerOnOpenEventT) => void;
  /** Callback that fires when the Drawer is opened. */
  onOpen?: (evt: DrawerOnCloseEventT) => void;
  /** Makes a dismissible drawer. */
  dismissible?: boolean;
  /** Makes a modal / temporary drawer. */
  modal?: boolean;
}

/** A Drawer component. */
export const Drawer = React.forwardRef<any, DrawerProps & RMWC.ComponentProps>(
  function Drawer(props, ref) {
    if (props.dismissible) {
      return <DismissibleDrawer {...props} ref={ref} />;
    }

    if (props.modal) {
      return <ModalDrawer {...props} ref={ref} />;
    }

    return <DrawerRoot {...props} ref={ref} />;
  }
);
Drawer.displayName = 'Drawer';

const slidableDrawerFactory = (
  useDrawerFoundation:
    | typeof useDismissableDrawerFoundation
    | typeof useModalDrawerFoundation,
  displayName: string
) => {
  const DrawerInner = React.forwardRef<any, DrawerProps & RMWC.ComponentProps>(
    function DrawerInner(props, ref) {
      const { rootEl, scrimEl } = useDrawerFoundation(props);
      const { onOpen, onClose, open, ...rest } = props;
      return (
        <>
          <DrawerRoot
            ref={mergeRefs(rootEl.setRef, ref)}
            {...rootEl.props(rest)}
          />
          {rest.modal && <DrawerScrim {...scrimEl.props({})} />}
        </>
      );
    }
  );

  DrawerInner.displayName = displayName;

  return DrawerInner;
};

const ModalDrawer = slidableDrawerFactory(
  useModalDrawerFoundation,
  'ModalDrawer'
);
const DismissibleDrawer = slidableDrawerFactory(
  useDismissableDrawerFoundation,
  'dismissibleDrawer'
);

const DrawerRoot = React.forwardRef<any, DrawerProps & RMWC.ComponentProps>(
  function DrawerRoot(props, ref) {
    const { dismissible, modal, ...rest } = props;
    const Tag = useTag(props, 'aside');
    const className = useClassNames(props, [
      'mdc-drawer',
      {
        'mdc-drawer--dismissible': dismissible,
        'mdc-drawer--modal': modal
      }
    ]);

    return <Tag ref={ref} {...rest} className={className} />;
  }
);

/***************************************************************************************
 * Bits
 ***************************************************************************************/

/** An optional header for the Drawer. */
export interface DrawerHeaderProps {}

/** An optional header for the Drawer. */
export const DrawerHeader = React.forwardRef<
  any,
  DrawerHeaderProps & RMWC.ComponentProps
>(function DrawerHeader(props, ref) {
  const Tag = useTag(props);
  const className = useClassNames(props, ['mdc-drawer__header']);
  return <Tag ref={ref} {...props} className={className} />;
});
DrawerHeader.displayName = 'DrawerHeader';

/** An title for the DrawerHeader. */
export interface DrawerTitleProps {}

/** An title for the DrawerHeader. */
export const DrawerTitle = React.forwardRef<
  any,
  DrawerTitleProps & RMWC.ComponentProps
>(function DrawerTitle(props, ref) {
  const Tag = useTag(props);
  const className = useClassNames(props, ['mdc-drawer__title']);
  return <Tag ref={ref} {...props} className={className} />;
});
DrawerTitle.displayName = 'DrawerTitle';

/** A subtitle for the DrawerHeader. */
export interface DrawerSubtitleProps {}

/** A subtitle for the DrawerHeader. */
export const DrawerSubtitle = React.forwardRef<
  any,
  DrawerSubtitleProps & RMWC.ComponentProps
>(function DrawerSubtitle(props, ref) {
  const Tag = useTag(props);
  const className = useClassNames(props, ['mdc-drawer__subtitle']);
  return <Tag ref={ref} {...props} className={className} />;
});
DrawerSubtitle.displayName = 'DrawerSubtitle';

/** Content for Drawers. */
export interface DrawerContentProps {}

/** Content for Drawers. */
export const DrawerContent = React.forwardRef<
  any,
  DrawerContentProps & RMWC.ComponentProps
>(function DrawerContent(props, ref) {
  const Tag = useTag(props);
  const className = useClassNames(props, ['mdc-drawer__content']);
  return <Tag ref={ref} {...props} className={className} />;
});
DrawerContent.displayName = 'DrawerContent';

/** Protects the app's UI from interactions while a modal drawer is open. */
const DrawerScrim = ({
  onClick
}: {
  onClick: (evt: React.MouseEvent<HTMLDivElement>) => void;
}) => <div className="mdc-drawer-scrim" onClick={onClick} />;

/** For the Dismissible variant only. Sibling element that is resized when the drawer opens/closes. */
export interface DrawerAppContentProps {}

/** For the Dismissible variant only. Sibling element that is resized when the drawer opens/closes. */
export const DrawerAppContent = React.forwardRef<
  any,
  DrawerAppContentProps & RMWC.ComponentProps
>(function DrawerAppContent(props, ref) {
  const Tag = useTag(props);
  const className = useClassNames(props, ['mdc-drawer-app-content']);
  return <Tag ref={ref} {...props} className={className} />;
});
DrawerAppContent.displayName = 'DrawerAppContent';

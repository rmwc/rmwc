import * as RMWC from '@rmwc/types';
import React from 'react';
import {
  MDCModalDrawerFoundation,
  MDCDismissibleDrawerFoundation
} from '@material/drawer';
import { mergeRefs, Tag, useClassNames, createComponent } from '@rmwc/base';
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
  /** Advanced: A reference to the MDCFoundation. */
  foundationRef?: React.Ref<
    MDCModalDrawerFoundation | MDCDismissibleDrawerFoundation
  >;
}

/** A Drawer component. */
export const Drawer = createComponent<DrawerProps>(function Drawer(props, ref) {
  if (props.dismissible) {
    return <DismissibleDrawer {...props} ref={ref} />;
  }

  if (props.modal) {
    return <ModalDrawer {...props} ref={ref} />;
  }

  return <DrawerRoot {...props} ref={ref} />;
});

const slidableDrawerFactory = (
  useDrawerFoundation:
    | typeof useDismissableDrawerFoundation
    | typeof useModalDrawerFoundation
) => {
  const DrawerInner = createComponent<DrawerProps>(function DrawerInner(
    props,
    ref
  ) {
    const { rootEl, scrimEl } = useDrawerFoundation(props);
    const { onOpen, onClose, open, foundationRef, ...rest } = props;
    return (
      <>
        <DrawerRoot
          ref={mergeRefs(rootEl.reactRef, ref)}
          {...rootEl.props(rest)}
        />
        {rest.modal && <DrawerScrim {...scrimEl.props({})} />}
      </>
    );
  });

  return DrawerInner;
};

const ModalDrawer = slidableDrawerFactory(useModalDrawerFoundation);
const DismissibleDrawer = slidableDrawerFactory(useDismissableDrawerFoundation);

const DrawerRoot = createComponent<DrawerProps>(function DrawerRoot(
  props,
  ref
) {
  const { dismissible, modal, foundationRef, ...rest } = props;
  const className = useClassNames(props, [
    'mdc-drawer',
    {
      'mdc-drawer--dismissible': dismissible,
      'mdc-drawer--modal': modal
    }
  ]);

  return <Tag tag="aside" {...rest} ref={ref} className={className} />;
});

/***************************************************************************************
 * Bits
 ***************************************************************************************/

/** An optional header for the Drawer. */
export interface DrawerHeaderProps {}

/** An optional header for the Drawer. */
export const DrawerHeader = createComponent<DrawerHeaderProps>(
  function DrawerHeader(props, ref) {
    const className = useClassNames(props, ['mdc-drawer__header']);
    return <Tag {...props} ref={ref} className={className} />;
  }
);

/** An title for the DrawerHeader. */
export interface DrawerTitleProps {}

/** An title for the DrawerHeader. */
export const DrawerTitle = createComponent<DrawerTitleProps>(
  function DrawerTitle(props, ref) {
    const className = useClassNames(props, ['mdc-drawer__title']);
    return <Tag {...props} ref={ref} className={className} />;
  }
);

/** A subtitle for the DrawerHeader. */
export interface DrawerSubtitleProps {}

/** A subtitle for the DrawerHeader. */
export const DrawerSubtitle = createComponent<DrawerSubtitleProps>(
  function DrawerSubtitle(props, ref) {
    const className = useClassNames(props, ['mdc-drawer__subtitle']);
    return <Tag {...props} ref={ref} className={className} />;
  }
);

/** Content for Drawers. */
export interface DrawerContentProps {}

/** Content for Drawers. */
export const DrawerContent = createComponent<DrawerContentProps>(
  function DrawerContent(props, ref) {
    const className = useClassNames(props, ['mdc-drawer__content']);
    return <Tag {...props} ref={ref} className={className} />;
  }
);

/** Protects the app's UI from interactions while a modal drawer is open. */
const DrawerScrim = ({
  onClick
}: {
  onClick: (evt: React.MouseEvent<HTMLDivElement>) => void;
}) => <div className="mdc-drawer-scrim" onClick={onClick} />;

/** For the Dismissible variant only. Sibling element that is resized when the drawer opens/closes. */
export interface DrawerAppContentProps {}

/** For the Dismissible variant only. Sibling element that is resized when the drawer opens/closes. */
export const DrawerAppContent = createComponent<DrawerAppContentProps>(
  function DrawerAppContent(props, ref) {
    const className = useClassNames(props, ['mdc-drawer-app-content']);
    return <Tag {...props} ref={ref} className={className} />;
  }
);

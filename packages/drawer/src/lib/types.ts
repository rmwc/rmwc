/***************************************************************************************
 * Events
 ***************************************************************************************/

import type {
  MDCDismissibleDrawerFoundation,
  MDCModalDrawerFoundation
} from '@material/drawer';
import type { CustomEventT } from '@rmwc/types';
import { Ref } from 'react';

export type DrawerOnCloseEventT = CustomEventT<{}>;
export type DrawerOnOpenEventT = CustomEventT<{}>;

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
  foundationRef?: Ref<
    MDCModalDrawerFoundation | MDCDismissibleDrawerFoundation
  >;
}

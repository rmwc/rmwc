import * as RMWC from '@rmwc/types';
import * as React from 'react';

import { componentFactory, FoundationComponent } from '@rmwc/base';
import {
  MDCModalDrawerFoundation,
  MDCDismissibleDrawerFoundation
} from '@material/drawer';
import { createFocusTrap, FocusTrap } from '@rmwc/base';

/***************************************************************************************
 * Drawer Headers
 ***************************************************************************************/
/** An optional header for the Drawer. */
export const DrawerHeader = componentFactory<{}>({
  displayName: 'DrawerHeader',
  classNames: ['mdc-drawer__header']
});

/** An title for the DrawerHeader. */
export const DrawerTitle = componentFactory<{}>({
  displayName: 'DrawerTitle',
  classNames: ['mdc-drawer__title']
});

/** A subtitle for the DrawerHeader. */
export const DrawerSubtitle = componentFactory<{}>({
  displayName: 'DrawerSubtitle',
  classNames: ['mdc-drawer__subtitle']
});

/***************************************************************************************
 * Drawer Content
 ***************************************************************************************/
/** Content for Drawers. Please note this is an instance of mdc-list by default. You can change this to a a non list container by specifying the tag as 'div' or anything else. */
export const DrawerContent = componentFactory<{}>({
  displayName: 'DrawerContent',
  classNames: ['mdc-drawer__content']
});

/***************************************************************************************
 * Drawer Scrim
 ***************************************************************************************/
/** Protects the app's UI from interactions while a modal drawer is open. */
const DrawerScrim = ({
  onClick
}: {
  onClick: (evt: React.MouseEvent<HTMLDivElement>) => void;
}) => <div className="mdc-drawer-scrim" onClick={onClick} />;

/***************************************************************************************
 * DrawerAppContent
 ***************************************************************************************/
/** For the Dismissible variant only. Sibling element that is resized when the drawer opens/closes. */
export const DrawerAppContent = componentFactory<{}>({
  displayName: 'DrawerAppContent',
  classNames: ['mdc-drawer-app-content']
});

/***************************************************************************************
 * Drawers
 ***************************************************************************************/
export interface DrawerProps {
  /** Opens or closes the Drawer. */
  open?: boolean;
  /** Callback that fires when the Drawer is closed. */
  onClose?: (evt: RMWC.CustomEventT<{}>) => void;
  /** Callback that fires when the Drawer is opened. */
  onOpen?: (evt: RMWC.CustomEventT<{}>) => void;
  /** Makes a dismissible drawer. */
  dismissible?: boolean;
  /** Makes a modal / temporary drawer. */
  modal?: boolean;
}

export const DrawerRoot = componentFactory<DrawerProps>({
  displayName: 'DrawerRoot',
  tag: 'aside',
  classNames: (props: DrawerProps) => [
    'mdc-drawer',
    {
      'mdc-drawer--dismissible': props.dismissible,
      'mdc-drawer--modal': props.modal
    }
  ],
  consumeProps: ['dismissible', 'modal']
});

const slidableDrawerFactory = (
  MDCConstructor:
    | typeof MDCModalDrawerFoundation
    | typeof MDCDismissibleDrawerFoundation,
  displayName: string
) =>
  class extends FoundationComponent<
    MDCModalDrawerFoundation | MDCDismissibleDrawerFoundation,
    DrawerProps
  > {
    static displayName = displayName;

    static defaultProps = {
      open: false
    };

    private root = this.createElement('root');
    previousFocus: HTMLElement | null = null;
    focusTrap: FocusTrap | null = null;

    constructor(props: DrawerProps) {
      super(props);

      ['handleScrimClick', 'handleTransitionEnd', 'handleKeyDown'].forEach(
        k => {
          (this as any)[k] = (this as any)[k].bind(this);
        }
      );
    }

    componentDidMount() {
      super.componentDidMount();
      this.root.ref &&
        (this.focusTrap = createFocusTrap(this.root.ref, {
          clickOutsideDeactivates: true,
          initialFocus: undefined,
          escapeDeactivates: false,
          returnFocusOnDeactivate: false
        }));
    }

    getDefaultFoundation() {
      /** @type {!MDCDrawerAdapter} */
      const adapter = /** @type {!MDCDrawerAdapter} */ {
        addClass: (className: string) => this.root.addClass(className),
        removeClass: (className: string) => this.root.removeClass(className),
        hasClass: (className: string) => this.root.hasClass(className),
        elementHasClass: (element: HTMLElement, className: string) =>
          element.classList.contains(className),
        saveFocus: () => {
          this.previousFocus = document.activeElement as HTMLElement;
        },
        restoreFocus: () => {
          const previousFocus = this.previousFocus && this.previousFocus.focus;
          if (
            this.root.ref &&
            this.root.ref.contains(document.activeElement) &&
            previousFocus
          ) {
            this.previousFocus && this.previousFocus.focus();
          }
        },
        focusActiveNavigationItem: () => {
          const activeNavItemEl =
            this.root.ref &&
            this.root.ref.querySelector(`.mdc-list-item--activated`);
          if (activeNavItemEl) {
            (activeNavItemEl as HTMLElement).focus();
          }
        },
        notifyClose: () => this.emit('onClose', {}, true /* shouldBubble */),
        notifyOpen: () => this.emit('onOpen', {}, true /* shouldBubble */),
        trapFocus: () => {
          try {
            this.focusTrap && this.focusTrap.activate();
          } catch (err) {}
        },
        releaseFocus: () => {
          try {
            this.focusTrap && this.focusTrap.deactivate();
          } catch (err) {}
        }
      };

      return new MDCConstructor(adapter);
    }

    handleScrimClick() {
      'handleScrimClick' in this.foundation &&
        this.foundation.handleScrimClick();
    }

    handleKeyDown(evt: React.KeyboardEvent & KeyboardEvent) {
      this.props.onKeyDown && this.props.onKeyDown(evt);
      this.foundation.handleKeydown(evt);
    }

    handleTransitionEnd(evt: React.TransitionEvent & TransitionEvent) {
      this.props.onTransitionEnd && this.props.onTransitionEnd(evt);
      this.foundation.handleTransitionEnd(evt);
    }

    sync(props: DrawerProps, prevProps: DrawerProps) {
      if (props.open !== prevProps.open) {
        props.open ? this.foundation.open() : this.foundation.close();
      }
    }

    render() {
      const { onOpen, onClose, open, ...rest } = this.props;
      return (
        <React.Fragment>
          <DrawerRoot
            ref={this.root.setRef}
            {...this.root.props(rest)}
            onKeyDown={this.handleKeyDown}
            onTransitionEnd={this.handleTransitionEnd}
          />
          {rest.modal && <DrawerScrim onClick={this.handleScrimClick} />}
        </React.Fragment>
      );
    }
  };

const ModalDrawer = slidableDrawerFactory(
  MDCModalDrawerFoundation,
  'ModalDrawer'
);
const DismissibleDrawer = slidableDrawerFactory(
  MDCDismissibleDrawerFoundation,
  'dismissibleDrawer'
);

export const Drawer: React.ComponentType<DrawerProps & RMWC.ComponentProps> = (
  props: DrawerProps
) => {
  if (props.dismissible) {
    return <DismissibleDrawer {...props} />;
  }

  if (props.modal) {
    return <ModalDrawer {...props} />;
  }

  return <DrawerRoot {...props} />;
};

Drawer.displayName = 'Drawer';

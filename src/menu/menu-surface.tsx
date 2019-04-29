import * as RMWC from '@rmwc/types';
import * as React from 'react';

import {
  MDCMenuSurfaceFoundation,
  util,
  MDCMenuDimensions,
  Corner
} from '@material/menu-surface';

import { componentFactory, FoundationComponent, closest } from '@rmwc/base';
import { MDCMenuDistance } from '@material/menu-surface';

const ANCHOR_CORNER_MAP: {
  [key: string]: keyof typeof MDCMenuSurfaceFoundation.Corner;
} = {
  bottomEnd: 'BOTTOM_END',
  bottomLeft: 'BOTTOM_LEFT',
  bottomRight: 'BOTTOM_RIGHT',
  bottomStart: 'BOTTOM_START',
  topEnd: 'TOP_END',
  topLeft: 'TOP_LEFT',
  topRight: 'TOP_RIGHT',
  topStart: 'TOP_START'
};

const getAnchorCornerFromProp = (
  anchorCorner: keyof typeof ANCHOR_CORNER_MAP
) => MDCMenuSurfaceFoundation.Corner[ANCHOR_CORNER_MAP[anchorCorner]];

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
}

/****************************************************************
 * MenuSurface
 ****************************************************************/
const MenuSurfaceRoot = componentFactory<{}>({
  displayName: 'MenuSurfaceRoot',
  classNames: (props: MenuSurfaceProps) => [
    'mdc-menu-surface',
    {
      'mdc-menu-surface--fixed': props.fixed
    }
  ],
  consumeProps: ['fixed']
});

/** A generic menu component for displaying any type of content. */
export class MenuSurface extends FoundationComponent<
  MDCMenuSurfaceFoundation,
  MenuSurfaceProps
> {
  private root = this.createElement('root');
  anchorElement: HTMLElement | null = null;
  previousFocus: HTMLElement | null = null;
  firstFocusableElement: HTMLElement | null = null;
  lastFocusableElement: HTMLElement | null = null;
  hoisted = false;

  constructor(props: MenuSurfaceProps) {
    super(props);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleBodyClick = this.handleBodyClick.bind(this);
  }

  componentDidMount() {
    if (this.root.ref) {
      const anchor = closest(
        this.root.ref,
        `.${MDCMenuSurfaceFoundation.cssClasses.ANCHOR}`
      );
      anchor && (this.anchorElement = anchor);
    }
    // this has to be run AFTER we try to get our anchor
    super.componentDidMount();
  }

  componentWillUnmount() {
    // if we are hoisted, unhoist the
    // component so it gets cleaned up properly
    if (this.hoisted) {
      this.unhoistMenuFromBody();
    }
    super.componentWillUnmount();
  }

  get open() {
    return this.foundation.isOpen();
  }

  set open(value) {
    if (value && this.foundation && !this.foundation.isOpen()) {
      const focusableElements = this.root.ref
        ? this.root.ref.querySelectorAll<HTMLElement>(
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
      if (this.foundation && this.foundation.isOpen()) {
        this.foundation.close();
      }
    }
  }

  getDefaultFoundation() {
    return new MDCMenuSurfaceFoundation({
      addClass: (className: string) => {
        this.root.addClass(className);
      },
      removeClass: (className: string) => {
        this.root.removeClass(className);
      },
      hasClass: (className: string) =>
        className === 'mdc-menu-surface' ? true : this.root.hasClass(className),
      hasAnchor: () => !!this.anchorElement,
      notifyClose: () => {
        this.emit('onClose', {});
        this.deregisterBodyClickListener();
        // an annoying hack... this is the only
        // place to catch the normal close and bodyClick handler
        // and correct it if we still want to be open.
        if (this.props.open) {
          this.open = this.props.open;
        }
      },
      notifyOpen: () => {
        this.emit('onOpen', {});
        this.registerBodyClickListener();
      },
      isElementInContainer: (el: HTMLElement) =>
        this.root.ref === el || (!!this.root.ref && this.root.ref.contains(el)),
      isRtl: () =>
        !!this.root.ref &&
        getComputedStyle(this.root.ref).getPropertyValue('direction') === 'rtl',
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
      isFocused: () => document.activeElement === this.root.ref,
      saveFocus: () => {
        this.previousFocus = document.activeElement as HTMLElement;
      },
      restoreFocus: () => {
        if (this.root.ref && this.root.ref.contains(document.activeElement)) {
          if (this.previousFocus && this.previousFocus.focus) {
            this.previousFocus.focus();
          }
        }
      },
      isFirstElementFocused: () =>
        !!this.firstFocusableElement &&
        this.firstFocusableElement === document.activeElement,
      isLastElementFocused: () =>
        !!this.firstFocusableElement &&
        this.firstFocusableElement === document.activeElement,
      focusFirstElement: () =>
        !!this.firstFocusableElement &&
        this.firstFocusableElement.focus &&
        this.firstFocusableElement.focus(),
      focusLastElement: () =>
        !!this.firstFocusableElement &&
        this.firstFocusableElement.focus &&
        this.firstFocusableElement.focus()
    };
  }

  getDimensionAdapterMethods() {
    return {
      getInnerDimensions: (): MDCMenuDimensions => {
        return {
          width: this.root.ref ? this.root.ref.offsetWidth : 0,
          height: this.root.ref ? this.root.ref.offsetHeight : 0
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
      setPosition: (position: Partial<MDCMenuDistance>) => {
        this.root.setStyle(
          'left',
          position.left !== undefined ? position.left : null
        );
        this.root.setStyle(
          'right',
          position.right !== undefined ? position.right : null
        );
        this.root.setStyle(
          'top',
          position.top !== undefined ? position.top : null
        );
        this.root.setStyle(
          'bottom',
          position.bottom !== undefined ? position.bottom : null
        );
      },
      setMaxHeight: (height: string) => {
        this.root.setStyle('maxHeight', height);
      }
    };
  }

  sync(props: MenuSurfaceProps, prevProps: MenuSurfaceProps) {
    // fixed
    this.syncProp(props.fixed, prevProps.fixed, () => {
      this.foundation.setFixedPosition(!!props.fixed);
    });

    // hoistToBody
    this.syncProp(props.hoistToBody, prevProps.hoistToBody, () => {
      props.hoistToBody ? this.hoistMenuToBody() : this.unhoistMenuFromBody();
    });

    // anchorCorner
    const anchorCorner =
      props.anchorCorner && getAnchorCornerFromProp(props.anchorCorner);

    this.syncProp(anchorCorner, (this.foundation as any).anchorCorner_, () => {
      if (anchorCorner) {
        this.foundation.setAnchorCorner(anchorCorner);
        (this.foundation as any).dimensions_ = (this
          .foundation as any).adapter_.getInnerDimensions();
        (this.foundation as any).autoPosition_();
      }
    });

    // open
    this.syncProp(props.open, prevProps.open, () => {
      this.open = !!props.open;
    });
  }

  hoistMenuToBody() {
    if (this.root.ref && this.root.ref.parentElement) {
      document.body.appendChild(
        this.root.ref.parentElement.removeChild(this.root.ref)
      );
      this.hoisted = true;
      this.foundation.setIsHoisted(true);

      // correct layout for open menu
      if (this.props.open) {
        (this.foundation as any).autoPosition_();
      }
    }
  }

  unhoistMenuFromBody() {
    if (this.anchorElement && this.root.ref) {
      this.anchorElement.appendChild(this.root.ref);
      this.hoisted = false;
      this.foundation.setIsHoisted(false);
    }
  }

  setAnchorCorner(corner: Corner) {
    this.foundation.setAnchorCorner(corner);
  }

  registerBodyClickListener() {
    document.body.addEventListener('click', this.handleBodyClick);
    document.body.addEventListener('touchstart', this.handleBodyClick);
  }
  deregisterBodyClickListener() {
    document.body.removeEventListener('click', this.handleBodyClick);
    document.body.removeEventListener('touchstart', this.handleBodyClick);
  }

  handleBodyClick(evt: MouseEvent | TouchEvent) {
    this.foundation && this.foundation.handleBodyClick(evt as MouseEvent);
  }

  handleKeydown(evt: React.KeyboardEvent & KeyboardEvent) {
    this.props.onKeyDown && this.props.onKeyDown(evt);
    this.foundation.handleKeydown(evt);
  }

  render() {
    const {
      children,
      open,
      anchorCorner,
      onOpen,
      onClose,
      hoistToBody,
      ...rest
    } = this.props;

    return (
      <MenuSurfaceRoot
        {...this.root.props(rest)}
        ref={this.root.setRef}
        onKeyDown={this.handleKeydown}
      >
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

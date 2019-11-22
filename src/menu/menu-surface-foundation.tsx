import {
  useFoundation,
  closest,
  emptyClientRect,
  FoundationElement
} from '@rmwc/base';
import { MenuSurfaceProps, MenuSurfaceApi } from './menu-surface';

import {
  MDCMenuSurfaceFoundation,
  util,
  MDCMenuDimensions,
  Corner
} from '@material/menu-surface';
import { MDCMenuDistance } from '@material/menu-surface';
import { useCallback, useEffect, useState, useRef } from 'react';

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

export const useMenuSurfaceFoundation = (
  props: MenuSurfaceProps & React.HTMLProps<any>
) => {
  const [open, setOpen] = useState(props.open);
  const firstFocusableElementRef = useRef<HTMLElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const anchorElementRef = useRef<HTMLElement | null>(null);
  const hoistedRef = useRef(false);

  const { foundation, ...elements } = useFoundation({
    props,
    elements: { rootEl: true },
    api: ({
      foundation,
      rootEl
    }: {
      foundation: MDCMenuSurfaceFoundation;
      rootEl: FoundationElement<any, any>;
    }): MenuSurfaceApi => {
      return {
        hoistMenuToBody: () => hoistMenuToBody(),
        setAnchorCorner: (corner: Corner) => foundation.setAnchorCorner(corner),
        setAnchorElement: (element: HTMLElement) =>
          (anchorElementRef.current = element),
        setOpen: (open: boolean) => setOpen(open),
        getSurfaceElement: () => rootEl.ref
      };
    },
    foundation: ({ rootEl, getProps, emit }) => {
      const handleBodyClick = (evt: MouseEvent | TouchEvent) => {
        foundation.handleBodyClick(evt as MouseEvent);
      };

      const registerBodyClickListener = () => {
        /**
         * Corrects issue on mobile devices that don't support fast click
         * Causing the menu to close as soon as its open
         **/
        setTimeout(() => {
          document.body.addEventListener('click', handleBodyClick);
          document.body.addEventListener('touchstart', handleBodyClick);
        }, 150);
      };
      const deregisterBodyClickListener = () => {
        document.body.removeEventListener('click', handleBodyClick);
        document.body.removeEventListener('touchstart', handleBodyClick);
      };

      const getFocusAdapterMethods = () => {
        return {
          isFocused: () => document.activeElement === rootEl.ref,
          saveFocus: () => {
            previousFocusRef.current = document.activeElement as HTMLElement;
          },
          restoreFocus: () => {
            if (rootEl.ref && rootEl.ref.contains(document.activeElement)) {
              if (previousFocusRef.current && previousFocusRef.current.focus) {
                previousFocusRef.current.focus();
              }
            }
          },
          isFirstElementFocused: () =>
            !!firstFocusableElementRef.current &&
            firstFocusableElementRef.current === document.activeElement,
          isLastElementFocused: () =>
            !!firstFocusableElementRef.current &&
            firstFocusableElementRef.current === document.activeElement,
          focusFirstElement: () =>
            !!firstFocusableElementRef.current &&
            firstFocusableElementRef.current.focus &&
            firstFocusableElementRef.current.focus(),
          focusLastElement: () =>
            !!firstFocusableElementRef.current &&
            firstFocusableElementRef.current.focus &&
            firstFocusableElementRef.current.focus()
        };
      };

      const getDimensionAdapterMethods = () => {
        return {
          getInnerDimensions: (): MDCMenuDimensions => {
            return {
              width: rootEl.ref ? rootEl.ref.offsetWidth : 0,
              height: rootEl.ref ? rootEl.ref.offsetHeight : 0
            };
          },
          getAnchorDimensions: () => {
            return (
              anchorElementRef.current?.getBoundingClientRect() ||
              emptyClientRect
            );
          },
          getWindowDimensions: () => {
            return {
              width: window.innerWidth,
              height: window.innerHeight
            };
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
            rootEl.setStyle(
              'left',
              position.left !== undefined ? position.left : null
            );
            rootEl.setStyle(
              'right',
              position.right !== undefined ? position.right : null
            );
            rootEl.setStyle(
              'top',
              position.top !== undefined ? position.top : null
            );
            rootEl.setStyle(
              'bottom',
              position.bottom !== undefined ? position.bottom : null
            );
          },
          setMaxHeight: (height: string) => {
            rootEl.setStyle('maxHeight', height);
          }
        };
      };

      const foundation = new MDCMenuSurfaceFoundation({
        addClass: (className: string) => {
          rootEl.addClass(className);
        },
        removeClass: (className: string) => {
          rootEl.removeClass(className);
        },
        hasClass: (className: string) =>
          className === 'mdc-menu-surface' ? true : rootEl.hasClass(className),
        hasAnchor: () => !!anchorElementRef.current,
        notifyClose: () => {
          deregisterBodyClickListener();
          setOpen(false);
        },
        notifyOpen: () => {
          emit('onOpen', {});
          registerBodyClickListener();
        },
        isElementInContainer: (el: HTMLElement) =>
          rootEl.ref === el || (!!rootEl.ref && rootEl.ref.contains(el)),
        isRtl: () =>
          !!rootEl.ref &&
          getComputedStyle(rootEl.ref).getPropertyValue('direction') === 'rtl',
        setTransformOrigin: (origin: string) => {
          rootEl.setStyle(
            `${util.getTransformPropertyName(window)}-origin`,
            origin
          );
        },
        ...getFocusAdapterMethods(),
        ...getDimensionAdapterMethods()
      });

      // Fixes a very annoying issue where the menu isn't stateful
      // this allows us to keep the menu open based on its controlled prop.
      const existingClose = foundation.close.bind(foundation);
      const newClose = (skipRestoreFocus = false) => {
        emit('onClose', {});
        setTimeout(() => {
          if (!getProps().open) {
            existingClose(skipRestoreFocus);
          }
        });
      };
      foundation.close = newClose;

      return foundation;
    }
  });

  const { rootEl } = elements;

  const handleKeydown = useCallback(
    (evt: React.KeyboardEvent & KeyboardEvent) => {
      props.onKeyDown?.(evt);
      foundation.handleKeydown(evt);
    },
    [props.onKeyDown, foundation]
  );

  rootEl.setProp('onKeyDown', handleKeydown, true);

  const hoistMenuToBody = useCallback(() => {
    if (rootEl.ref?.parentElement) {
      document.body.appendChild(
        rootEl.ref.parentElement.removeChild(rootEl.ref)
      );
      hoistedRef.current = true;
      foundation.setIsHoisted(true);

      // correct layout for open menu
      if (foundation.isOpen()) {
        // wait an extra frame so that the element is actually
        // done being hoisted and painting. Fixes Issue #453
        // @ts-ignore unsafe private variable access
        window.requestAnimationFrame(() => foundation.autoPosition_());
      }
    }
  }, [foundation, rootEl.ref]);

  const unhoistMenuFromBody = useCallback(() => {
    if (anchorElementRef.current && rootEl.ref) {
      anchorElementRef.current.appendChild(rootEl.ref);
      hoistedRef.current = false;
      foundation.setIsHoisted(false);
    }
  }, [foundation, rootEl.ref]);

  // fixed
  useEffect(() => {
    foundation.setFixedPosition(!!props.fixed);
  }, [props.fixed, foundation]);

  // on mount
  useEffect(() => {
    const el = rootEl.ref;

    if (el) {
      const anchor = closest(
        el,
        `.${MDCMenuSurfaceFoundation.cssClasses.ANCHOR}`
      );
      anchor && (anchorElementRef.current = anchor);
    }
  }, [rootEl.ref]);

  // hoistToBody
  useEffect(() => {
    if (props.hoistToBody !== undefined) {
      props.hoistToBody ? hoistMenuToBody() : unhoistMenuFromBody();
    }
  }, [props.hoistToBody, foundation, hoistMenuToBody, unhoistMenuFromBody]);

  // anchorCorner
  useEffect(() => {
    const anchorCorner =
      props.anchorCorner && getAnchorCornerFromProp(props.anchorCorner);

    if (anchorCorner !== undefined) {
      foundation.setAnchorCorner(anchorCorner);
      // @ts-ignore unsafe private variable reference
      foundation.dimensions_ = foundation.adapter_.getInnerDimensions();
      // @ts-ignore unsafe private variable reference
      foundation.autoPosition_();
    }
  }, [props.anchorCorner, foundation]);

  // open
  useEffect(() => {
    const value = open;

    if (value) {
      const focusableElements = rootEl.ref
        ? rootEl.ref.querySelectorAll<HTMLElement>(
            MDCMenuSurfaceFoundation.strings.FOCUSABLE_ELEMENTS
          )
        : [];
      firstFocusableElementRef.current =
        focusableElements.length > 0 ? focusableElements[0] : null;

      foundation.open();
    } else if (foundation.isOpen()) {
      foundation.close();
    }
  }, [open, foundation, rootEl.ref]);

  useEffect(() => {
    setOpen(!!props.open);
  }, [props.open]);

  useEffect(() => {
    return () => {
      unhoistMenuFromBody();
    };
  }, []);

  return { ...elements };
};

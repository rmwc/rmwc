import React, { useCallback, useEffect } from 'react';
import { MDCTooltipFoundation, CssClasses, events } from '@material/tooltip';
import { useFoundation } from '@rmwc/base';
import { ALIGN_MAP, TooltipActivationT, TooltipProps } from '.';

export const useToolTipFoundation = (
  props: TooltipProps & React.HTMLProps<any>
) => {
  const { foundation, ...elements } = useFoundation({
    props,
    elements: { anchorEl: true, rootEl: true },
    foundation: ({ anchorEl, emit, rootEl }) => {
      return new MDCTooltipFoundation({
        getAttribute: (attr) => rootEl.ref?.getAttribute(attr) as string | null,
        setAttribute: (attr, value) => {
          rootEl.setProp(attr as any, value);
        },
        removeAttribute: (attr) => {
          rootEl.removeProp(attr as any);
        },
        addClass: (className) => {
          return rootEl.addClass(className);
        },
        hasClass: (className) => {
          return rootEl.ref ? rootEl.ref?.classList.contains(className) : false;
        },
        removeClass: (className) => {
          rootEl.removeClass(className);
        },
        getComputedStyleProperty: (propertyName) => {
          return !!rootEl.ref
            ? window.getComputedStyle(rootEl.ref).getPropertyValue(propertyName)
            : '';
        },
        setStyleProperty: (propertyName, value) => {
          (rootEl.ref as HTMLElement).style.setProperty(propertyName, value);
        },
        setSurfaceAnimationStyleProperty: (propertyName, value) => {
          const surface = rootEl.ref?.querySelector<HTMLElement>(
            `.${CssClasses.SURFACE_ANIMATION}`
          );
          surface?.style.setProperty(propertyName, value);
        },
        getViewportWidth: () => window.innerWidth,
        getViewportHeight: () => window.innerHeight,
        getTooltipSize: () => {
          return rootEl.ref === null
            ? { width: 0, height: 0 }
            : {
                width: (rootEl.ref as HTMLElement).offsetWidth,
                height: (rootEl.ref as HTMLElement).offsetHeight
              };
        },
        getAnchorBoundingRect: () => {
          return anchorEl.ref ? anchorEl.ref?.getBoundingClientRect() : null;
        },
        getParentBoundingRect: () => {
          return rootEl.ref?.parentElement?.getBoundingClientRect() ?? null;
        },
        getAnchorAttribute: (attr) => {
          return anchorEl.ref
            ? (anchorEl.ref?.getAttribute(attr) as string | null)
            : null;
        },
        setAnchorAttribute: (attr, value) => {
          anchorEl?.setProp(attr as any, value);
        },
        isRTL: () =>
          !!rootEl.ref && getComputedStyle(rootEl.ref).direction === 'rtl',
        anchorContainsElement: (element) => {
          return !!anchorEl.ref?.contains(element);
        },
        tooltipContainsElement: (element) => {
          return rootEl.ref?.contains(element) ?? false;
        },
        focusAnchorElement: () => {
          anchorEl.ref?.focus();
        },
        registerEventHandler: (evt, handler) => {
          if (rootEl instanceof HTMLElement) {
            rootEl.addEventListener(evt, handler);
          }
        },
        deregisterEventHandler: (evt, handler) => {
          if (rootEl instanceof HTMLElement) {
            rootEl.removeEventListener(evt, handler);
          }
        },
        registerAnchorEventHandler: (evt, handler) => {
          anchorEl.ref?.addEventListener(evt, handler);
        },
        deregisterAnchorEventHandler: (evt, handler) => {
          anchorEl.ref?.removeEventListener(evt, handler);
        },
        registerDocumentEventHandler: (evt, handler) => {
          document.body.addEventListener(evt, handler);
        },
        deregisterDocumentEventHandler: (evt, handler) => {
          document.body.removeEventListener(evt, handler);
        },
        registerWindowEventHandler: (evt, handler) => {
          window.addEventListener(evt, handler);
        },
        deregisterWindowEventHandler: (evt, handler) => {
          window.removeEventListener(evt, handler);
        },
        notifyHidden: () => {
          emit(events.HIDDEN, {});
        },
        getTooltipCaretBoundingRect: () => {
          const caret = rootEl.ref?.querySelector<HTMLElement>(
            `.${CssClasses.TOOLTIP_CARET_TOP}`
          );
          if (!caret) {
            return null;
          }
          return caret.getBoundingClientRect();
        },
        setTooltipCaretStyle: (propertyName, value) => {
          const topCaret = rootEl.ref?.querySelector<HTMLElement>(
            `.${CssClasses.TOOLTIP_CARET_TOP}`
          );
          const bottomCaret = rootEl.ref?.querySelector<HTMLElement>(
            `.${CssClasses.TOOLTIP_CARET_BOTTOM}`
          );

          if (!topCaret || !bottomCaret) {
            return;
          }

          topCaret.style.setProperty(propertyName, value);
          bottomCaret.style.setProperty(propertyName, value);
        },
        clearTooltipCaretStyles: () => {
          const topCaret = rootEl.ref?.querySelector<HTMLElement>(
            `.${CssClasses.TOOLTIP_CARET_TOP}`
          );
          const bottomCaret = rootEl.ref?.querySelector<HTMLElement>(
            `.${CssClasses.TOOLTIP_CARET_BOTTOM}`
          );

          if (!topCaret || !bottomCaret) {
            return;
          }
          topCaret.removeAttribute('style');
          bottomCaret.removeAttribute('style');
        },
        getActiveElement: () => {
          return document.activeElement;
        }
      });
    }
  });

  const {
    anchorBoundaryType,
    activateOn = ['hover', 'focus'],
    enterDelay,
    leaveDelay,
    open
  } = props;

  const { rootEl, anchorEl } = elements;

  useEffect(() => {
    const tooltipId = rootEl.ref?.getAttribute('id');
    if (!tooltipId) {
      throw new Error('MDCTooltip: Tooltip component must have an id.');
    }
    const anchorElem =
      document.querySelector<HTMLElement>(`[data-tooltip-id="${tooltipId}"]`) ||
      document.querySelector<HTMLElement>(`[aria-describedby="${tooltipId}"]`);
    if (!anchorElem) {
      throw new Error(
        'MDCTooltip: Tooltip component requires an anchor element annotated with [aria-describedby] or [data-tooltip-id].'
      );
    }
  }, [rootEl.ref]);

  const {
    align,
    isPersistent,
    onClick,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    onTouchEnd,
    onTouchStart,
    onTransitionEnd
  } = props;

  const handleMouseEnter = useCallback(
    (evt: React.MouseEvent) => {
      onMouseEnter?.(evt);
      foundation.handleAnchorMouseEnter();
    },
    [foundation, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (evt: React.MouseEvent) => {
      onMouseLeave?.(evt);
      foundation.handleAnchorMouseLeave();
    },
    [foundation, onMouseLeave]
  );

  const handleFocus = useCallback(
    (evt: React.FocusEvent & FocusEvent) => {
      onFocus?.(evt);
      foundation.handleAnchorFocus(evt);
    },
    [foundation, onFocus]
  );

  const handleTransitionEnd = useCallback(
    (evt: React.TransitionEvent) => {
      onTransitionEnd?.(evt);
      foundation.handleTransitionEnd();
    },
    [foundation, onTransitionEnd]
  );

  const handleClick = useCallback(
    (evt: React.MouseEvent) => {
      onClick?.(evt);
      foundation.handleAnchorClick();
    },
    [foundation, onClick]
  );

  const handleTouchstart = useCallback(
    (evt: React.TouchEvent) => {
      onTouchStart?.(evt);
      foundation.handleAnchorTouchstart();
    },
    [foundation, onTouchStart]
  );

  const handleTouchend = useCallback(
    (evt: React.TouchEvent) => {
      onTouchEnd?.(evt);
      foundation.handleAnchorTouchend();
    },
    [foundation, onTouchEnd]
  );

  useEffect(() => {
    const calculateActivationType = (type: TooltipActivationT) =>
      Array.isArray(activateOn)
        ? activateOn.includes(type)
        : activateOn === type;

    if (foundation.isRich() && foundation.isPersistent()) {
      anchorEl.addEventListener('onClick', handleClick);
    } else {
      calculateActivationType('click') &&
        anchorEl.addEventListener('onClick', handleClick);
      calculateActivationType('hover') &&
        !open &&
        anchorEl.addEventListener('onMouseEnter', handleMouseEnter);
      calculateActivationType('focus') &&
        anchorEl.addEventListener('onFocus', handleFocus);
      calculateActivationType('hover') &&
        !open &&
        anchorEl.addEventListener('onMouseLeave', handleMouseLeave);
      anchorEl.addEventListener('onTouchStart', handleTouchstart);
      anchorEl.addEventListener('onTouchEnd', handleTouchend);
    }
  }, [
    activateOn,
    anchorEl,
    isPersistent,
    foundation,
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    handleTransitionEnd,
    handleClick,
    handleTouchstart,
    handleTouchend,
    open
  ]);

  // set position
  useEffect(() => {
    align && foundation.setTooltipPosition(ALIGN_MAP[align]);
  }, [align, foundation]);

  // set anchorBoundary
  useEffect(() => {
    anchorBoundaryType && foundation.setAnchorBoundaryType(anchorBoundaryType);
  }, [anchorBoundaryType, foundation]);

  // set hide delay
  useEffect(() => {
    leaveDelay && foundation.setHideDelay(leaveDelay);
  }, [foundation, leaveDelay]);

  // set show delay
  useEffect(() => {
    enterDelay && foundation.setShowDelay(enterDelay);
  }, [foundation, enterDelay]);

  // handle hide
  useEffect(() => {
    if (open !== undefined && open === false) {
      foundation.hide();
      anchorEl.removeEventListener('onMouseEnter', handleMouseEnter);
      anchorEl.removeEventListener('onMouseLeave', handleMouseLeave);
    }
  }, [foundation, open, anchorEl, handleMouseEnter, handleMouseLeave]);

  // handle open
  useEffect(() => {
    open && foundation.show();
  }, [foundation, open]);

  return { foundation, ...elements };
};

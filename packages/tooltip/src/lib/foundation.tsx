import { CssClasses, MDCTooltipFoundation, events } from '@material/tooltip';
import { useFoundation } from '@rmwc/base';
import { useCallback, useEffect } from 'react';
import { ALIGN_MAP, TOOLTIP_ALIGN_VALUES } from './constants';
import { TooltipProps } from './tooltip';
import {
  TooltipActivationT,
  TooltipAlignT,
  useProviderContext
} from '@rmwc/provider';

export const useToolTipFoundation = (
  props: TooltipProps & React.HTMLProps<any>
) => {
  const { foundation, ...elements } = useFoundation({
    props,
    elements: { anchorEl: true, rootEl: true, surfaceEl: true },
    foundation: ({ anchorEl, emit, rootEl, surfaceEl }) => {
      return new MDCTooltipFoundation({
        getAttribute: (attr) => rootEl.ref?.getAttribute(attr) as string | null,
        setAttribute: (attr, value) => {
          rootEl.setProp(attr as any, value);
        },
        removeAttribute: (attr) => {
          rootEl.removeProp(attr as any);
        },
        addClass: (className) => {
          rootEl.ref?.classList.add(className);
        },
        hasClass: (className) =>
          rootEl.ref ? rootEl.ref?.classList.contains(className) : false,
        removeClass: (className) => {
          rootEl.ref?.classList.remove(className);
        },
        getComputedStyleProperty: (propertyName) => {
          return rootEl.ref
            ? window.getComputedStyle(rootEl.ref).getPropertyValue(propertyName)
            : '';
        },
        setStyleProperty: (propertyName, value) => {
          rootEl.setStyle(propertyName, value);
        },
        setSurfaceAnimationStyleProperty: (propertyName, value) => {
          surfaceEl.setStyle(propertyName, value);
        },
        getViewportWidth: () => window.innerWidth,
        getViewportHeight: () => window.innerHeight,
        getTooltipSize: () => {
          return rootEl.ref === null
            ? { width: 0, height: 0 }
            : {
                width: rootEl.ref.offsetWidth,
                height: rootEl.ref.offsetHeight
              };
        },
        getAnchorBoundingRect: () => {
          return anchorEl.ref?.getBoundingClientRect() ?? null;
        },
        getParentBoundingRect: () => {
          return rootEl.ref?.parentElement?.getBoundingClientRect() ?? null;
        },
        getAnchorAttribute: (attr) => {
          return anchorEl.ref?.getAttribute(attr) ?? null;
        },
        setAnchorAttribute: (attr, value) => {
          return anchorEl.ref?.setAttribute(attr as any, value);
        },
        isRTL: () =>
          !!rootEl.ref && getComputedStyle(rootEl.ref).direction === 'rtl',
        anchorContainsElement: (element) => {
          return !!anchorEl.ref?.contains(element);
        },
        tooltipContainsElement: (element) => {
          return !!rootEl.ref?.contains(element);
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
          anchorEl.addEventListener(evt, handler);
        },
        deregisterAnchorEventHandler: (evt, handler) => {
          anchorEl.removeEventListener(evt, handler);
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

  const providerContext = useProviderContext();

  const { tooltip } = providerContext;
  if (tooltip?.align && !TOOLTIP_ALIGN_VALUES.includes(tooltip.align)) {
    console.warn(
      `The Tooltip does not support the align value ${tooltip.align} from the provider context`
    );
    tooltip.align = undefined;
  }

  const { anchorBoundaryType, align, enterDelay, leaveDelay } = {
    ...providerContext.tooltip,
    ...props
  };

  const isShown = foundation.isShown();

  const {
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

  // handle align
  useEffect(() => {
    if (!align) {
      return;
    }
    if (align) {
      const position = ALIGN_MAP[align as TooltipAlignT];
      foundation.setTooltipPosition(position);
    }
  }, [foundation, align]);

  // set anchorBoundary
  useEffect(() => {
    anchorBoundaryType && foundation.setAnchorBoundaryType(anchorBoundaryType);
  }, [anchorBoundaryType, foundation]);

  // set show delay
  useEffect(() => {
    enterDelay && foundation.setShowDelay(enterDelay);
  }, [foundation, enterDelay]);

  // set hide delay
  useEffect(() => {
    leaveDelay && foundation.setHideDelay(leaveDelay);
  }, [foundation, leaveDelay]);

  return {
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    handleTransitionEnd,
    handleClick,
    handleTouchstart,
    handleTouchend,
    foundation,
    isShown,
    ...elements
  };
};

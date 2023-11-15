import { CssClasses, MDCTooltipFoundation, events } from '@material/tooltip';
import { useFoundation } from '@rmwc/base';
import { useCallback, useEffect } from 'react';
import { ALIGN_MAP, TOOLTIP_ALIGN_VALUES } from './constants';
import { TooltipActivationT, TooltipProps } from './tooltip';
import { useProviderContext } from '@rmwc/provider';

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
        setAnchorAttribute: (attr, value) =>
          anchorEl?.setProp(attr as any, value),
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
          if (props.open) {
            // to support open we need to disable event listeners for document
            return;
          }
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

  const {
    anchorBoundaryType,
    align,
    activateOn = ['hover', 'focus'],
    enterDelay,
    leaveDelay,
    open
  } = {
    ...providerContext.tooltip,
    ...props
  };

  const { anchorEl, rootEl } = elements;

  const isShown = foundation.isShown();

  const {
    onClick,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    onTouchEnd,
    onTouchStart,
    onTransitionEnd,
    stayOpenOnHover
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

    if (foundation.isPersistent()) {
      anchorEl.addEventListener('click', handleClick);
    } else {
      calculateActivationType('click') &&
        anchorEl.addEventListener('click', handleClick);
      calculateActivationType('hover') &&
        anchorEl.addEventListener('mouseenter', handleMouseEnter);
      calculateActivationType('focus') &&
        anchorEl.addEventListener('focus', handleFocus);
      calculateActivationType('hover') &&
        !open &&
        anchorEl.addEventListener('mouseleave', handleMouseLeave);
      anchorEl.addEventListener('onTouchStart', handleTouchstart);
      anchorEl.addEventListener('onTouchEnd', handleTouchend);
      rootEl.addEventListener('transitionend', handleTransitionEnd);
    }
  }, [
    activateOn,
    anchorEl,
    foundation,
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    handleTransitionEnd,
    handleClick,
    handleTouchstart,
    handleTouchend,
    open,
    rootEl
  ]);

  // handle align
  useEffect(() => {
    if (!align) {
      return;
    }
    if (align) {
      const position = ALIGN_MAP[align];
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

  // handle hide
  useEffect(() => {
    if (!open) {
      foundation.hide();
    }
  }, [foundation, open, anchorEl, handleMouseEnter, handleMouseLeave]);

  // handle open
  useEffect(() => {
    open && foundation.show();
  }, [foundation, open]);

  // handle persistance of interactive rich tooltip
  useEffect(() => {
    stayOpenOnHover &&
      rootEl.addEventListener('mouseover', () => foundation.show());
  }, [stayOpenOnHover, foundation, rootEl]);

  return {
    foundation,
    isShown,
    ...elements
  };
};

import React, { useRef, useContext, useEffect, useMemo } from 'react';
import { TabProps, TabApi } from './tab';
import { useFoundation, useId, emptyClientRect } from '@rmwc/base';
import { MDCTabFoundation } from '@material/tab';
import { TabIndicatorApi } from './tab-indicator';
import { TabBarContext } from './tab-bar-context';

export const useTabFoundation = (props: TabProps & React.HTMLProps<any>) => {
  const tabIndicatorApi = useRef<TabIndicatorApi | null>();
  const setTabIndicatorApi = (api: TabIndicatorApi | null) =>
    (tabIndicatorApi.current = api);

  const contextApi = useContext(TabBarContext);
  const id = useId('tab', props);

  const { foundation, ...elements } = useFoundation({
    props,
    elements: { rootEl: true, contentEl: true },
    foundation: ({ rootEl, contentEl, emit, getProps }) => {
      return new MDCTabFoundation(
        /** @type {!MDCTabAdapter} */ {
          setAttr: (attr: string, value: any) =>
            rootEl.setProp(attr as any, value),
          addClass: (className: string) => rootEl.addClass(className),
          removeClass: (className: string) => rootEl.removeClass(className),
          hasClass: (className: string) => rootEl.hasClass(className),
          activateIndicator: (previousIndicatorClientRect: ClientRect) =>
            tabIndicatorApi.current?.activate(previousIndicatorClientRect),
          deactivateIndicator: () => tabIndicatorApi.current?.deactivate(),
          notifyInteracted: () => {
            const evt = emit('onInteraction', { tabId: id }, true /* bubble */);

            contextApi.onTabInteraction(evt);
          },
          getOffsetLeft: () => rootEl.ref?.offsetLeft || 0,
          getOffsetWidth: () => rootEl.ref?.offsetWidth || 0,
          getContentOffsetLeft: () => contentEl.ref?.offsetLeft || 0,
          getContentOffsetWidth: () => contentEl.ref?.offsetWidth || 0,
          focus: () => rootEl.ref && rootEl.ref.focus && rootEl.ref.focus()
        }
      );
    }
  });

  const { rootEl } = elements;

  const handleClick = (evt: React.MouseEvent) => {
    props.onClick?.(evt);
    foundation.handleClick();
  };

  rootEl.setProp('onClick', handleClick, true);

  const tabApi = useMemo<TabApi>(() => {
    return {
      getActive: () => foundation.isActive(),
      activate: (computeIndicatorClientRect: ClientRect) =>
        foundation.activate(computeIndicatorClientRect),
      deactivate: () => foundation.deactivate(),
      computeIndicatorClientRect: () =>
        tabIndicatorApi.current?.computeContentClientRect() || emptyClientRect,
      computeDimensions: () => foundation.computeDimensions(),
      focus: () => rootEl.ref && rootEl.ref.focus(),
      id,
      getIndex: () =>
        rootEl.ref?.parentElement
          ? Array.from(rootEl.ref.parentElement.children).indexOf(rootEl.ref)
          : -1
    };
  }, [foundation, rootEl.ref, id]);

  useEffect(() => {
    contextApi.registerTab(tabApi);

    return () => {
      contextApi.unregisterTab(tabApi);
    };
  }, [contextApi, tabApi]);

  useEffect(() => {
    props.focusOnActivate !== undefined &&
      foundation.setFocusOnActivate(props.focusOnActivate);
  }, [foundation, props.focusOnActivate]);

  return {
    ...elements,
    setTabIndicatorApi
  };
};

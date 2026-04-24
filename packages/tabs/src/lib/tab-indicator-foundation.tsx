import { TabIndicatorProps, TabIndicatorApi } from './tab-indicator';
import { useFoundation, emptyClientRect } from '@rmwc/base';
import {
  MDCFadingTabIndicatorFoundation,
  MDCSlidingTabIndicatorFoundation,
  MDCTabIndicatorAdapter,
  MDCTabIndicatorFoundation
} from '@material/tab-indicator';

export const useTabIndicatorFoundation = (props: TabIndicatorProps) => {
  const { foundation, ...elements } = useFoundation({
    props,
    elements: { rootEl: true, contentEl: true },
    foundation: ({ rootEl, contentEl }) => {
      const adapter: MDCTabIndicatorAdapter = {
        addClass: (className: string) => {
          rootEl.ref?.classList.add(className);
        },
        removeClass: (className: string) => {
          rootEl.ref?.classList.remove(className);
        },
        computeContentClientRect: () =>
          contentEl.ref
            ? contentEl.ref.getBoundingClientRect()
            : emptyClientRect,
        setContentStyleProperty: (prop: string, value: string) => {
          contentEl.ref?.style.setProperty(prop, value);
        }
      };

      if (props.transition === 'fade') {
        return new MDCFadingTabIndicatorFoundation(adapter);
      }

      return new MDCSlidingTabIndicatorFoundation(adapter);
    },
    api: ({
      foundation
    }: {
      foundation: MDCTabIndicatorFoundation;
    }): TabIndicatorApi => {
      return {
        activate: (previousIndicatorClientRect?: DOMRect) => {
          foundation.activate(previousIndicatorClientRect);
        },
        deactivate: () => {
          foundation.deactivate();
        },
        computeContentClientRect: () => {
          return foundation.computeContentClientRect();
        }
      };
    }
  });

  return { ...elements };
};

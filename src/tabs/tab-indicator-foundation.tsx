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
          rootEl.addClass(className);
        },
        removeClass: (className: string) => {
          rootEl.removeClass(className);
        },
        computeContentClientRect: () =>
          contentEl.ref
            ? contentEl.ref.getBoundingClientRect()
            : emptyClientRect,
        setContentStyleProperty: (prop: string, value: string) => {
          contentEl.setStyle(prop, value);
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
        activate: (previousIndicatorClientRect?: ClientRect) => {
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

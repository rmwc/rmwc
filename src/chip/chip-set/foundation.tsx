// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as RMWC from '@rmwc/types';
import { ChipSetHTMLProps, ChipSetProps } from './';
import { useFoundation } from '@rmwc/base';
import {
  MDCChipSetAdapter,
  MDCChipSetFoundation,
  MDCChipSetCssClasses,
  MDCChipFactory,
  MDCChip,
  ChipInteractionEvent,
  ChipNavigationEvent,
  ChipAnimationEvent,
  MDCChipEvents
} from '@material/chips';
import { useEffect } from 'react';

export const useChipSetFoundation = (
  props: ChipSetProps & ChipSetHTMLProps
) => {
  const foundationWithElements = useFoundation({
    props,
    elements: {
      rootEl: true
    },
    foundation: ({ rootEl, emit }) => {
      const rootHTML = rootEl.ref as HTMLElement;

      const chips: MDCChip[] = [];

      const isIndexValid = (index: number): boolean => {
        return index > -1 && index < chips.length;
      };

      return new MDCChipSetFoundation({
        announceMessage: (message) => {
          // announce(message);
        },
        emitEvent: (eventName, eventDetail) => {
          emit(eventName, eventDetail, true /* shouldBubble */);
        },
        getAttribute: (attrName) => rootHTML.getAttribute(attrName),
        getChipActionsAtIndex: (index) => {
          if (!isIndexValid(index)) return [];
          return chips[index].getActions();
        },
        getChipCount: () => chips.length,
        getChipIdAtIndex: (index) => {
          if (!isIndexValid(index)) return '';
          return chips[index].getElementID();
        },
        getChipIndexById: (id) =>
          chips.findIndex((chip) => chip.getElementID() === id),
        isChipFocusableAtIndex: (index, action) => {
          if (!isIndexValid(index)) return false;
          return chips[index].isActionFocusable(action);
        },
        isChipSelectableAtIndex: (index, action) => {
          if (!isIndexValid(index)) return false;
          return chips[index].isActionSelectable(action);
        },
        isChipSelectedAtIndex: (index, action) => {
          if (!isIndexValid(index)) return false;
          return chips[index].isActionSelected(action);
        },
        removeChipAtIndex: (index) => {
          if (!isIndexValid(index)) return;
          chips[index].destroy();
          chips[index].remove();
          chips.splice(index, 1);
        },
        setChipFocusAtIndex: (index, action, focus) => {
          if (!isIndexValid(index)) return;
          chips[index].setActionFocus(action, focus);
        },
        setChipSelectedAtIndex: (index, action, selected) => {
          if (!isIndexValid(index)) return;
          chips[index].setActionSelected(action, selected);
        },
        startChipAnimationAtIndex: (index, animation) => {
          if (!isIndexValid(index)) return;
          chips[index].startAnimation(animation);
        }
      } as MDCChipSetAdapter);
    }
  });

  const { foundation, rootEl } = foundationWithElements;

  const handleChipAnimation = (event: ChipAnimationEvent) => {
    foundation.handleChipAnimation(event);
  };

  const handleChipInteraction = (e: ChipInteractionEvent) => {
    foundation.handleChipInteraction(e);
  };

  const handleChipNavigation = (event: ChipNavigationEvent) => {
    foundation.handleChipNavigation(event);
  };

  rootEl.ref?.addEventListener(
    MDCChipEvents.ANIMATION,
    handleChipAnimation as EventListener
  );
  rootEl.ref?.addEventListener(
    MDCChipEvents.INTERACTION,
    handleChipInteraction as EventListener
  );
  rootEl.ref?.addEventListener(
    MDCChipEvents.NAVIGATION,
    handleChipNavigation as EventListener
  );

  useEffect(() => {
    const chipFactory: MDCChipFactory = (el: Element) => new MDCChip(el);

    const chips: MDCChip[] = [];
    const chipEls = (rootEl.ref as HTMLElement).querySelectorAll(
      `.${MDCChipSetCssClasses.CHIP}`
    );
    for (let i = 0; i < chipEls.length; i++) {
      const chip = chipFactory(chipEls[i]);
      chips.push(chip);
    }
  }, [rootEl.ref]);

  return { ...foundationWithElements };
};

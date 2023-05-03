// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as RMWC from '@rmwc/types';
import { ChipSetHTMLProps, ChipSetProps } from './';
import { useFoundation } from '@rmwc/base';
import {
  MDCChipSetAdapter,
  MDCChipSetFoundation,
  ChipInteractionEvent,
  ChipNavigationEvent,
  ChipAnimationEvent,
  MDCChipEvents
} from '@material/chips';
import { useRef } from 'react';
import { ChipApi } from '../chip';

export const useChipSetFoundation = (
  props: ChipSetProps & ChipSetHTMLProps
) => {
  const chipsRef = useRef<ChipApi[]>([]);

  const foundationWithElements = useFoundation({
    props,
    elements: {
      rootEl: true
    },
    foundation: ({ rootEl, emit }) => {
      const rootHTML = rootEl.ref as HTMLElement;

      const isIndexValid = (index: number): boolean => {
        return index > -1 && index < chipsRef.current.length;
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
          return chipsRef.current[index].getActions();
        },
        getChipCount: () => chipsRef.current.length,
        getChipIdAtIndex: (index) => {
          if (!isIndexValid(index)) return '';
          return chipsRef.current[index].getElementID();
        },
        getChipIndexById: (id) =>
          chipsRef.current.findIndex((chip) => chip.getElementID() === id),
        isChipFocusableAtIndex: (index, action) => {
          if (!isIndexValid(index)) return false;
          return chipsRef.current[index].isActionFocusable(action);
        },
        isChipSelectableAtIndex: (index, action) => {
          if (!isIndexValid(index)) return false;
          return chipsRef.current[index].isActionSelectable(action);
        },
        isChipSelectedAtIndex: (index, action) => {
          if (!isIndexValid(index)) return false;
          return chipsRef.current[index].isActionSelected(action);
        },
        removeChipAtIndex: (index) => {
          if (!isIndexValid(index)) return;
          chipsRef.current[index].destroy();
          chipsRef.current[index].remove();
          chipsRef.current.splice(index, 1);
        },
        setChipFocusAtIndex: (index, action, focus) => {
          if (!isIndexValid(index)) return;
          chipsRef.current[index].setActionFocus(action, focus);
        },
        setChipSelectedAtIndex: (index, action, selected) => {
          if (!isIndexValid(index)) return;
          chipsRef.current[index].setActionSelected(action, selected);
        },
        startChipAnimationAtIndex: (index, animation) => {
          if (!isIndexValid(index)) return;
          chipsRef.current[index].startAnimation(animation);
        }
      } as MDCChipSetAdapter);
    }
  });

  const { foundation, rootEl } = foundationWithElements;

  const registerChip = (chip: ChipApi) => {
    chipsRef.current.push(chip);
    chipsRef.current.sort((a, b) => a.getIndex() - b.getIndex());
  };

  const unregisterChip = (chip: ChipApi) => {
    chipsRef.current.splice(chipsRef.current.indexOf(chip), 1);
    chipsRef.current.sort((a, b) => a.getIndex() - b.getIndex());
  };

  const handleChipAnimation = (event: ChipAnimationEvent) => {
    console.log('animation');
    foundation.handleChipAnimation(event);
  };

  const handleChipInteraction = (event: ChipInteractionEvent) => {
    console.log('interaction');
    foundation.handleChipInteraction(event);
  };

  const handleChipNavigation = (event: ChipNavigationEvent) => {
    console.log('navigation');
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

  return { ...foundationWithElements, registerChip, unregisterChip };
};

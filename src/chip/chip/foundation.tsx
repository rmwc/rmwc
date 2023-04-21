// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as RMWC from '@rmwc/types';
import { ChipProps, ChipHTMLProps, ChipOnInteractionEventT } from './';
import { useFoundation } from '@rmwc/base';
import {
  MDCChipFoundation,
  MDCChipAdapter,
  MDCChipActionType,
  MDCChipActionFocusBehavior,
  MDCChipAction
} from '@material/chips';
import React, { useCallback, useRef } from 'react';
import { TrailingActionApi } from '../action';

export const useChipFoundation = (props: ChipProps & ChipHTMLProps) => {
  const trailingAction = useRef<TrailingActionApi | null>();
  const setTrailingAction = (api: TrailingActionApi | null) => {
    trailingAction.current = api;
  };

  const foundationWithElements = useFoundation({
    props,
    elements: {
      rootEl: true,
      trailingIconEl: true,
      trailingActionEl: true
    },
    foundation: ({ rootEl, emit, getProps, trailingActionEl }) => {
      const rootHTML = rootEl.ref as HTMLElement;
      const actions = new Map<MDCChipActionType, MDCChipAction>();

      // const actionFactory: MDCChipActionFactory = (el: Element) =>
      //   new MDCChipAction(el);

      // const actionEls = rootHTML.querySelectorAll(
      //   '.mdc-evolution-chip__action'
      // );
      // for (let i = 0; i < actionEls.length; i++) {
      //   const action = actionFactory(actionEls[i]);
      //   actions.set(action.actionType(), action);
      // }

      return new MDCChipFoundation({
        addClass: (className) => {
          rootEl.addClass(className);
        },
        emitEvent: (eventName, eventDetail) => {
          emit(eventName, eventDetail, true);
        },
        getActions: () => {
          const actions: MDCChipActionType[] = [];
          for (const key of actions) {
            actions.push(key);
          }
          return actions;
        },
        getAttribute: (attrName) => rootEl.ref?.getAttribute(attrName),
        getElementID: () => {
          return rootEl.ref?.id;
        },
        getOffsetWidth: () => rootHTML.offsetWidth,
        hasClass: (className) => rootEl.hasClass(className),
        isActionSelectable: (actionType: MDCChipActionType) => {
          const action = actions.get(actionType);
          if (action) {
            return action.isSelectable();
          }
          return false;
        },
        isActionSelected: (actionType: MDCChipActionType) => {
          const action = actions.get(actionType);
          if (action) {
            return action.isSelected();
          }
          return false;
        },
        isActionFocusable: (actionType: MDCChipActionType) => {
          const action = actions.get(actionType);
          if (action) {
            return action.isFocusable();
          }
          return false;
        },
        isActionDisabled: (actionType: MDCChipActionType) => {
          const action = actions.get(actionType);
          if (action) {
            return action.isDisabled();
          }
          return false;
        },
        isRTL: () => {
          return rootEl.ref
            ? window
                .getComputedStyle(rootEl.ref)
                .getPropertyValue('direction') === 'rtl'
            : false;
        },
        removeClass: (className) => rootEl.removeClass(className),
        setActionDisabled: (
          actionType: MDCChipActionType,
          isDisabled: boolean
        ) => {
          const action = actions.get(actionType);
          if (action) {
            action.setDisabled(isDisabled);
          }
        },
        setActionFocus: (
          actionType: MDCChipActionType,
          behavior: MDCChipActionFocusBehavior
        ) => {
          const action = actions.get(actionType);
          if (action) {
            action.setFocus(behavior);
          }
        },
        setActionSelected: (
          actionType: MDCChipActionType,
          isSelected: boolean
        ) => {
          const action = actions.get(actionType);
          if (action) {
            action.setSelected(isSelected);
          }
        },
        setStyleProperty: (propertyName, value) => {
          rootEl.setStyle(propertyName, value);
        }
      } as MDCChipAdapter);
    }
  });

  const { rootEl, foundation, trailingActionEl } = foundationWithElements;

  const { onClick, onKeyDown, onInteraction } = props;

  const handleInteraction = useCallback(
    (
      evt: React.MouseEvent &
        React.KeyboardEvent &
        MouseEvent &
        KeyboardEvent &
        ChipOnInteractionEventT
    ) => {
      evt.type === 'click' && onClick?.(evt as any);
      evt.type === 'keydown' && onKeyDown?.(evt as any);
      onInteraction?.(evt);
      return foundation.handleActionInteraction(evt as any);
    },
    [foundation, onClick, onKeyDown, onInteraction]
  );

  rootEl.setProp('onClick', handleInteraction, true);
  rootEl.setProp('onKeyDown', handleInteraction, true);

  const remove = (evt: any) => {
    props.onRemove?.(evt);
    const parent = rootEl.ref?.parentNode;
    if (parent !== null || parent !== undefined) {
      rootEl.ref && parent?.removeChild(rootEl.ref);
    }
  };

  trailingActionEl.setProp('onClick', remove, true);

  return { setTrailingAction, ...foundationWithElements };
};

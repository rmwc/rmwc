import { useFoundation } from '@rmwc/base';
import {
  MDCChipActionAdapter,
  MDCChipActionAttributes,
  MDCChipActionFocusBehavior,
  MDCChipPrimaryActionFoundation,
  MDCChipTrailingActionFoundation
} from '@material/chips';
import {
  ActionApi,
  ActionHTMLProps,
  PrimaryActionProps,
  TrailingActionApi
} from '.';
import { useActionContext } from '../action-context';
import { useEffect, useMemo } from 'react';

export const usePrimaryActionFoundation = (
  props: (PrimaryActionProps | TrailingActionApi) & ActionHTMLProps,
  actionType: 'trailing' | 'primary'
) => {
  const actionContextApi = useActionContext();

  const foundationWithElements = useFoundation({
    props,
    elements: { rootEl: true },
    foundation: ({ rootEl, emit }) => {
      const adapter: MDCChipActionAdapter = {
        emitEvent: (eventName, eventDetail) => {
          emit(eventName, eventDetail, true);
        },
        focus: () => rootEl.ref?.focus(),
        getAttribute: (attr: MDCChipActionAttributes) =>
          rootEl.ref && rootEl.ref.getAttribute(attr),
        setAttribute: (attr: MDCChipActionAttributes, value: string) =>
          rootEl.setProp(attr as any, value),
        getElementID: () => rootEl.ref?.id ?? '',
        removeAttribute: (attr: MDCChipActionAttributes) =>
          rootEl.ref?.removeAttribute(attr)
      };
      if (actionType === 'trailing') {
        return new MDCChipTrailingActionFoundation(adapter);
      }
      return new MDCChipPrimaryActionFoundation(adapter);
    }
  });

  const { foundation, rootEl } = foundationWithElements;

  const actionApi = useMemo<ActionApi>(() => {
    return {
      actionType: foundation.actionType(),
      isSelectAble: () => foundation.isSelectable(),
      isSelected: () => foundation.isSelected(),
      isFocusable: () => foundation.isFocusable(),
      isDisabled: () => foundation.isDisabled(),
      setDisabled: (isDisabled: boolean) => foundation.setDisabled(isDisabled),
      setFocus: (behavior: MDCChipActionFocusBehavior) =>
        foundation.setFocus(behavior),
      setSelected: (isSelected: boolean) => foundation.setSelected(isSelected)
    };
  }, [foundation]);

  useEffect(() => {
    // set action for primary and trailing
    actionContextApi.registerAction(actionApi);

    return () => {
      actionContextApi.unregisterAction(actionApi);
    };
  }, [actionContextApi, actionApi]);

  const handleClick = (event: any) => {
    props.onClick?.(event);
    foundation.handleClick();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    foundation.handleKeydown(event);
  };

  rootEl.setProp('onClick', handleClick, true);
  rootEl.setProp('onKeyDown', handleKeyDown, true);

  return foundationWithElements;
};

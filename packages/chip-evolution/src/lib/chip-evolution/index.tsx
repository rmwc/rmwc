import * as RMWC from '@rmwc/types';
import React, { useRef } from 'react';
import {
  MDCChipActionFocusBehavior,
  MDCChipActionType,
  MDCChipAnimation,
  MDCChipFoundation
} from '@material/chips';
import { withRipple } from '@rmwc/ripple';
import { useChipEvolutionFoundation } from './foundation';
import { Tag, useClassNames, createComponent, useId } from '@rmwc/base';
import { PrimaryAction, TrailingAction } from '../action';
import { ActionContext, ActionContextT } from '../action-context';
import { useChipEvolutionContext } from '../chip-evolution-context';

/*********************************************************************
 * Events
 *********************************************************************/

export type ChipEvolutionOnInteractionEventT = RMWC.CustomEventT<{
  chipID: string;
}>;
export type ChipEvolutionOnTrailingIconInteractionEventT = RMWC.CustomEventT<{
  chipID: string;
}>;
export type ChipEvolutionOnRemoveEventT = RMWC.CustomEventT<{ chipID: string }>;

/*********************************************************************
 * Chips
 *********************************************************************/

/** A Chip component. */
export interface ChipEvolutionProps {
  /** Text for your Chip. */
  label?: string;
  /** Makes the Chip appear selected. */
  selected?: boolean;
  /** Instance of an Icon Component. */
  icon?: React.ReactNode;
  /** Instance of an Icon Component. */
  trailingIcon?: React.ReactNode;
  /** Defaults to true. Set this to false if your trailing icon is something other than a remove button. */
  trailingIconRemovesChip?: boolean;
  /** Includes an optional checkmark for the chips selected state. */
  checkmark?: boolean;
  /** Additional children will be rendered in the text area. */
  children?: React.ReactNode;
  /** A callback for click or enter key. This should be used over onClick for accessibility reasons.  */
  onInteraction?: (evt: ChipEvolutionOnInteractionEventT) => void;
  /** A callback that is fired once the chip is in an exited state from removing it. */
  onRemove?: (evt: ChipEvolutionOnRemoveEventT) => void;
  /** Advanced: A reference to the MDCFoundation. */
  foundationRef?: React.Ref<MDCChipFoundation>;
}

export type ChipEvolutionApi = {
  getIndex: () => number;
  getActions: () => MDCChipActionType[];
  getElementID: () => string;
  isActionFocusable: (action: MDCChipActionType) => boolean;
  isActionSelectable: (action: MDCChipActionType) => boolean;
  isActionSelected: (action: MDCChipActionType) => boolean;
  destroy: () => void;
  remove: () => void;
  setActionFocus: (
    action: MDCChipActionType,
    focus: MDCChipActionFocusBehavior
  ) => void;
  setActionSelected: (action: MDCChipActionType, isSelected: boolean) => void;
  startAnimation: (animation: MDCChipAnimation) => void;
};

export type ChipEvolutionHTMLProps = RMWC.HTMLProps<
  HTMLDivElement,
  Omit<React.AllHTMLAttributes<HTMLDivElement>, 'label'>
>;

/** A Chip component. */
export const ChipEvolution: RMWC.ComponentType<
  ChipEvolutionProps,
  ChipEvolutionHTMLProps,
  'div'
> = withRipple()(
  createComponent<ChipEvolutionProps, ChipEvolutionHTMLProps>(
    function Chip(props, ref) {
      const {
        disabled,
        onInteraction,
        onRemove,
        onSelect,
        icon,
        trailingIcon,
        trailingIconRemovesChip,
        checkmark,
        label,
        children,
        selected,
        foundationRef,
        ...rest
      } = props;

      const {
        rootEl,
        trailingActionEl,
        registerAction,
        unregisterAction,
        setTrailingAction
      } = useChipEvolutionFoundation(props);

      const { action, input, filter } = useChipEvolutionContext();

      const className = useClassNames(props, [
        'mdc-evolution-chip',
        {
          'mdc-evolution-chip--selected': selected,
          'mdc-evolution-chip--disabled': disabled,
          'mdc-evolution-chip--filter': filter,
          'rmwc-chip-evolution': input
        }
      ]);

      const contextApi = useRef<ActionContextT>({
        registerAction,
        unregisterAction
      });

      const uniqueId = useId('chip-evolution', props);

      return (
        <ActionContext.Provider value={contextApi.current}>
          <Tag
            aria-disabled={disabled}
            tag="span"
            role={filter ? 'presentation' : 'row'}
            element={rootEl}
            id={uniqueId}
            {...rest}
            className={className}
            ref={ref}
          >
            <span
              className="mdc-evolution-chip__cell mdc-evolution-chip__cell--primary"
              {...(!filter && { role: 'gridcell' })}
            >
              <PrimaryAction label={label} icon={icon} selected={selected}>
                {children}
              </PrimaryAction>
            </span>
            {input && (
              <span
                className="mdc-evolution-chip__cell mdc-evolution-chip__cell--trailing"
                role="gridcell"
              >
                <TrailingAction
                  icon={trailingIcon ?? 'close'}
                  apiRef={setTrailingAction}
                  {...trailingActionEl.props({})}
                />
              </span>
            )}
          </Tag>
        </ActionContext.Provider>
      );
    }
  )
);

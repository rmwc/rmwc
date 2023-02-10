import * as RMWC from '@rmwc/types';
import React from 'react';
import { MDCChipFoundation } from '@material/chips';
import { withRipple } from '@rmwc/ripple';
import { useChipFoundation } from './foundation';
import { Tag, useClassNames, createComponent } from '@rmwc/base';
import { PrimaryAction, TrailingAction } from '../action';

/*********************************************************************
 * Events
 *********************************************************************/

export type ChipOnInteractionEventT = RMWC.CustomEventT<{ chipId: string }>;
export type ChipOnTrailingIconInteractionEventT = RMWC.CustomEventT<{
  chipId: string;
}>;
export type ChipOnRemoveEventT = RMWC.CustomEventT<{ chipId: string }>;

/*********************************************************************
 * Chips
 *********************************************************************/

/** A Chip component. */
export interface ChipProps {
  /** Text for your Chip. */
  label?: string;
  /** makes the Chip appear selected. */
  selected?: boolean;
  /** Instance of an Icon Component. */
  icon?: RMWC.IconPropT;
  /** Instance of an Icon Component. */
  trailingIcon?: RMWC.IconPropT;
  /** Defaults to true. Set this to false if your trailing icon is something other than a remove button. */
  trailingIconRemovesChip?: boolean;
  /** An optional chip ID that will be included in callback evt.detail. If this is not passed, RMWC will attempt to use the "key" prop if present.  */
  id?: string;
  /** Includes an optional checkmark for the chips selected state. */
  checkmark?: boolean;
  /** Additional children will be rendered in the text area. */
  children?: React.ReactNode;
  /** A callback for click or enter key. This should be used over onClick for accessibility reasons.  */
  onInteraction?: (evt: ChipOnInteractionEventT) => void;
  /** A callback that is fired once the chip is in an exited state from removing it. */
  onRemove?: (evt: ChipOnRemoveEventT) => void;
  /** Advanced: A reference to the MDCFoundation. */
  foundationRef?: React.Ref<MDCChipFoundation>;
}

export type ChipHTMLProps = RMWC.HTMLProps<
  HTMLDivElement,
  Omit<React.AllHTMLAttributes<HTMLDivElement>, 'label'>
>;

/** A Chip component. */
export const Chip: RMWC.ComponentType<ChipProps, ChipHTMLProps, 'div'> =
  withRipple()(
    createComponent<ChipProps, ChipHTMLProps>(function Chip(props, ref) {
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

      const { rootEl, trailingActionEl } = useChipFoundation(props);

      const className = useClassNames(props, [
        'mdc-evolution-chip',
        {
          'mdc-evolution-chip--selected': selected,
          'mdc-evolution-chip--disabled': disabled
        }
      ]);

      return (
        <Tag
          tag="span"
          role="row"
          element={rootEl}
          {...rest}
          className={className}
          id={props.id}
          ref={ref}
        >
          <span
            className="mdc-evolution-chip__cell mdc-evolution-chip__cell--primary"
            role="gridcell"
          >
            <PrimaryAction label={label} icon={icon} selectable={selected}>
              {children}
            </PrimaryAction>
          </span>
          {!!trailingIcon && (
            <span
              className="mdc-evolution-chip__cell mdc-evolution-chip__cell--trailing"
              role="gridcell"
            >
              <TrailingAction
                icon={trailingIcon}
                {...trailingActionEl.props({})}
              />
            </span>
          )}
        </Tag>
      );
    })
  );

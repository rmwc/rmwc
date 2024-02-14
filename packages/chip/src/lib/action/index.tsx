import React from 'react';
import classNames from 'classnames';
import * as RMWC from '@rmwc/types';
import { createComponent, Tag, useClassNames } from '@rmwc/base';
import {
  MDCChipActionFocusBehavior,
  MDCChipActionType,
  MDCChipPrimaryActionFoundation,
  MDCChipTrailingActionFoundation
} from '@material/chips';
import { usePrimaryActionFoundation } from './foundation';
import { ChipOnInteractionEventT } from '../chip';
import { Icon } from '@rmwc/icon';
import { useChipContext } from '../chip-context';

/*********************************************************************
 * Primary Action
 *********************************************************************/

export type ActionHTMLProps = RMWC.HTMLProps<
  HTMLButtonElement,
  Omit<React.AllHTMLAttributes<HTMLButtonElement>, 'label'>
>;

export interface PrimaryActionApi {
  getFoundation: () => MDCChipPrimaryActionFoundation;
}

export interface PrimaryActionProps {
  apiRef?: (api: PrimaryActionApi | null) => void;
  href?: string;
  icon?: React.ReactNode;
  label?: string;
  selected?: boolean;
  onInteraction?: (evt: ChipOnInteractionEventT) => void;
  children?: React.ReactNode;
}

export type ActionApi = {
  actionType: MDCChipActionType;
  isSelectAble: () => boolean;
  isSelected: () => boolean;
  isFocusable: () => void;
  isDisabled: () => void;
  setDisabled: (isDisabled: boolean) => void;
  setFocus: (behavior: MDCChipActionFocusBehavior) => void;
  setSelected: (isSelected: boolean) => void;
};

/** The trailing action is used in removable input chips.
 * It is a subcomponent of the chips and intended only for use in the context of a chip. */
export const PrimaryAction = createComponent<
  PrimaryActionProps,
  ActionHTMLProps
>(function PrimaryAction(props, ref) {
  const { rootEl } = usePrimaryActionFoundation(props, 'primary');

  const { filter } = useChipContext();

  const selectable = filter && props.selected;

  const shouldShowGraphic = !!props.icon || selectable;

  const className = useClassNames(props, [
    'mdc-evolution-chip__action',
    'mdc-evolution-chip__action--primary'
  ]);

  const iconClassName = classNames(
    'mdc-evolution-chip__icon',
    'mdc-evolution-chip__icon--primary',
    {
      'rmwc-chip--action-input': !filter
    }
  );

  return (
    <Tag
      {...props}
      tag={props.href ? 'a' : 'button'}
      element={rootEl}
      className={className}
      ref={ref}
      {...(filter && { role: 'option' })}
      {...(props.href && { href: props.href })}
      {...(!props.href && { type: 'button' })}
      {...(selectable && { 'aria-selected': 'false' })}
    >
      <span className="mdc-evolution-chip__ripple mdc-evolution-chip__ripple--primary"></span>
      {shouldShowGraphic && (
        <span className="mdc-evolution-chip__graphic">
          {!!props.icon && <Icon className={iconClassName} icon={props.icon} />}
          {selectable && (
            <span className="mdc-evolution-chip__checkmark">
              <svg
                className="mdc-evolution-chip__checkmark-svg"
                viewBox="-2 -3 30 30"
              >
                <path
                  className="mdc-evolution-chip__checkmark-path"
                  fill="none"
                  stroke="black"
                  d="M1.73,12.91 8.1,19.28 22.79,4.59"
                />
              </svg>
            </span>
          )}
        </span>
      )}
      <span className="mdc-evolution-chip__text-label">
        {props.label}
        {props.children}
      </span>
    </Tag>
  );
});

/*********************************************************************
 * Trailing Action
 *********************************************************************/

export interface TrailingActionApi {
  getFoundation: () => MDCChipTrailingActionFoundation;
}

export interface TrailingActionProps {
  apiRef?: (api: TrailingActionApi | null) => void;
  icon?: React.ReactNode;
  remove?: () => void;
  onInteraction?: (evt: ChipOnInteractionEventT) => void;
}

export const TrailingAction = createComponent<
  TrailingActionProps,
  ActionHTMLProps
>(function TrailingAction(props, ref) {
  // @ts-ignore
  const { rootEl } = usePrimaryActionFoundation(props, 'trailing');
  return (
    <Tag
      tag="button"
      element={rootEl}
      data-mdc-deletable="true"
      type="button"
      {...props}
      ref={ref}
      className="mdc-evolution-chip__action mdc-evolution-chip__action--trailing"
    >
      <span className="mdc-evolution-chip__ripple mdc-evolution-chip__ripple--trailing"></span>
      <Icon
        className="mdc-evolution-chip__icon mdc-evolution-chip__icon--trailing"
        icon={props.icon ?? 'close'}
      />
    </Tag>
  );
});

import * as RMWC from '@rmwc/types';
import * as React from 'react';

import { withRipple } from '@rmwc/ripple';
import { Icon, IconProps } from '@rmwc/icon';
import { useChipFoundation } from './foundation';
import { useTag, useClassNames, mergeRefs } from '@rmwc/base/component';

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
  label?: React.ReactNode;
  /** makes the Chip appear selected. */
  selected?: boolean;
  /** Instance of an Icon Component. */
  icon?: RMWC.IconPropT;
  /** Instance of an Icon Component. */
  trailingIcon?: RMWC.IconPropT;
  /** An optional chip ID that will be included in callback evt.detail. If this is not passed, RMWC will attempt to use the "key" prop if present.  */
  id?: string;
  /** Includes an optional checkmark for the chips selected state. */
  checkmark?: boolean;
  /** Additional children will be rendered in the text area. */
  children?: React.ReactNode;
  /** A callback for click or enter key. This should be used over onClick for accessibility reasons. evt.detail = { chipId: string }  */
  onInteraction?: (evt: ChipOnInteractionEventT) => void;
  /** A callback for click or enter key for the trailing icon. material-components-web always treats this as an intent to remove the chip. evt.detail = { chipId: string } */
  onTrailingIconInteraction?: (
    evt: ChipOnTrailingIconInteractionEventT
  ) => void;
  /** A callback that is fired once the chip is in an exited state from removing it. evt.detail = { chipId: string } */
  onRemove?: (evt: ChipOnRemoveEventT) => void;
}

/** A Chip component. */
export const Chip = withRipple()(
  React.forwardRef<any, ChipProps & RMWC.ComponentProps>(function Chip(
    props,
    ref
  ) {
    const {
      onInteraction,
      onTrailingIconInteraction,
      onRemove,
      onSelect,
      icon,
      trailingIcon,
      checkmark,
      label,
      children,
      selected,
      ...rest
    } = props;

    const { rootEl, checkmarkEl, trailingIconEl } = useChipFoundation(props);

    const Tag = useTag(props, 'button');

    const className = useClassNames(props, [
      'mdc-chip',
      {
        'mdc-chip--selected': selected
      }
    ]);

    return (
      <Tag
        tabIndex={0}
        {...rootEl.props({ ...rest, className })}
        ref={mergeRefs(ref, rootEl.setRef)}
      >
        {!!icon && (
          <ChipIcon icon={icon} leading hidden={selected && checkmark} />
        )}
        {!!checkmark && <ChipCheckmark ref={checkmarkEl.setRef} />}
        <div className="mdc-chip__text">
          {label}
          {children}
        </div>
        {!!trailingIcon && (
          <ChipIcon
            icon={trailingIcon}
            trailing
            {...trailingIconEl.props({})}
          />
        )}
      </Tag>
    );
  })
);

Chip.displayName = 'Chip';

/*********************************************************************
 * Bits
 *********************************************************************/

/** A checkmark for chip selection and filtering. */
const ChipCheckmark = React.memo(
  React.forwardRef<HTMLDivElement>(function ChipCheckmark(props, ref) {
    return (
      <div ref={ref} className="mdc-chip__checkmark">
        <svg className="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
          <path
            className="mdc-chip__checkmark-path"
            fill="none"
            stroke="black"
            d="M1.73,12.91 8.1,19.28 22.79,4.59"
          />
        </svg>
      </div>
    );
  })
);

interface ChipIconProps extends IconProps {
  /** Make it a leading icon */
  leading?: boolean;
  /** Make it a trailing icon */
  trailing?: boolean;
}

/** Icons inside of a chip. This is an instance of the Icon component. To make the icons interactive, add props tabIndex="0" and role="button". */
const ChipIcon = React.memo(function ChipIcon(
  props: ChipIconProps & React.HTMLProps<any>
) {
  const { leading, trailing, hidden, ...rest } = props;
  const className = useClassNames(props, [
    'mdc-chip__icon',
    {
      'mdc-chip__icon--leading': leading,
      'mdc-chip__icon--leading-hidden': hidden,
      'mdc-chip__icon--trailing': trailing
    }
  ]);
  const hasInteractionHandler = Object.keys(props).some(p =>
    p.startsWith('on')
  );
  const trailingProps =
    props.trailing || hasInteractionHandler
      ? { role: 'button', tabIndex: 0 }
      : {};

  return <Icon {...trailingProps} {...rest} className={className} />;
});

ChipIcon.displayName = 'ChipIcon';

/*********************************************************************
 * Chip Set
 *********************************************************************/

/** A container for multiple chips. */
export interface ChipSetProps {
  /** Creates a choice chipset */
  choice?: boolean;
  /** Creates a filter chipset */
  filter?: boolean;
}

/** A container for multiple chips. */
export const ChipSet = React.forwardRef<
  HTMLDivElement,
  ChipSetProps & RMWC.ComponentProps
>(function ChipSet(props, ref) {
  const { choice, filter, ...rest } = props;

  const Tag = useTag(props);

  const className = useClassNames(props, [
    'mdc-chip-set',
    {
      'mdc-chip-set--choice': choice,
      'mdc-chip-set--filter': filter
    }
  ]);

  return <Tag {...rest} ref={ref} className={className} />;
});

ChipSet.displayName = 'ChipSet';

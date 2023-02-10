import React from 'react';
import * as RMWC from '@rmwc/types';
import { createComponent, Tag, useClassNames } from '@rmwc/base';
import { useChipSetFoundation } from './foundation';

/*********************************************************************
 * Chip Set
 *********************************************************************/

/** A container for multiple chips. */
export interface ChipSetProps {
  /** Causes the chis to overflow instead of wrap (their default behavior). */
  overflow?: boolean;
  /** */
  role?: 'grid' | 'listbox';
}

export type ChipSetHTMLProps = RMWC.HTMLProps<
  HTMLDivElement,
  Omit<React.AllHTMLAttributes<HTMLDivElement>, 'label'>
>;

/** A container for multiple chips. */
export const ChipSet: RMWC.ComponentType<
  ChipSetProps,
  ChipSetHTMLProps,
  'div'
> = createComponent<ChipSetProps, ChipSetHTMLProps>(function ChipSet(
  props,
  ref
) {
  const { rootEl } = useChipSetFoundation(props);

  const { overflow, role = 'grid', ...rest } = props;

  const className = useClassNames(props, [
    'mdc-evolution-chip-set',
    {
      'mdc-evolution-chip-set--overlow': overflow
    }
  ]);

  const otherProps = {
    'aria-orientation': 'horizontal'
  };

  return (
    <Tag
      tag="span"
      element={rootEl}
      {...rest}
      ref={ref}
      className={className}
      role={role}
      {...(role === 'listbox' && otherProps)}
    >
      <span className="mdc-evolution-chip-set__chips" role="presentation">
        {props.children}
      </span>
    </Tag>
  );
});

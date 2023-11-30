import React, { useRef } from 'react';
import * as RMWC from '@rmwc/types';
import { createComponent, Tag, useClassNames } from '@rmwc/base';
import { useChipSetFoundation } from './foundation';
import { ChipContext, ChipContextT } from '../chip-context';

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
> = createComponent<ChipSetProps, ChipSetHTMLProps>(
  function ChipSet(props, ref) {
    const { rootEl, registerChip, unregisterChip } =
      useChipSetFoundation(props);

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

    const contextApi = useRef<ChipContextT>({
      registerChip,
      unregisterChip
    });

    return (
      <ChipContext.Provider value={contextApi.current}>
        <Tag
          {...rest}
          tag="span"
          ref={ref}
          className={className}
          role={role}
          element={rootEl}
          {...(role === 'listbox' && otherProps)}
        >
          <span className="mdc-evolution-chip-set__chips" role="presentation">
            {props.children}
          </span>
        </Tag>
      </ChipContext.Provider>
    );
  }
);

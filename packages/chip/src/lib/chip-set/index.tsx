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
  /** Creates a action chipset. */
  action?: boolean;
  /** Creates a input chipset. */
  input?: boolean;
  /** Creates a filter chipset. */
  filter?: boolean;
  /** Determines whether chipset should be multiple-select or single-select. This is only supported for filter chips. */
  multipleSelect?: boolean;
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

    const {
      overflow,
      action = true,
      input,
      filter,
      multipleSelect,
      ...rest
    } = props;

    const className = useClassNames(props, [
      'mdc-evolution-chip-set',
      {
        'mdc-evolution-chip-set--overlow': overflow
      }
    ]);

    const otherProps = {
      'aria-orientation': 'horizontal',
      'aria-multiselectable': multipleSelect
    };

    const contextApi = useRef<ChipContextT>({
      registerChip,
      unregisterChip,
      action,
      input,
      filter
    });

    return (
      <ChipContext.Provider value={contextApi.current}>
        <Tag
          className={className}
          tag="span"
          role={filter ? 'listbox' : 'grid'}
          element={rootEl}
          {...(filter && otherProps)}
          {...rest}
          ref={ref}
        >
          <span className="mdc-evolution-chip-set__chips" role="presentation">
            {props.children}
          </span>
        </Tag>
      </ChipContext.Provider>
    );
  }
);

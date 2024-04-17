import React, { useRef } from 'react';
import * as RMWC from '@rmwc/types';
import { createComponent, Tag, useClassNames } from '@rmwc/base';
import { useChipSetEvolutionFoundation } from './foundation';
import {
  ChipEvolutionContext,
  ChipEvolutionContextT
} from '../chip-evolution-context';

/*********************************************************************
 * Evolution Chip Set
 *********************************************************************/

/** A container for multiple chips. */
export interface ChipSetEvolutionProps {
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

export type ChipSetEvolutionHTMLProps = RMWC.HTMLProps<
  HTMLDivElement,
  Omit<React.AllHTMLAttributes<HTMLDivElement>, 'label'>
>;

/** A container for multiple chips. */
export const ChipSetEvolution: RMWC.ComponentType<
  ChipSetEvolutionProps,
  ChipSetEvolutionHTMLProps,
  'div'
> = createComponent<ChipSetEvolutionProps, ChipSetEvolutionHTMLProps>(
  function ChipSetEvolution(props, ref) {
    const { rootEl, registerChip, unregisterChip } =
      useChipSetEvolutionFoundation(props);

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

    const contextApi = useRef<ChipEvolutionContextT>({
      registerChip,
      unregisterChip,
      action,
      input,
      filter
    });

    return (
      <ChipEvolutionContext.Provider value={contextApi.current}>
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
      </ChipEvolutionContext.Provider>
    );
  }
);

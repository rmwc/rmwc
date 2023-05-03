import React from 'react';
import { createComponent, Tag } from '@rmwc/base';
import { MDCChipTrailingActionFoundation } from '@material/chips';

/*********************************************************************
 * Trailing Action
 *********************************************************************/

export interface TrailingActionApi {
  getFoundation: () => MDCChipTrailingActionFoundation;
}

export interface TrailingActionProps {
  apiRef?: (api: TrailingActionApi | null) => void;
  isNavigable?: boolean;
  icon: string;
}

/** The trailing action is used in removable input chips.
 * It is a subcomponent of the chips and intended only for use in the context of a chip. */
export const TrailingAction = createComponent<TrailingActionProps>(
  function TrailingAction(props, ref) {
    return (
      <Tag
        tag="buton"
        className="mdc-deprecated-chip-trailing-action"
        aria-hidden={props.isNavigable}
        ref={ref}
      >
        <span className="mdc-deprecated-chip-trailing-action__ripple"></span>
        <span className="mdc-deprecated-chip-trailing-action__icon material-icons">
          {props.icon}
        </span>
      </Tag>
    );
  }
);

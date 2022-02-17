import React from 'react';
import { createComponent } from '@rmwc/base';
import { MDCChipTrailingActionFoundation } from '@material/chips';

/*********************************************************************
 * Trailing Action
 *********************************************************************/

// export interface TrailingActionProps {
//   isNavigable?: boolean;
// }

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
  function TrailingAction(props) {
    return (
      <button
        className="mdc-chip-trailing-action"
        aria-hidden={props.isNavigable}
      >
        <span className="mdc-chip-trailing-action__ripple"></span>
        <span className="mdc-chip-trailing-action__icon material-icons">
          {props.icon}
        </span>
      </button>
    );
  }
);

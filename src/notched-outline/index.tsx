import * as RMWC from '@rmwc/types';
import React from 'react';
import { useNotchedOutlineFoundation } from './foundation';
import { createComponent } from '@rmwc/base';

export interface NotchedOutlineProps {
  notch?: number;
}

/*********************************************************************
 * Notched Outline
 *********************************************************************/

export const NotchedOutline = createComponent<NotchedOutlineProps>(
  function NotchedOutline(props) {
    const { children, ...rest } = props;
    const { rootEl, notchedEl } = useNotchedOutlineFoundation(props);

    return (
      <div
        {...rootEl.props({
          ...rest,
          className: 'mdc-notched-outline'
        })}
        ref={rootEl.setRef}
      >
        <NotchedOutlineLeading />
        <div
          {...notchedEl.props({
            className: 'mdc-notched-outline__notch'
          })}
          ref={notchedEl.setRef}
        >
          {children}
        </div>
        <NotchedOutlineTrailing />
      </div>
    );
  }
);

/*********************************************************************
 * Bits
 *********************************************************************/

const NotchedOutlineLeading = React.memo(function NotchedOutlineLeading() {
  return <div className="mdc-notched-outline__leading" />;
});

const NotchedOutlineTrailing = React.memo(function NotchedOutlineTrailing() {
  return <div className="mdc-notched-outline__trailing" />;
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as RMWC from '@rmwc/types';
import React from 'react';
import { useNotchedOutlineFoundation } from './foundation';
import { createComponent, Tag } from '@rmwc/base';

export interface NotchedOutlineProps {
  notch?: number;
}

/*********************************************************************
 * Notched Outline
 *********************************************************************/

export const NotchedOutline = createComponent<NotchedOutlineProps>(
  function NotchedOutline(props, ref) {
    const { children, ...rest } = props;
    const { rootEl, notchedEl } = useNotchedOutlineFoundation(props);

    return (
      <Tag
        {...rest}
        element={rootEl}
        className={'mdc-notched-outline'}
        ref={ref}
      >
        <NotchedOutlineLeading />
        <div
          {...notchedEl.props({
            className: 'mdc-notched-outline__notch'
          })}
          ref={notchedEl.reactRef}
        >
          {children}
        </div>
        <NotchedOutlineTrailing />
      </Tag>
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

import * as RMWC from '@rmwc/types';
import React, { useContext } from 'react';

import { withRipple } from '@rmwc/ripple';
import { Tag, useClassNames, createComponent } from '@rmwc/base';

/*********************************************************************
 * TouchTargetWrapper
 *********************************************************************/

/**
 * The ButTouchTargetWrapperon component.
 */
export interface TouchTargetWrapperProps {
  /** Content specified as children. */
  children?: React.ReactNode;
}

export type TouchTargetWrapperHTMLProps = RMWC.HTMLProps<HTMLDivElement>;

const TouchTargetWrapperContext = React.createContext(false);

export const useIsWrappedTouchTarget = (consumerValue?: boolean): boolean => {
  const ctxValue = useContext(TouchTargetWrapperContext);
  return ctxValue || consumerValue || false;
};

/**
 * The TouchTargetWrapper component.
 */
export const TouchTargetWrapper: RMWC.ComponentType<
  TouchTargetWrapperProps,
  TouchTargetWrapperHTMLProps,
  'button'
> = withRipple({
  surface: false
})(
  createComponent<TouchTargetWrapperProps, TouchTargetWrapperHTMLProps>(
    function TouchTargetWrapper(props, ref) {
      const { children, ...rest } = props;
      const className = useClassNames(props, ['mdc-touch-target-wrapper']);

      return (
        <Tag tag="div" {...rest} ref={ref} className={className}>
          <TouchTargetWrapperContext.Provider value={true}>
            {children}
          </TouchTargetWrapperContext.Provider>
        </Tag>
      );
    }
  )
);

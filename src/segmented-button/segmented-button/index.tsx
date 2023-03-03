import * as RMWC from '@rmwc/types';
import React, { useRef } from 'react';

import { withRipple } from '@rmwc/ripple';
import { Tag, useClassNames, createComponent } from '@rmwc/base';
import { useSegmentedButtonFoundation } from './foundation';
import {
  SegmentedButtonContextT,
  SegmentedButtonProvider
} from '../segmented-button-context';

/*********************************************************************
 * Segmented Button
 *********************************************************************/

export type SegmentedButtonChangeEventT = RMWC.CustomEventT<{
  index: number;
}>;

export interface SegmentedButtonProps {
  /** Determines whether the user is able to select multiple or a single button at a time. Default to multiple. */
  selectType?: 'multiple' | 'single';
}

export type SegmentedButtonPropsHTMLProps = RMWC.HTMLProps<HTMLDivElement>;

export const SegmentedButton: RMWC.ComponentType<
  SegmentedButtonProps,
  SegmentedButtonPropsHTMLProps,
  'div'
> = withRipple({
  surface: false
})(
  createComponent<SegmentedButtonProps, SegmentedButtonPropsHTMLProps>(
    function SegmentedButton(props, ref) {
      const { children, selectType = 'multiple', ...rest } = props;

      const { rootEl, registerSegment, unregisterSegment } =
        useSegmentedButtonFoundation(props);

      const className = useClassNames(props, [
        'mdc-segmented-button',
        {
          'mdc-segmented-button--single-select': selectType === 'single'
        }
      ]);

      const contextApi = useRef<SegmentedButtonContextT>({
        registerSegment,
        unregisterSegment,
        selectType: selectType
      });

      return (
        <SegmentedButtonProvider value={contextApi.current}>
          <Tag
            {...rest}
            element={rootEl}
            tag="div"
            className={className}
            role={selectType === 'multiple' ? 'group' : 'radiogroup'}
            ref={ref}
          >
            {children}
          </Tag>
        </SegmentedButtonProvider>
      );
    }
  )
);

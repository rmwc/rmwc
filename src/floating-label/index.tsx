import * as RMWC from '@rmwc/types';
import React from 'react';
import { useFloatingLabelFoundation } from './foundation';

export interface FloatingLabelProps {
  shake?: boolean;
  float?: boolean;
}

export interface FloatingLabelApi {
  getWidth: () => number;
}

export const FloatingLabel = React.forwardRef<
  any,
  FloatingLabelProps &
    RMWC.ComponentProps & { apiRef?: (api: FloatingLabelApi) => void }
>(function FloatingLabel(props, ref) {
  const { rootEl } = useFloatingLabelFoundation(props);
  const { shake, float, apiRef, ...rest } = props;
  return (
    <label
      {...rootEl.props({ ...rest, className: 'mdc-floating-label' })}
      ref={rootEl.setRef}
    />
  );
});
FloatingLabel.displayName = 'FloatingLabel';

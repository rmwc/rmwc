import * as RMWC from '@rmwc/types';
import React from 'react';
import { useFloatingLabelFoundation } from './foundation';
import { createComponent, mergeRefs } from '@rmwc/base';

export interface FloatingLabelProps {
  shake?: boolean;
  float?: boolean;
}

export interface FloatingLabelApi {
  getWidth: () => number;
}

export const FloatingLabel = createComponent<
  FloatingLabelProps & { apiRef?: (api: FloatingLabelApi) => void }
>(function FloatingLabel(props, ref) {
  const { rootEl } = useFloatingLabelFoundation(props);
  const { shake, float, apiRef, ...rest } = props;
  return (
    <span
      {...rootEl.props({ ...rest, className: 'mdc-floating-label' })}
      ref={mergeRefs(rootEl.setRef, ref)}
    />
  );
});

import * as RMWC from '@rmwc/types';
import React from 'react';
import { useLineRippleFoundation } from './foundation';
import { createComponent, Tag } from '@rmwc/base';

export interface LineRippleProps {
  active?: boolean;
  center?: number;
}

export const LineRipple = createComponent<LineRippleProps>(function LineRipple(
  props,
  ref
) {
  const { active, center, ...rest } = props;
  const { rootEl } = useLineRippleFoundation(props);

  return (
    <Tag
      {...rest}
      tag="span"
      element={rootEl}
      className="mdc-line-ripple"
      ref={ref}
    />
  );
});

import * as RMWC from '@rmwc/types';
import React from 'react';
import { useLineRippleFoundation } from './foundation';

export interface LineRippleProps {
  active?: boolean;
  center?: number;
}

export function LineRipple(props: LineRippleProps & RMWC.ComponentProps) {
  const { active, center, ...rest } = props;
  const { rootEl } = useLineRippleFoundation(props);

  return (
    <div
      {...rootEl.props({
        ...rest,
        className: 'mdc-line-ripple'
      })}
      ref={rootEl.setRef}
    />
  );
}

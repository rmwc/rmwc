// @flow
import * as React from 'react';

export const NotchedOutline = () => (
  <div className="mdc-notched-outline">
    <svg>
      <path className="mdc-notched-outline__path" />
    </svg>
  </div>
);

export const NotchedOutlineIdle = ({ ...rest }: {}) => (
  <div {...rest} className="mdc-notched-outline__idle" />
);

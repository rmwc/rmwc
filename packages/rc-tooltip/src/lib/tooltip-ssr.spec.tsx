// @vitest-environment node
import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { RCTooltip } from './rc-tooltip';

describe('Tooltip SSR', () => {
  it('renders', () => {
    mount(
      <RCTooltip content="tooltip">
        <span>test</span>
      </RCTooltip>
    );
  });
});

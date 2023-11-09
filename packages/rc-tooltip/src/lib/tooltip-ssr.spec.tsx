// @vitest-environment node
import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { Tooltip } from './tooltip';

describe('Tooltip SSR', () => {
  it('renders', () => {
    mount(
      <Tooltip content="tooltip">
        <span>test</span>
      </Tooltip>
    );
  });
});

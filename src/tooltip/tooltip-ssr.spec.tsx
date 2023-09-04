/**
 * @jest-environment node
 */
import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { Tooltip } from './';

describe('Tooltip SSR', () => {
  it('renders', () => {
    mount(
      <Tooltip overlay="tooltip">
        <span>test</span>
      </Tooltip>
    );
  });
});

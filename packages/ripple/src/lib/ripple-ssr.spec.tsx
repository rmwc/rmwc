/**
 * @jest-environment node
 */
import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { Ripple } from './ripple';

describe('Ripple SSR', () => {
  it('renders', () => {
    mount(
      <Ripple>
        <div />
      </Ripple>
    );
  });
});

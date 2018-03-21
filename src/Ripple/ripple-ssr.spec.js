/**
 * @jest-environment node
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Ripple } from './';

describe('Ripple SSR', () => {
  it('renders', () => {
    renderToString(
      <Ripple>
        <div />
      </Ripple>
    );
  });
});

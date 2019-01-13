/**
 * @jest-environment node
 */
import * as React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { Ripple } from './';

describe('Ripple SSR', () => {
  it('renders', () => {
    mount(
      <Ripple>
        <div />
      </Ripple>
    );
  });
});

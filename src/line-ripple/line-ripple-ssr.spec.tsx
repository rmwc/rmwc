/**
 * @jest-environment node
 */

import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { LineRipple } from './';

describe('LineRipple SSR', () => {
  it('renders', () => {
    mount(<LineRipple />);
  });
});

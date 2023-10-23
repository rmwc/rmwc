import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { FloatingLabel } from './floating-label';

describe('FloatingLabel SSR', () => {
  it('renders', () => {
    mount(<FloatingLabel />);
  });
});

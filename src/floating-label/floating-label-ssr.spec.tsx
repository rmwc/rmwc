import * as React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { FloatingLabel } from './';

describe('FloatingLabel SSR', () => {
  it('renders', () => {
    mount(<FloatingLabel />);
  });
});

// @vitest-environment node
import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { TextField } from './textfield';

describe('TextField SSR', () => {
  it('renders', () => {
    mount(<TextField />);
  });
});

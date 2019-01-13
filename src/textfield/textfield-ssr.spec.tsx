/**
 * @jest-environment node
 */
import * as React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { TextField } from './';

describe('TextField SSR', () => {
  it('renders', () => {
    mount(<TextField />);
  });
});

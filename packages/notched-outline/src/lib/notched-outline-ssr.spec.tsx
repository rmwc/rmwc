/**
 * @jest-environment node
 */
import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { NotchedOutline } from './notched-outline';

describe('NotchedOutline SSR', () => {
  it('renders', () => {
    mount(<NotchedOutline />);
  });
});

/**
 * @jest-environment node
 */
import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { NotchedOutline } from './';

describe('NotchedOutline SSR', () => {
  it('renders', () => {
    mount(<NotchedOutline />);
  });
});

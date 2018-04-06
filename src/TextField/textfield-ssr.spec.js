/**
 * @jest-environment node
 */
import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { TextField } from './';

describe('Select SSR', () => {
  it('renders', () => {
    mount(<TextField />);
  });
});

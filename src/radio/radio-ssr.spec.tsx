/**
 * @jest-environment node
 */
import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { Radio } from './';

describe('Radio SSR', () => {
  test('renders', () => {
    mount(<Radio />);
  });
});

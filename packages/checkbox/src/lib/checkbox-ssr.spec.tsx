/**
 * @jest-environment node
 */
import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { Checkbox } from './checkbox';

describe('Checkbox SSR', () => {
  test('renders', () => {
    mount(<Checkbox />);
  });
});

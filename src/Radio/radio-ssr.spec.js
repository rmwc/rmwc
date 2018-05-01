/**
 * @jest-environment node
 */
import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import Radio from './';

describe('Checkbox', () => {
  test('renders', () => {
    mount(<Radio />);
  });
});

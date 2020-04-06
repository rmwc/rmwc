/**
 * @jest-environment node
 */
import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { Select } from './';

describe('Select SSR', () => {
  it('renders', () => {
    mount(
      <Select
        placeholder="Select a food"
        options={{ 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' }}
      />
    );
  });
});

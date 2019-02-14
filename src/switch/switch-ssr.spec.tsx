/**
 * @jest-environment node
 */
import * as React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { Switch } from './';

describe('Switch SSR', () => {
  test('renders', () => {
    mount(<Switch />);
  });
});

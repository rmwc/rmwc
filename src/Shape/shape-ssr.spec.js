/**
 * @jest-environment node
 */
import * as React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { ShapeContainer } from './';

describe('ShapeContainer SSR', () => {
  test('renders', () => {
    mount(<ShapeContainer corner="10" backgroundColor="red" />);
  });
});

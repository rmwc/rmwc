/**
 * @jest-environment node
 */
import * as React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { Typography } from './';

describe('Typography SSR', () => {
  it('renders', () => {
    mount(<Typography use="body1" />);
  });
});

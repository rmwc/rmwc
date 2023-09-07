/**
 * @jest-environment node
 */
import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { Typography } from './typography';

describe('Typography SSR', () => {
  it('renders', () => {
    mount(<Typography use="body1" />);
  });
});

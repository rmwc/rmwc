/**
 * @jest-environment node
 */
import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { LinearProgress } from './';

describe('LinearProgress SSR', () => {
  it('renders', () => {
    mount(<LinearProgress progress={0.5} />);
  });
});

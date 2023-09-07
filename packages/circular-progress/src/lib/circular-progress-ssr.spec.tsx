/**
 * @jest-environment node
 */

import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { CircularProgress } from './circular-progress';

describe('Button', () => {
  it('renders', () => {
    mount(<CircularProgress />);
  });
});

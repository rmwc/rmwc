/**
 * @jest-environment node
 */

import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { TouchTargetWrapper } from './touch-target';

describe('TouchTarget SSR', () => {
  it('renders', () => {
    mount(<TouchTargetWrapper>TouchTargetWrapper</TouchTargetWrapper>);
  });
});

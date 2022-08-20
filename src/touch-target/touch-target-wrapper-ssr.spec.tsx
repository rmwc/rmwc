/**
 * @jest-environment node
 */

import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { TouchTargetWrapper } from '.';

describe('TouchTarget SSR', () => {
  it('renders', () => {
    mount(<TouchTargetWrapper>TouchTargetWrapper</TouchTargetWrapper>);
  });
});

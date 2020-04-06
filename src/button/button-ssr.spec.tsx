/**
 * @jest-environment node
 */

import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { Button } from './';

describe('Button SSR', () => {
  it('renders', () => {
    mount(<Button icon="favorite">Button</Button>);
  });
});

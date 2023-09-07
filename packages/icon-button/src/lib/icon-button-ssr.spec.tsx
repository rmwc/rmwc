/**
 * @jest-environment node
 */
import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { IconButton } from './icon-button';

describe('IconButton SSR', () => {
  it('renders', () => {
    mount(<IconButton onIcon="favorite" icon="favorite_border" />);
  });

  it('renders controlled', () => {
    mount(<IconButton checked onIcon="favorite" icon="favorite_border" />);
  });
});

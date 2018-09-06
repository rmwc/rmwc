/**
 * @jest-environment node
 */
import * as React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { IconButton } from './';

describe('IconButton SSR', () => {
  it('renders', () => {
    mount(
      <IconButton
        on={{ label: 'Remove from favorites', content: 'favorite' }}
        off={{ label: 'Add to favorites', content: 'favorite_border' }}
      />
    );
  });

  it('renders controlled', () => {
    mount(
      <IconButton
        checked
        on={{ label: 'Remove from favorites', content: 'favorite' }}
        off={{ label: 'Add to favorites', content: 'favorite_border' }}
      />
    );
  });
});

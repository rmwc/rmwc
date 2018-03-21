/**
 * @jest-environment node
 */
import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { IconToggle } from './';

describe('IconToggle SSR', () => {
  it('renders', () => {
    mount(
      <IconToggle
        on={{ label: 'Remove from favorites', content: 'favorite' }}
        off={{ label: 'Add to favorites', content: 'favorite_border' }}
      />
    );
  });

  it('renders controlled', () => {
    mount(
      <IconToggle
        checked
        on={{ label: 'Remove from favorites', content: 'favorite' }}
        off={{ label: 'Add to favorites', content: 'favorite_border' }}
      />
    );
  });
});

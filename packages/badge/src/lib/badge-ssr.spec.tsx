/**
 * @jest-environment node
 */
import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { Badge, BadgeAnchor } from './badge';

describe('Badge SSR', () => {
  it('renders', () => {
    mount(
      <BadgeAnchor>
        <Badge />
      </BadgeAnchor>
    );
  });
});

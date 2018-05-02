/**
 * @jest-environment node
 */
import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { MenuAnchor, Menu, MenuItem, SimpleMenu } from './';

describe('Menu', () => {
  it('renders', () => {
    mount(
      <MenuAnchor>
        <button>Test</button>

        <Menu open onClose={() => {}}>
          <MenuItem>Cookies</MenuItem>
          <MenuItem>Pizza</MenuItem>
          <MenuItem>Icecream</MenuItem>
        </Menu>
      </MenuAnchor>
    );
  });

  it('SimpleMenu renders', () => {
    mount(
      <SimpleMenu handle={<button>Test</button>}>
        <MenuItem>Cookies</MenuItem>
        <MenuItem>Pizza</MenuItem>
        <MenuItem>Icecream</MenuItem>
      </SimpleMenu>
    );
  });
});

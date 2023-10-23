// @vitest-environment node
import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { Menu, MenuItem, MenuSurfaceAnchor, SimpleMenu } from './';

describe('Menu', () => {
  it('renders', () => {
    mount(
      <MenuSurfaceAnchor>
        <button>Test</button>

        <Menu open onClose={() => {}}>
          <MenuItem>Cookies</MenuItem>
          <MenuItem>Pizza</MenuItem>
          <MenuItem>Icecream</MenuItem>
        </Menu>
      </MenuSurfaceAnchor>
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

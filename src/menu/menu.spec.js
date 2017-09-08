import React from 'react';
import { mount } from 'enzyme';
import { MenuAnchor, Menu, MenuItem } from './menu';

describe('Menu', () => {
  it('renders', () => {
    mount(
      <MenuAnchor>
        <button>Test</button>

        <Menu open={true} onClose={() => {}}>
          <MenuItem>Cookies</MenuItem>
          <MenuItem>Pizza</MenuItem>
          <MenuItem>Icecream</MenuItem>
        </Menu>
      </MenuAnchor>
    );
  });
});

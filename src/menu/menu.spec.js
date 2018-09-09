import * as React from 'react';
import { mount } from 'enzyme';
import {
  MenuSurfaceAnchor,
  Menu,
  MenuSurface,
  MenuItem,
  SimpleMenu,
  SimpleMenuSurface
} from './';

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

  it('can be fixed', () => {
    const el = mount(
      <MenuSurfaceAnchor>
        <button>Test</button>

        <Menu open fixed>
          <MenuItem>Cookies</MenuItem>
          <MenuItem>Pizza</MenuItem>
          <MenuItem>Icecream</MenuItem>
        </Menu>
      </MenuSurfaceAnchor>
    );

    expect(el.html().includes('mdc-menu-surface--fixed')).toBe(true);
  });

  it('MenuSurface renders', () => {
    mount(
      <MenuSurfaceAnchor>
        <button>Test</button>

        <MenuSurface open onClose={() => {}}>
          <MenuItem>Cookies</MenuItem>
          <MenuItem>Pizza</MenuItem>
          <MenuItem>Icecream</MenuItem>
        </MenuSurface>
      </MenuSurfaceAnchor>
    );
  });

  it('SimpleMenu renders', () => {
    let val = 0;

    const el = mount(
      <SimpleMenu handle={<button>Test</button>} open onClose={() => val++}>
        <MenuItem>Cookies</MenuItem>
        <MenuItem>Pizza</MenuItem>
        <MenuItem>Icecream</MenuItem>
      </SimpleMenu>
    );

    el.find(Menu)
      .instance()
      .menuSurface_.foundation_.adapter_.notifyClose();
    expect(val).toBe(1);
  });

  it('SimpleMenuSurface renders', () => {
    let val = 0;

    const el = mount(
      <SimpleMenuSurface
        handle={<button>Test</button>}
        open
        onClose={() => val++}
      />
    );

    el.find(MenuSurface)
      .instance()
      .foundation_.adapter_.notifyClose();
    expect(val).toBe(1);
  });

  it('can have custom classnames', () => {
    [MenuSurfaceAnchor, Menu, MenuItem].forEach(Component => {
      const el = mount(<Component className={'my-custom-classname'} />);
      expect(!!~el.html().search('my-custom-classname')).toEqual(true);
    });
  });
});

import * as React from 'react';
import { mount } from 'enzyme';
import { MenuSurfaceAnchor, Menu, MenuItem, SimpleMenu } from './';

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
    let val = 0;

    const el = mount(
      <SimpleMenu handle={<button>Test</button>} open onClose={() => val++}>
        <MenuItem>Cookies</MenuItem>
        <MenuItem>Pizza</MenuItem>
        <MenuItem>Icecream</MenuItem>
      </SimpleMenu>
    );

    el
      .find(Menu)
      .instance()
      .menuSurface_.foundation_.adapter_.notifyClose();
    expect(val).toBe(1);
  });

  it('can have custom classnames', () => {
    [MenuSurfaceAnchor, Menu, MenuItem].forEach(Component => {
      const el = mount(<Component className={'my-custom-classname'} />);
      expect(!!~el.html().search('my-custom-classname')).toEqual(true);
    });
  });
});

import * as React from 'react';
import { mount } from 'enzyme';
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
      .foundation_.adapter_.notifyCancel();
    expect(val).toBe(1);
  });

  it('can have custom classnames', () => {
    [MenuAnchor, Menu, MenuItem].forEach(Component => {
      const el = mount(<Component className={'my-custom-classname'} />);
      expect(!!~el.html().search('my-custom-classname')).toEqual(true);
    });
  });
});

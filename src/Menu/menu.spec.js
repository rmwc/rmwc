import React from 'react';
import { mount } from 'enzyme';
import { MenuAnchor, SimpleMenu, MenuItem } from './';

describe('Menu', () => {
  it('renders', () => {
    mount(
      <MenuAnchor>
        <button>Test</button>

        <SimpleMenu open onClose={() => {}}>
          <MenuItem>Cookies</MenuItem>
          <MenuItem>Pizza</MenuItem>
          <MenuItem>Icecream</MenuItem>
        </SimpleMenu>
      </MenuAnchor>
    );
  });

  it('can have custom classnames', () => {
    [MenuAnchor, SimpleMenu, MenuItem].forEach(Component => {
      const el = mount(<Component className={'my-custom-classname'} />);
      expect(!!~el.html().search('my-custom-classname')).toEqual(true);
    });
  });
});

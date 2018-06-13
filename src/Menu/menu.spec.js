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
    mount(
      <SimpleMenu handle={<button>Test</button>}>
        <MenuItem>Cookies</MenuItem>
        <MenuItem>Pizza</MenuItem>
        <MenuItem>Icecream</MenuItem>
      </SimpleMenu>
    );
  });

  it('can have custom classnames', () => {
    [MenuAnchor, Menu, MenuItem].forEach(Component => {
      const el = mount(<Component className={'my-custom-classname'} />);
      expect(!!~el.html().search('my-custom-classname')).toEqual(true);
    });
  });
});

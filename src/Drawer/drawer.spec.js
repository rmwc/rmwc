import React from 'react';
import { mount } from 'enzyme';
import { Drawer, DrawerContent, DrawerHeader } from './';

describe('Drawer', () => {
  it('permanent Drawer renders', () => {
    mount(
      <Drawer>
        <DrawerHeader />
        <DrawerContent />
      </Drawer>
    );
  });

  it('can have custom classnames', () => {
    [Drawer, DrawerHeader, DrawerContent].forEach(Component => {
      const el = mount(<Component className={'my-custom-classname'} />);
      expect(!!~el.html().search('my-custom-classname')).toEqual(true);
    });
  });
});

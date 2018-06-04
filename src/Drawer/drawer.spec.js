import React from 'react';
import { mount } from 'enzyme';
import { Drawer, DrawerContent, DrawerHeader } from './';

describe('Drawer', () => {
  it('permanent Drawer renders', () => {
    mount(
      <Drawer permanent>
        <DrawerHeader />
        <DrawerContent />
      </Drawer>
    );
  });

  it('persistent Drawer renders', () => {
    mount(
      <Drawer persistent>
        <DrawerHeader />
        <DrawerContent />
      </Drawer>
    );
  });

  it('temporary Drawer renders', () => {
    mount(
      <Drawer temporary>
        <DrawerHeader />
        <DrawerContent />
      </Drawer>
    );
  });

  it('can open', done => {
    const el = mount(
      <Drawer persistent>
        <DrawerHeader />
        <DrawerContent />
      </Drawer>
    );

    el.setProps({ open: true });

    setTimeout(() => {
      expect(el.html().includes('mdc-drawer--open')).toBe(true);
      done();
    });
  });
  it('can have custom classnames', () => {
    [Drawer, DrawerHeader, DrawerContent].forEach(Component => {
      const el = mount(<Component className={'my-custom-classname'} />);
      expect(!!~el.html().search('my-custom-classname')).toEqual(true);
    });
  });
});

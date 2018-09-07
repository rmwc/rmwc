import * as React from 'react';
import { mount } from 'enzyme';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerSubtitle,
  DrawerScrim,
  DrawerAppContent
} from './';

describe('Drawer', () => {
  it('Drawer renders', () => {
    mount(
      <Drawer>
        <DrawerHeader>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerSubtitle>Subtitle</DrawerSubtitle>
        </DrawerHeader>
        <DrawerContent />
      </Drawer>
    );
  });

  it('dismissible Drawer renders', () => {
    mount(
      <React.Fragment>
        <Drawer dismissible>
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
            <DrawerSubtitle>Subtitle</DrawerSubtitle>
          </DrawerHeader>
          <DrawerContent />
        </Drawer>
        <DrawerAppContent>Test</DrawerAppContent>
      </React.Fragment>
    );
  });

  it('modal Drawer renders', () => {
    mount(
      <React.Fragment>
        <Drawer modal>
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
            <DrawerSubtitle>Subtitle</DrawerSubtitle>
          </DrawerHeader>
          <DrawerContent />
        </Drawer>
        <DrawerScrim />
      </React.Fragment>
    );
  });

  it('can open', done => {
    const el = mount(
      <Drawer dismissible>
        <DrawerHeader>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerSubtitle>Subtitle</DrawerSubtitle>
        </DrawerHeader>
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
    [Drawer, DrawerHeader, DrawerContent, DrawerTitle, DrawerSubtitle].forEach(
      Component => {
        const el = mount(<Component className={'my-custom-classname'} />);
        expect(!!~el.html().search('my-custom-classname')).toEqual(true);
      }
    );
  });
});

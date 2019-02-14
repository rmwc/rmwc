import * as React from 'react';
import { mount } from 'enzyme';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerSubtitle,
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
      (Component: React.ComponentType<any>) => {
        const el = mount(<Component className={'my-custom-classname'} />);
        expect(!!~el.html().search('my-custom-classname')).toEqual(true);
      }
    );
  });

  it('foundation', () => {
    const el1 = mount(<Drawer open dismissible />);
    const el2 = mount(<Drawer open modal />);

    [el1, el2].forEach(el => {
      const inst = el.childAt(0).instance() as any;
      const a = inst.foundation.adapter_;
      const root = el.find('.mdc-drawer');
      root.simulate('keydown');
      root.simulate('transitionend');

      const scrim = el.find('.mdc-drawer-scrim');
      if (scrim.length) {
        scrim.simulate('click');
      }

      a.addClass('foo');
      a.removeClass('foo');
      a.hasClass('foo');
      a.elementHasClass(document.createElement('div'), 'foo');
      a.saveFocus();
      a.restoreFocus();
      a.focusActiveNavigationItem();
      // a.notifyClose();
      // a.notifyOpen();
      a.trapFocus();
      a.releaseFocus();
    });
  });
});

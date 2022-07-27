import React from 'react';
import { render } from '@testing-library/react';
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
    const { asFragment } = render(
      <Drawer>
        <DrawerHeader>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerSubtitle>Subtitle</DrawerSubtitle>
        </DrawerHeader>
        <DrawerContent />
      </Drawer>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('dismissible Drawer renders', () => {
    const { asFragment } = render(
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
    expect(asFragment()).toMatchSnapshot();
  });

  it('modal Drawer renders', () => {
    const { asFragment } = render(
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
    expect(asFragment()).toMatchSnapshot();
  });

  it('can open', () => {
    const { container, rerender } = render(
      <Drawer dismissible>
        <DrawerHeader>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerSubtitle>Subtitle</DrawerSubtitle>
        </DrawerHeader>
        <DrawerContent />
      </Drawer>
    );
    expect(container.firstChild).not.toHaveClass('mdc-drawer--open');

    rerender(
      <Drawer dismissible open>
        <DrawerHeader>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerSubtitle>Subtitle</DrawerSubtitle>
        </DrawerHeader>
        <DrawerContent />
      </Drawer>
    );
    expect(container.firstChild).toHaveClass('mdc-drawer--open');
  });

  it('can have custom classnames', () => {
    [Drawer, DrawerHeader, DrawerContent, DrawerTitle, DrawerSubtitle].forEach(
      (Component: React.ComponentType<any>) => {
        const { container } = render(
          <Component className={'my-custom-classname'} />
        );
        expect(container.firstChild).toHaveClass('my-custom-classname');
      }
    );
  });
});

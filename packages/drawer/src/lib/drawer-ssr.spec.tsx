// @vitest-environment node
import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerSubtitle,
  DrawerTitle
} from './drawer';

describe('Drawer SSR', () => {
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
      <Drawer dismissible>
        <DrawerHeader>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerSubtitle>Subtitle</DrawerSubtitle>
        </DrawerHeader>
        <DrawerContent />
      </Drawer>
    );
  });

  it('modal Drawer renders', () => {
    if (React.Fragment !== undefined) {
      mount(
        <Drawer modal>
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
            <DrawerSubtitle>Subtitle</DrawerSubtitle>
          </DrawerHeader>
          <DrawerContent />
        </Drawer>
      );
    } else {
      mount(
        <Drawer modal>
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
            <DrawerSubtitle>Subtitle</DrawerSubtitle>
          </DrawerHeader>
          <DrawerContent />
        </Drawer>
      );
    }
  });
});

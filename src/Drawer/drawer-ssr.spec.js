/**
 * @jest-environment node
 */
import * as React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { Drawer, DrawerContent, DrawerHeader } from './';

describe('Drawer SSR', () => {
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
});

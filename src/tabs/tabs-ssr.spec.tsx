/**
 * @jest-environment node
 */
import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { TabBar, Tab } from './';

describe('TabBar SSR', () => {
  it('TabBar renders', () => {
    mount(
      <TabBar activeTabIndex={0} onChange={() => {}}>
        <Tab>Test</Tab>
      </TabBar>
    );
  });
});

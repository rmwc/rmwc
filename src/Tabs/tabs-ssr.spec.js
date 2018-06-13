/**
 * @jest-environment node
 */
import * as React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { TabBar, Tab, TabBarScroller } from './';

describe('TabBar SSR', () => {
  it('TabBar renders', () => {
    mount(
      <TabBar activeTabIndex={0} onChange={evt => {}}>
        <Tab>Test</Tab>
      </TabBar>
    );
  });

  it('ScrollTab wtih TabBar renders', () => {
    mount(
      <TabBarScroller>
        <TabBar activeTabIndex={0} onChange={evt => {}} />
      </TabBarScroller>
    );
  });
});

import React from 'react';
import { mount } from 'enzyme';
import { TabBar, Tab } from './tabs';

describe('Tabs', () => {
  it('renders', () => {
    mount(<TabBar activeTabIndex={0} onChange={evt => {}} />);
  });
});

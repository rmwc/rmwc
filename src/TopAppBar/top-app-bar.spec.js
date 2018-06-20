import * as React from 'react';
import { mount } from 'enzyme';

import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarActionItem,
  TopAppBarTitle,
  TopAppBarFixedAdjust
} from './';

describe('TopAppBar', () => {
  test('renders', () => {
    mount(
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <TopAppBarNavigationIcon>menu</TopAppBarNavigationIcon>
            <TopAppBarTitle>Title</TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection alignEnd>
            <TopAppBarActionItem aria-label="Download" alt="Download">
              file_download
            </TopAppBarActionItem>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
    );
  });

  test('can be fixed', () => {
    const el = mount(
      <div>
        <TopAppBar fixed>
          <TopAppBarNavigationIcon use="menu" />
        </TopAppBar>
        <TopAppBarFixedAdjust />
      </div>
    );
    expect(el.html().includes('mdc-top-app-bar--fixed')).toBe(true);
  });

  test('can be prominent', () => {
    const el = mount(
      <TopAppBar prominent>
        <TopAppBarNavigationIcon use="menu" />
      </TopAppBar>
    );
    expect(el.html().includes('mdc-top-app-bar--prominent')).toBe(true);
  });

  test('can be short', () => {
    const el = mount(
      <TopAppBar short>
        <TopAppBarNavigationIcon use="menu" />
      </TopAppBar>
    );
    expect(el.html().includes('mdc-top-app-bar--short')).toBe(true);
  });

  test('can be dense', () => {
    const el = mount(
      <TopAppBar dense>
        <TopAppBarNavigationIcon use="menu" />
      </TopAppBar>
    );
    expect(el.html().includes('mdc-top-app-bar--dense')).toBe(true);
  });

  test('can be shortCollapsed', () => {
    const el = mount(
      <TopAppBar shortCollapsed>
        <TopAppBarNavigationIcon use="menu" />
      </TopAppBar>
    );
    expect(el.html().includes('mdc-top-app-bar--short-collapsed')).toBe(true);
  });
});

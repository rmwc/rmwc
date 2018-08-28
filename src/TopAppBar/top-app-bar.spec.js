import * as React from 'react';
import { mount } from 'enzyme';

import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarActionItem,
  TopAppBarTitle,
  TopAppBarFixedAdjust,
  SimpleTopAppBar
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
          <TopAppBarNavigationIcon icon="menu" />
        </TopAppBar>
        <TopAppBarFixedAdjust />
      </div>
    );
    expect(el.html().includes('mdc-top-app-bar--fixed')).toBe(true);
  });

  test('can be prominent', () => {
    const el = mount(
      <TopAppBar prominent>
        <TopAppBarNavigationIcon icon="menu" />
      </TopAppBar>
    );
    expect(el.html().includes('mdc-top-app-bar--prominent')).toBe(true);
  });

  test('can be short', () => {
    const el = mount(
      <TopAppBar short>
        <TopAppBarNavigationIcon icon="menu" />
      </TopAppBar>
    );
    expect(el.html().includes('mdc-top-app-bar--short')).toBe(true);
  });

  test('can be dense', () => {
    const el = mount(
      <TopAppBar dense>
        <TopAppBarNavigationIcon icon="menu" />
      </TopAppBar>
    );
    expect(el.html().includes('mdc-top-app-bar--dense')).toBe(true);
  });

  test('can be shortCollapsed', () => {
    const el = mount(
      <TopAppBar shortCollapsed>
        <TopAppBarNavigationIcon icon="menu" />
      </TopAppBar>
    );
    expect(el.html().includes('mdc-top-app-bar--short-collapsed')).toBe(true);
  });

  test('SimpleTopApPBar', () => {
    const el = mount(
      <SimpleTopAppBar
        title="TestTitle"
        navigationIcon
        startContent="TestStartContent"
        endContent="TestEndContent"
        actionItems={[{ use: 'star_outline' }]}
      />
    );
    // has title
    expect(el.html().includes('TestTitle')).toBe(true);

    // has the navigation icon
    expect(el.html().includes('mdc-top-app-bar__navigation-icon')).toBe(true);

    // has content
    expect(el.html().includes('TestStartContent')).toBe(true);
    expect(el.html().includes('TestEndContent')).toBe(true);

    // has action item
    expect(el.html().includes('star_outline')).toBe(true);
  });
});

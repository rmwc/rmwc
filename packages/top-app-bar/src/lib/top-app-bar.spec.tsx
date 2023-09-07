import { render, screen } from '@testing-library/react';
import React from 'react';

import {
  SimpleTopAppBar,
  TopAppBar,
  TopAppBarActionItem,
  TopAppBarFixedAdjust,
  TopAppBarNavigationIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle
} from './top-app-bar';

describe('TopAppBar', () => {
  test('renders', () => {
    const { asFragment } = render(
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <TopAppBarNavigationIcon icon="menu" />
            <TopAppBarTitle>Title</TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection alignEnd>
            <TopAppBarActionItem
              aria-label="Download"
              alt="Download"
              icon="file_download"
            />
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test('can be fixed', () => {
    const { container } = render(
      <div>
        <TopAppBar fixed>
          <TopAppBarNavigationIcon icon="menu" />
        </TopAppBar>
        <TopAppBarFixedAdjust />
      </div>
    );
    expect(container.firstChild?.firstChild).toHaveClass(
      'mdc-top-app-bar--fixed'
    );
  });

  test('can be prominent', () => {
    const { container } = render(
      <TopAppBar prominent>
        <TopAppBarNavigationIcon icon="menu" />
      </TopAppBar>
    );
    expect(container.firstChild).toHaveClass('mdc-top-app-bar--prominent');
  });

  test('can be short', () => {
    const { container } = render(
      <TopAppBar short>
        <TopAppBarNavigationIcon icon="menu" />
      </TopAppBar>
    );
    expect(container.firstChild).toHaveClass('mdc-top-app-bar--short');
  });

  test('can be dense', () => {
    const { container } = render(
      <TopAppBar dense>
        <TopAppBarNavigationIcon icon="menu" />
      </TopAppBar>
    );
    expect(container.firstChild).toHaveClass('mdc-top-app-bar--dense');
  });

  test('can be shortCollapsed', () => {
    const { container } = render(
      <TopAppBar shortCollapsed>
        <TopAppBarNavigationIcon icon="menu" />
      </TopAppBar>
    );
    expect(container.firstChild).toHaveClass(
      'mdc-top-app-bar--short-collapsed'
    );
  });

  test('SimpleTopAppBar', () => {
    const el = render(
      <SimpleTopAppBar
        title="TestTitle"
        navigationIcon={{ icon: 'foo' }}
        startContent="TestStartContent"
        endContent="TestEndContent"
        actionItems={[{ icon: 'star_outline' }]}
      />
    );

    // has title
    expect(screen.getByText('TestTitle')).toBeInTheDocument();

    // has the navigation icon
    expect(screen.getByText('foo')).toBeInTheDocument();

    // has content
    expect(screen.getByText('TestStartContent')).toBeInTheDocument();
    expect(screen.getByText('TestEndContent')).toBeInTheDocument();

    // has action item
    expect(screen.getByText('star_outline')).toBeInTheDocument();
  });
});

describe('TopAppBarFixedAdjust', () => {
  it('renders', () => {
    const { container } = render(<TopAppBarFixedAdjust />);
    expect(
      container.getElementsByClassName('mdc-top-app-bar--fixed-adjust')
    ).toHaveLength(1);
  });

  it('can be short', () => {
    const { container } = render(<TopAppBarFixedAdjust short />);
    expect(
      container.getElementsByClassName('mdc-top-app-bar--short-fixed-adjust')
    ).toHaveLength(1);
  });

  it('can be dense', () => {
    const { container } = render(<TopAppBarFixedAdjust dense />);
    expect(
      container.getElementsByClassName('mdc-top-app-bar--dense-fixed-adjust')
    ).toHaveLength(1);
  });

  it('can be prominent', () => {
    const { container } = render(<TopAppBarFixedAdjust prominent />);
    expect(
      container.getElementsByClassName(
        'mdc-top-app-bar--prominent-fixed-adjust'
      )
    ).toHaveLength(1);
  });

  it('can be denseProminent', () => {
    const { container } = render(<TopAppBarFixedAdjust denseProminent />);
    expect(
      container.getElementsByClassName(
        'mdc-top-app-bar--dense-prominent-fixed-adjust'
      )
    ).toHaveLength(1);
  });
});

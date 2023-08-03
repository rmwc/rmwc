import React from 'react';

import { action } from '@storybook/addon-actions';

import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarActionItem,
  TopAppBarTitle,
  SimpleTopAppBar,
  TopAppBarProps
} from './';

const TopAppBarStory = (props: TopAppBarProps) => (
  <div style={{ margin: '-24px', boxSizing: 'border-box' }}>
    <TopAppBar {...props} onNav={action('onNav')} foundationRef={console.log}>
      <TopAppBarRow>
        <TopAppBarSection alignStart>
          <TopAppBarNavigationIcon>menu</TopAppBarNavigationIcon>
          <TopAppBarTitle>Title</TopAppBarTitle>
        </TopAppBarSection>
        <TopAppBarSection alignEnd>
          <TopAppBarActionItem aria-label="Download" alt="Download">
            file_download
          </TopAppBarActionItem>
          <TopAppBarActionItem
            aria-label="Print this page"
            alt="Print this page"
          >
            print
          </TopAppBarActionItem>
          <TopAppBarActionItem
            aria-label="Bookmark this page"
            alt="Bookmark this page"
          >
            bookmark
          </TopAppBarActionItem>
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
    <div style={{ height: '150vh' }} />
  </div>
);

function NestedTopAppBar() {
  const [el, setEl] = React.useState<HTMLDivElement | null>(null);

  return (
    <div
      ref={(el) => setEl(el)}
      style={{
        padding: '4rem',
        height: '300px',
        boxSizing: 'border-box',
        background: 'red',
        overflowY: 'auto'
      }}
    >
      <TopAppBarStory scrollTarget={el} />
    </div>
  );
}

export default {
  title: 'TopAppBar'
};

export const Standard = () => (
  <div style={{ margin: '-24px' }}>
    <TopAppBar>
      <TopAppBarRow>
        <TopAppBarSection>
          <TopAppBarNavigationIcon icon="menu" />
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
    <div style={{ height: '300vh' }} />
  </div>
);

Standard.story = {
  name: 'standard'
};

export const Fixed = () => <TopAppBarStory fixed />;

Fixed.story = {
  name: 'fixed'
};

export const Dense = () => <TopAppBarStory dense />;

Dense.story = {
  name: 'dense'
};

export const Short = () => <TopAppBarStory short />;

Short.story = {
  name: 'short'
};

export const ShortCollapsed = () => <TopAppBarStory shortCollapsed />;

ShortCollapsed.story = {
  name: 'shortCollapsed'
};

export const Prominent = () => <TopAppBarStory prominent />;

Prominent.story = {
  name: 'prominent'
};

export const Nested = () => <NestedTopAppBar />;

Nested.story = {
  name: 'nested'
};

export const _SimpleTopAppBar = () => (
  <div style={{ margin: '-24px' }}>
    <SimpleTopAppBar
      title="test"
      navigationIcon={{ onClick: () => console.log('Navigate') }}
      actionItems={[
        { onClick: () => console.log('Do Something'), use: 'file_download' },
        { onClick: () => console.log('Do Something'), use: 'print' },
        { onClick: () => console.log('Do Something'), use: 'bookmark' }
      ]}
    />
  </div>
);

_SimpleTopAppBar.story = {
  name: 'SimpleTopAppBar'
};

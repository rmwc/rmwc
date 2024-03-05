import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  TopAppBar,
  TopAppBarActionItem,
  TopAppBarNavigationIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarProps,
  SimpleTopAppBar
} from '..';

export default {
  title: 'TopAppBar',
  component: TopAppBar
} as Meta;

type Story = StoryObj<Parameters<typeof TopAppBar>[0]>;

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

export const TopAppBarStandardStory: Story = {
  render: () => (
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
  )
};

export const TopAppBarFixedStory: Story = {
  render: () => <TopAppBarStory fixed />
};

export const TopAppBarDenseStory: Story = {
  render: () => <TopAppBarStory dense />
};

export const TopAppBarShortStory: Story = {
  render: () => <TopAppBarStory short />
};

export const TopAppBarShortCollapsedStory: Story = {
  render: () => <TopAppBarStory shortCollapsed />
};

export const TopAppBarProminentStory: Story = {
  render: () => <TopAppBarStory prominent />
};

export const TopBarNestedStory: Story = {
  render: () => <NestedTopAppBar />
};

export const SimpleTopAppBarStory = {
  render: () => (
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
  )
};

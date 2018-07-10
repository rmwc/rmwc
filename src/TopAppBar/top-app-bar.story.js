import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarActionItem,
  TopAppBarTitle,
  SimpleTopAppBar
} from './';

const ToolbarStory = props => (
  <div style={{ margin: '-24px' }}>
    <TopAppBar {...props} onNav={action('onNav')}>
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

storiesOf('TopAppBar', module)
  .add('minimal', () => (
    <div style={{ margin: '-24px' }}>
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection>
            <TopAppBarNavigationIcon use="menu" />
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
    </div>
  ))
  .add('fixed', () => <ToolbarStory fixed />)
  .add('dense', () => <ToolbarStory dense />)
  .add('short', () => <ToolbarStory short />)
  .add('shortCollapsed', () => <ToolbarStory shortCollapsed />)
  .add('prominent', () => <ToolbarStory prominent />)
  .add('SimpleTopAppBar', () => (
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
  ));

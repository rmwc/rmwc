/**
 * @jest-environment node
 */
import React from 'react';
import { renderToString as mount } from 'react-dom/server';

import {
  TopAppBar,
  TopAppBarActionItem,
  TopAppBarNavigationIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle
} from './top-app-bar';

describe('TopAppBar SSR', () => {
  test('renders', () => {
    mount(
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
  });
});

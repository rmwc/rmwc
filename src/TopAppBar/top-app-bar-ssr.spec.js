/**
 * @jest-environment node
 */
import * as React from 'react';
import { renderToString as mount } from 'react-dom/server';

import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarActionItem,
  TopAppBarTitle
} from './';

describe('TopAppBar SSR', () => {
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
});

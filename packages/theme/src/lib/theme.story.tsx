import React from 'react';

import { Tab, TabBar } from '@rmwc/tabs';
import { TopAppBar, TopAppBarRow } from '@rmwc/top-app-bar';
import { storiesOf } from '@storybook/react';
import { Theme } from './theme';
import { themeOptions } from './theme-options';

const themeStyle = {
  padding: '16px',
  margin: '16px',
  display: 'inline-block',
  width: '96px',
  height: '96px',
  verticalAlign: 'top'
};

storiesOf('Theme', module)
  .add('Theme', () => (
    <div>
      <div style={{ backgroundColor: '#999' }}>
        <Theme use={['textHintOnLight']} style={themeStyle}>
          Test
        </Theme>
        {themeOptions.map((theme, i) => (
          <Theme key={i} use={theme} style={themeStyle}>
            {theme}
          </Theme>
        ))}
      </div>
    </div>
  ))
  .add('Theme Fixes', () => (
    <div>
      <div>
        <div>Tabs should be proper color on top app bar</div>
        <TopAppBar>
          <TopAppBarRow>
            <TabBar>
              <Tab>One</Tab>
              <Tab>Two</Tab>
              <Tab>Three</Tab>
            </TabBar>
          </TopAppBarRow>
        </TopAppBar>
      </div>
    </div>
  ));

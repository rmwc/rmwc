import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Theme } from './';
import { themeOptions } from './theme-options';

const themeStyle = {
  padding: '16px',
  margin: '16px',
  display: 'inline-block',
  width: '96px',
  height: '96px',
  verticalAlign: 'top'
};

const darkThemeStyle = {
  ...themeStyle
};

storiesOf('Theme', module).add('Theme', () => (
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
));

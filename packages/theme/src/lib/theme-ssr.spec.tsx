/**
 * @jest-environment node
 */
import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { Theme, ThemeProvider } from './theme';
import { themeOptions } from './theme-options';

describe('Theme SSR', () => {
  test('renders', () => {
    themeOptions.map((theme, i) =>
      mount(
        <Theme key={i} use={theme}>
          {theme}
        </Theme>
      )
    );
  });

  test('ThemeProvider renders', () => {
    mount(
      <ThemeProvider options={{ primary: 'red' }}>
        <div />
      </ThemeProvider>
    );
  });
});

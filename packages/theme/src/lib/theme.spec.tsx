import { render, screen } from '@testing-library/react';
import React from 'react';
import { Theme, ThemeProvider } from './theme';
import { themeOptions } from './theme-options';

describe('Theme', () => {
  test('renders', () => {
    themeOptions.map((theme, i) =>
      render(
        <Theme key={i} use={theme}>
          {theme}
        </Theme>
      )
    );
  });

  test('wraps', () => {
    render(
      <Theme use="primary" wrap>
        <div className="test-classname">Hello</div>
      </Theme>
    );
    expect(screen.getByText('Hello')).toHaveClass('test-classname');
  });

  test('can have custom classnames', () => {
    const { container } = render(
      <Theme use="onPrimary" className="my-custom-classname" />
    );
    expect(container.firstChild).toHaveClass('my-custom-classname');
  });
});

describe('ThemeProvider', () => {
  test('renders', () => {
    const { asFragment } = render(
      <ThemeProvider
        options={{ primary: 'red', secondary: '#fff', surface: '#000000' }}
      >
        <div />
      </ThemeProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('can wrap', () => {
    render(
      <ThemeProvider options={{ primary: 'red' }} wrap>
        <span>Hello</span>
      </ThemeProvider>
    );

    const { asFragment } = render(
      <ThemeProvider options={{ primary: 'red' }} wrap />
    );

    expect(screen.getByText('Hello')).toBeInTheDocument();

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class=""
          style="--mdc-theme-on-primary: rgba(255, 255, 255, 1); --mdc-theme-primary: red;"
        />
      </DocumentFragment>
    `);
  });
});

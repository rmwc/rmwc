import * as React from 'react';
import { mount } from 'enzyme';
import { Theme, ThemeProvider } from './';
import themeOptions from './theme-options';

describe('Theme', () => {
  test('renders', () => {
    themeOptions.map((theme, i) =>
      mount(
        <Theme key={i} use={theme}>
          {theme}
        </Theme>
      )
    );
  });

  test('wraps', () => {
    const el = mount(
      <Theme use="primary" wrap>
        <div className="test-classname" />
      </Theme>
    );

    expect(el.html().includes('test-classname')).toBe(true);
  });

  test('can have custom classnames', () => {
    const el = mount(
      <Theme use="on-primary" className="my-custom-classname" />
    );
    expect(!!~el.html().search('my-custom-classname')).toEqual(true);
  });
});

describe('ThemeProvider', () => {
  test('renders', () => {
    const el = mount(
      <ThemeProvider
        options={{ primary: 'red', secondary: '#fff', surface: '#000000' }}
      >
        <div />
      </ThemeProvider>
    );

    el.setProps({
      options: {
        '--mdc-theme-primary': 'blue',
        secondary: '#fff',
        surface: '#000000'
      }
    });
    el.update();
    el.instance().colors;

    el.setProps({
      options: {
        '--mdc-theme-primary': 'green',
        secondary: '#000000',
        surface: '#000000'
      }
    });
    el.instance().colors;

    el.update();
    el.instance().colors;
  });

  test('can wrap', () => {
    const el = mount(
      <ThemeProvider options={{ primary: 'red' }} wrap>
        <span>Hello</span>
      </ThemeProvider>
    );

    const el2 = mount(<ThemeProvider options={{ primary: 'red' }} wrap />);

    expect(el.html().includes('span') && !el.html().includes('div')).toBe(true);
    expect(el2.html().includes('div')).toBe(true);
  });
});

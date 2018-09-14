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

  test('can have custom classnames', () => {
    const el = mount(
      <Theme use="on-primary" className="my-custom-classname" />
    );
    expect(!!~el.html().search('my-custom-classname')).toEqual(true);
  });

  test('ThemeProvider renders', () => {
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
});

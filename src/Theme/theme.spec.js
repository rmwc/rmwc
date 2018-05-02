import React from 'react';
import { mount } from 'enzyme';
import { Theme } from './';
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
});

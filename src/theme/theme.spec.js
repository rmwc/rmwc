import React from 'react';
import { mount } from 'enzyme';
import { Theme } from './theme';

const themes = [
	'primary',
	'primary-light',
	'primary-dark',
	'secondary',
	'secondary-light',
	'secondary-dark',
	'background',
	'primary-bg',
	'primary-light-bg',
	'primary-dark-bg',
	'secondary-bg',
	'secondary-light-bg',
	'secondary-dark-bg',
	'text-primary-on-background',
	'text-secondary-on-background',
	'text-hint-on-background',
	'text-disabled-on-background',
	'text-icon-on-background',
	'text-primary-on-light',
	'text-secondary-on-light',
	'text-hint-on-light',
	'text-disabled-on-light',
	'text-icon-on-light',
	'text-primary-on-primary',
	'text-secondary-on-primary',
	'text-hint-on-primary',
	'text-disabled-on-primary',
	'text-icon-on-primary',
	'text-primary-on-secondary',
	'text-secondary-on-secondary',
	'text-hint-on-secondary',
	'text-disabled-on-secondary',
	'text-icon-on-secondary',
	'text-primary-on-dark',
	'text-secondary-on-dark',
	'text-hint-on-dark',
	'text-disabled-on-dark',
	'text-icon-on-dark'
]

describe('Theme', () => {
  it('renders', () => {
    {themes.map((theme, i) => (
      <Theme
        key={i}
        use={theme}
      >
        {theme}
      </Theme>
    ))}
  });
});

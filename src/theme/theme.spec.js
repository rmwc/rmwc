import React from 'react';
import { mount } from 'enzyme';
import { Theme, themeOptions } from './theme';

describe('Theme', () => {
	it('renders', () => {
		{
			themeOptions.map((theme, i) => (
				<Theme key={i} use={theme}>
					{theme}
				</Theme>
			));
		}
	});
});

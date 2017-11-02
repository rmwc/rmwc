import React from 'react';
import { mount } from 'enzyme';
import { Theme } from './';
import themeOptions from './theme-options';

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

	it('can have custom classnames', () => {
		const el = mount(<Theme use="dark" className={'my-custom-classname'} />);
		expect(!!~el.html().search('my-custom-classname')).toEqual(true);
	});
});

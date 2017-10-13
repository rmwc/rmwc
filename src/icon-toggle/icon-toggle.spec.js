import React from 'react';
import { mount } from 'enzyme';
import { IconToggle } from './icon-toggle';

describe('IconToggle', () => {
	it('renders', () => {
		mount(
			<IconToggle
				on={{ label: 'Remove from favorites', content: 'favorite' }}
				off={{ label: 'Add to favorites', content: 'favorite_border' }}
			/>
		);
	});

	it('can have custom classnames', () => {
		const el = mount(
			<IconToggle
				on={{ label: 'Remove from favorites', content: 'favorite' }}
				off={{ label: 'Add to favorites', content: 'favorite_border' }}
				className={'my-custom-classname'}
			/>
		);
		expect(!!~el.html().search('my-custom-classname')).toEqual(true);
	});
});

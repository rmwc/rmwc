import React from 'react';
import { mount } from 'enzyme';
import { Select } from './';

describe('Select', () => {
	it('renders', () => {
		mount(
			<Select
				placeholder="Select a food"
				options={{ 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' }}
			/>
		);
	});

	it('can accept options array', () => {
		mount(<Select placeholder="Select a food" options={[1, 2, 3]} />);
	});

	it('can have custom classnames', () => {
		const el = mount(
			<Select
				className={'my-custom-classname'}
				options={{ 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' }}
			/>
		);
		expect(!!~el.html().search('my-custom-classname')).toEqual(true);
	});
});

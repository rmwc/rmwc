import React from 'react';
import { mount } from 'enzyme';
import { Icon } from './';

describe('Icon', () => {
	it('renders with children', () => {
		mount(<Icon>favorite</Icon>);
	});

	it('renders with use', () => {
		mount(<Icon use="favorite" />);
	});

	it('can have custom classnames', () => {
		const el = mount(<Icon className={'my-custom-classname'} />);
		expect(!!~el.html().search('my-custom-classname')).toEqual(true);
	});
});

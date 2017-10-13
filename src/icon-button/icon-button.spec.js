import React from 'react';
import { mount } from 'enzyme';
import { IconButton } from './icon-button';

describe('IconButton', () => {
	it('renders with children', () => {
		mount(<IconButton>favorite</IconButton>);
	});

	it('renders with use prop', () => {
		mount(<IconButton use="favorite" />);
	});

	it('can have custom classnames', () => {
		const el = mount(<IconButton className={'my-custom-classname'} />);
		expect(!!~el.html().search('my-custom-classname')).toEqual(true);
	});
});

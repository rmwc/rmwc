import React from 'react';
import { mount } from 'enzyme';
import { Icon } from './icon';

describe('Icon', () => {
	it('renders with children', () => {
		mount(<Icon>favorite</Icon>);
	});

	it('renders with use', () => {
		mount(<Icon use="favorite" />);
	});
});

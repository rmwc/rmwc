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
});

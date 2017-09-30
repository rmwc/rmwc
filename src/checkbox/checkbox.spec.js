import React from 'react';
import { mount } from 'enzyme';
import Checkbox from './checkbox';

describe('Checkbox', () => {
	it('renders', () => {
		const checkbox = mount(<Checkbox />);
		expect(!!~checkbox.html().search('mdc-checkbox')).toEqual(true);
	});

	it('can be checked', () => {
		const checkbox = mount(<Checkbox checked={true} onChange={() => {}} />);
		expect(checkbox.find('input').getDOMNode().checked).toEqual(true);
	});

	it('can be disabled', () => {
		const checkbox = mount(<Checkbox disabled />);
		expect(checkbox.find('input').getDOMNode().disabled).toEqual(true);
	});

	it('can have a label', () => {
		const checkbox = mount(<Checkbox label="hello world" />);
		expect(checkbox.text()).toEqual('hello world');
	});
});

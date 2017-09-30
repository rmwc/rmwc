import React from 'react';
import { mount } from 'enzyme';
import Radio from './radio';

describe('Radio', () => {
	it('renders', () => {
		const radio = mount(<Radio />);
		expect(!!~radio.html().search('mdc-radio')).toEqual(true);
	});

	it('can be checked', () => {
		const radio = mount(<Radio checked={true} onChange={() => {}} />);
		expect(radio.find('input').getDOMNode().checked).toEqual(true);
	});

	it('can be disabled', () => {
		const radio = mount(<Radio disabled />);
		expect(radio.find('input').getDOMNode().disabled).toEqual(true);
	});

	it('can have a label', () => {
		const radio = mount(<Radio label="hello world" />);
		expect(radio.text()).toEqual('hello world');
	});
});

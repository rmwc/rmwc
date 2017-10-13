import React from 'react';
import { mount } from 'enzyme';
import Switch from './switch';

describe('Switch', () => {
	it('renders', () => {
		const switchEl = mount(<Switch />);
		expect(!!~switchEl.html().search('mdc-switch')).toEqual(true);
	});

	it('can be checked', () => {
		const switchEl = mount(<Switch checked={true} onChange={() => {}} />);
		expect(switchEl.find('input').getDOMNode().checked).toEqual(true);
	});

	it('can be disabled', () => {
		const switchEl = mount(<Switch disabled />);
		expect(switchEl.find('input').getDOMNode().disabled).toEqual(true);
	});

	it('can have a label', () => {
		const switchEl = mount(<Switch label="hello world" />);
		expect(switchEl.text()).toEqual('hello world');
	});

	it('can have custom classnames on input', () => {
		const el = mount(<Switch className={'my-custom-classname'} />);
		expect(!!~el.html().search('my-custom-classname')).toEqual(true);
	});
});

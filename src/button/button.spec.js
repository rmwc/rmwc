import React from 'react';
import { mount } from 'enzyme';
import Button from './button';

describe('Button', () => {
	it('renders', () => {
		const btn = mount(<Button />);
		expect(!!~btn.html().search('mdc-button')).toEqual(true);
	});

	it('can be raised', () => {
		const btn = mount(<Button raised />);
		expect(!!~btn.html().search('mdc-button--raised')).toEqual(true);
	});

	it('can be primary', () => {
		const btn = mount(<Button primary />);
		expect(!!~btn.html().search('mdc-button--primary')).toEqual(true);
	});

	it('can be accent', () => {
		const btn = mount(<Button accent />);
		expect(!!~btn.html().search('mdc-button--accent')).toEqual(true);
	});

	it('can be dense', () => {
		const btn = mount(<Button dense />);
		expect(!!~btn.html().search('mdc-button--dense')).toEqual(true);
	});

	it('can be compact', () => {
		const btn = mount(<Button compact />);
		expect(!!~btn.html().search('mdc-button--compact')).toEqual(true);
	});

	it('can ripple', () => {
		const btn = mount(<Button ripple />);
		expect(!!~btn.html().search('mdc-ripple-surface')).toEqual(true);
	});

	it('cannot ripple', () => {
		const btn = mount(<Button ripple={false} />);
		expect(btn.hasClass('mdc-ripple-surface')).toEqual(false);
	});
});

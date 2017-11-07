import React from 'react';
import { mount } from 'enzyme';
import { Ripple } from './';

describe('Ripple', () => {
	it('renders', () => {
		mount(
			<Ripple>
				<div />
			</Ripple>
		);
	});

	it('can be primary', () => {
		const el = mount(
			<Ripple primary>
				<div />
			</Ripple>
		);

		expect(!!~el.html().search('mdc-ripple-surface--primary')).toBe(true);
	});

	it('can be accent', () => {
		const el = mount(
			<Ripple accent>
				<div />
			</Ripple>
		);

		expect(!!~el.html().search('mdc-ripple-surface--accent')).toBe(true);
	});

	it('can be unbounded', () => {
		const el = mount(
			<Ripple unbounded>
				<div />
			</Ripple>
		);

		expect(!!~el.html().search('mdc-ripple-upgraded--unbounded')).toBe(true);
	});
});

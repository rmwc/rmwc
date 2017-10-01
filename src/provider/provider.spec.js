import React from 'react';
import { mount } from 'enzyme';
import { RMWCProvider } from './provider';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';

describe('Provider', () => {
	it('renders', () => {
		const dom = mount(
			<RMWCProvider>
				<div />
			</RMWCProvider>
		);
	});

	it('can set default ripple', () => {
		const dom = mount(
			<RMWCProvider buttonDefaultRipple={false}>
				<Button />
			</RMWCProvider>
		);
		expect(!!~dom.html().search('mdc-ripple-surface')).toEqual(false);
	});

	it('can set icon prefix', () => {
		const dom = mount(
			<RMWCProvider iconPrefix={'my-icon-lib-test'}>
				<Icon />
			</RMWCProvider>
		);
		expect(!!~dom.html().search('my-icon-lib-test')).toEqual(true);
	});
});

import React from 'react';
import { mount } from 'enzyme';
import { Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle } from './toolbar';

describe('Toolbar', () => {
	it('renders', () => {
		mount(
			<Toolbar>
				<ToolbarRow>
					<ToolbarSection>
						<ToolbarTitle>Toolbar</ToolbarTitle>
					</ToolbarSection>
				</ToolbarRow>
			</Toolbar>
		);
	});

	it('can be fixed', () => {
		const el = mount(
			<Toolbar fixed>
				<ToolbarRow />
			</Toolbar>
		);

		expect(!!~el.html().search('mdc-toolbar--fixed')).toBe(true);
	});

	it('can be waterfall', () => {
		const el = mount(
			<Toolbar waterfall>
				<ToolbarRow />
			</Toolbar>
		);

		expect(!!~el.html().search('mdc-toolbar--waterfall')).toBe(true);
	});

	it('can be fixedLastrowOnly', () => {
		const el = mount(
			<Toolbar fixedLastrowOnly>
				<ToolbarRow />
			</Toolbar>
		);

		expect(!!~el.html().search('mdc-toolbar--fixed-lastrow-only')).toBe(true);
	});
});

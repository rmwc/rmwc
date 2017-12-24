import React from 'react';
import { mount } from 'enzyme';
import { TabBar, Tab, TabBarScroller } from './';

describe('Tabs', () => {
	it('TabBar renders', () => {
		// dont render this with any children in the test
		// JSDOM will fail because there is no dataset attribute in its DOM elements
		mount(<TabBar activeTabIndex={0} onChange={evt => {}} />);
	});

	it('ScrollTab wtih TabBar renders', () => {
		const el = mount(
			<TabBarScroller>
				<TabBar activeTabIndex={0} onChange={evt => {}} />
			</TabBarScroller>
		);
		expect(
			!!~el.html().search('mdc-tab-bar-scroller__scroll-frame__tabs')
		).toEqual(true);
	});

	it('can have custom classnames', () => {
		[TabBar, Tab].forEach(Component => {
			const el = mount(<Component className={'my-custom-classname'} />);
			expect(!!~el.html().search('my-custom-classname')).toEqual(true);
		});
	});
});

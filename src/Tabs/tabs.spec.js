import React from 'react';
import { mount } from 'enzyme';
import { TabBar, Tab } from './';

describe('Tabs', () => {
	it('renders', () => {
		// dont render this with any children in the test
		// JSDOM will fail because there is no dataset attribute in its DOM elements
		mount(<TabBar activeTabIndex={0} onChange={evt => {}} />);
	});

	it('can have custom classnames', () => {
		[TabBar, Tab].forEach(Component => {
			const el = mount(<Component className={'my-custom-classname'} />);
			expect(!!~el.html().search('my-custom-classname')).toEqual(true);
		});
	});
});

import React from 'react';
import { mount } from 'enzyme';
import { PermanentDrawer, PermanentDrawerContent } from './permanent-drawer';
import {
	PersistentDrawer,
	PersistentDrawerContent,
	PersistentDrawerHeader
} from './persistent-drawer';
import {
	TemporaryDrawer,
	TemporaryDrawerContent,
	TemporaryDrawerHeader
} from './temporary-drawer';

describe('Drawer', () => {
	it('permanent Drawer renders', () => {
		mount(
			<PermanentDrawer>
				<PermanentDrawerContent />
			</PermanentDrawer>
		);
	});

	it('persistent Drawer renders', () => {
		mount(
			<PersistentDrawer open={true} onClose={() => {}}>
				<PersistentDrawerHeader style={{ backgroundColor: '#f6f6f6' }}>
					PersistentDrawerHeader
				</PersistentDrawerHeader>
				<PersistentDrawerContent />
			</PersistentDrawer>
		);
	});

	it('temporary Drawer renders', () => {
		mount(
			<TemporaryDrawer open={true} onClose={() => {}}>
				<TemporaryDrawerHeader style={{ backgroundColor: '#f6f6f6' }}>
					TemporaryDrawerHeader
				</TemporaryDrawerHeader>
				<TemporaryDrawerContent />
			</TemporaryDrawer>
		);
	});

	it('can have custom classnames', () => {
		[PermanentDrawer, TemporaryDrawer, PersistentDrawer].forEach(Component => {
			const el = mount(<Component className={'my-custom-classname'} />);
			expect(!!~el.html().search('my-custom-classname')).toEqual(true);
		});
	});

	/**
	 * Test the MDC monkey patch temporary drawer click fix
	 * This should protect from future changes to the material api
	 */
	it('temporary Drawer works with MDC click fix', () => {
		let counter = 0;
		const container = document.createElement('div');
		document.body.appendChild(container);
		document.addEventListener('click', () => (counter += 1));

		const wrapper = mount(
			<TemporaryDrawer open={true} onClose={() => {}}>
				<TemporaryDrawerContent>
					<a />
				</TemporaryDrawerContent>
			</TemporaryDrawer>,
			{
				attachTo: container
			}
		);

		wrapper
			.find('a')
			.instance()
			.dispatchEvent(new MouseEvent('click', { bubbles: true }));

		expect(counter).toBe(1);
	});
});

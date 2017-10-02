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
});

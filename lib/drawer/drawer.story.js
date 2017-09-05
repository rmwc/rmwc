import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
// import { Welcome } from '@storybook/react/demo';
import { boolean } from '@storybook/addon-knobs';
import { PermanentDrawer, PermanentDrawerContent } from './permanent-drawer';
import { PersistentDrawer, PersistentDrawerContent, PersistentDrawerHeader } from './persistent-drawer';
import { TemporaryDrawer, TemporaryDrawerContent, TemporaryDrawerHeader } from './temporary-drawer';
import { List, ListItem, ListItemText } from '../list/list';

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

const menuItems = [
	{name: 'Home', icon: ''},
	{name: 'Profile', icon: ''},
	{name: 'About', icon: ''},
	{name: 'Contact', icon: ''},
];

storiesOf('Drawers', module)
	.add('PersistentDrawer', () => (
			<div style={{margin: '-24px'}}>
				<PersistentDrawer
					open={boolean('open', true)}
					onClose={action('onClose')}>
					<PersistentDrawerHeader style={{backgroundColor: '#f6f6f6'}}>
						PersistentDrawerHeader
					</PersistentDrawerHeader>
					<PersistentDrawerContent>
						{menuItems.map((section, i) => (
							<ListItem key={i} onClick={action('onClick')}>
								<ListItemText>{ section.name }</ListItemText>
							</ListItem>
						))}
					</PersistentDrawerContent>
				</PersistentDrawer>
			</div>
		)
	)
	.add('TemporaryDrawer', () => (
		<div style={{margin: '-24px'}}>
			<TemporaryDrawer
				open={boolean('open', true)}
				onClose={action('onClose')}>
				<TemporaryDrawerHeader style={{backgroundColor: '#f6f6f6'}}>
					TemporaryDrawerHeader
				</TemporaryDrawerHeader>
				<TemporaryDrawerContent>
					{menuItems.map((section, i) => (
						<ListItem key={i} onClick={action('onClick')}>
							<ListItemText>{ section.name }</ListItemText>
						</ListItem>
					))}
				</TemporaryDrawerContent>
			</TemporaryDrawer>
		</div>
	))
	.add('PermanentDrawer', () => (
		<div style={{margin: '-24px'}}>
			<PermanentDrawer>
				<PermanentDrawerContent>
					<List>
						{menuItems.map((section, i) => (
							<ListItem key={i} onClick={action('onClick')}>
								<ListItemText>{ section.name }</ListItemText>
							</ListItem>
						))}
					</List>
				</PermanentDrawerContent>
			</PermanentDrawer>
		</div>
	)
)
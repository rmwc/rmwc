import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import {
	List,
	ListItem,
	ListItemStartDetail,
	ListItemText,
	ListItemEndDetail
} from './';
import { Icon } from '../Icon';

storiesOf('Lists', module).add('List', () => (
	<List>
		<ListItem ripple>
			<ListItemStartDetail>
				<Icon>star_border</Icon>
			</ListItemStartDetail>
			<ListItemText>Cookies</ListItemText>
			<ListItemEndDetail>
				<Icon>info</Icon>
			</ListItemEndDetail>
		</ListItem>

		<ListItem ripple>
			<ListItemStartDetail>
				<Icon>favorite_border</Icon>
			</ListItemStartDetail>
			<ListItemText>Pizza</ListItemText>
			<ListItemEndDetail>
				<Icon>info</Icon>
			</ListItemEndDetail>
		</ListItem>

		<ListItem ripple>
			<ListItemStartDetail>
				<Icon>mood</Icon>
			</ListItemStartDetail>
			<ListItemText>Icecream</ListItemText>
			<ListItemEndDetail>
				<Icon>info</Icon>
			</ListItemEndDetail>
		</ListItem>
	</List>
));

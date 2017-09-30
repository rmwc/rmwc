import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { IconButton } from './icon-button';

storiesOf('Buttons', module).add('IconButton', () => (
	<div>
		<IconButton>favorite</IconButton>
		<IconButton use="favorite_outline" />
	</div>
));

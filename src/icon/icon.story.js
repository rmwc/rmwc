import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { Icon } from './icon';

storiesOf('Icons', module).add('Icon', () => (
	<div>
		<Icon>favorite</Icon>
		<Icon use="favorite_outline" />
	</div>
));

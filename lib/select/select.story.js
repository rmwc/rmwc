import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, object } from '@storybook/addon-knobs';
import { Select } from './select';

storiesOf('Selects', module)
	.add('Select', () => (
		<Select
			placeholder={text('placeholder', 'Select a Food')}
			options={object('options', {1: 'Cookies', 2: 'Pizza', 3: 'Icecream'})}
			onChange={evt => action('onChange: ' + evt.target.value)()}
		/>
		)
	)

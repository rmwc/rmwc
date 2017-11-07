import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, object, array, number } from '@storybook/addon-knobs';
import { Select } from './';

storiesOf('Selects', module)
	.add('Select with object', () => (
		<Select
			value={text('value', '')}
			placeholder={text('placeholder', 'Select a Food')}
			options={object('options', { 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' })}
			onChange={evt => action('onChange: ' + evt.target.value)()}
		/>
	))
	.add('Select with array', () => (
		<Select
			value={text('value', '')}
			placeholder={text('placeholder', 'Select a Food')}
			options={array('options', ['Cookies', 'Pizza', 'Icecream'])}
			onChange={evt => action('onChange: ' + evt.target.value)()}
		/>
	));

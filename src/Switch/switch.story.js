import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { Switch } from './';
import { storyWithState } from '../Base/utils/story-with-state';

const SwitchStory = storyWithState(
	state => ({
		checked: boolean('checked', state.checked || false),
		disabled: boolean('disabled', state.disabled || false),
		value: text('value', state.value || 'myValue'),
		label: text('label', state.label || 'Hello World')
	}),
	function() {
		return (
			<Switch
				disabled={this.state.disabled}
				checked={this.state.checked}
				value={this.state.value}
				onChange={evt => {
					this.setState({ checked: evt.target.checked });
					action(`onChange: ${evt.target.value} ${evt.target.checked}`)();
				}}
				label={this.state.label}
			/>
		);
	}
);

storiesOf('Inputs and Controls', module).add('Switch', () => <SwitchStory />);

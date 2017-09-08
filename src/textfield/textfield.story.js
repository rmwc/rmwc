import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text, number } from '@storybook/addon-knobs';
import { Textfield } from './textfield';

class TextfieldStory extends React.Component {
	state = {
		value: ''
	}

	onChange(evt) {
		this.setState({value: evt.target.value})
		action('Value: ' + evt.target.value)()
	}

	render() {
		return (
			<Textfield
				rows={number('rows', 0)}
				cols={number('cols', 0)}
				disabled={boolean('disabled', false)}
				value={text('value', this.state.value)}
				onChange={evt => this.onChange(evt)}
				label={text('label', 'Hello world')}
			/>
		)
	}
}

storiesOf('Inputs and Controls', module)
	.add('Textfield', () => <TextfieldStory />)
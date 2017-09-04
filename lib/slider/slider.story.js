import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, number } from '@storybook/addon-knobs';
import { Slider } from './slider';

class SliderStory extends React.Component {
	state = {
		value: 0
	}

	onChange(evt) {
		this.setState({value: evt.target.value});
		action('onChange: ' + evt.target.value)();
	}

	render() {
		return (
			<Slider
				value={number('value', this.state.value)}
				min={number('min', 0)}
				max={number('max', 100)}
				step={number('step', 1)}
				discrete={boolean('discrete', false)}
				displayMarkers={boolean('displayMarkers', false)}
				disabled={boolean('disabled', false)}
				onChange={evt => this.onChange(evt)}
			/>
		);
	}
}

storiesOf('Inputs and Controls', module)
	.add('Slider', () => (
			<SliderStory />
		)
	)

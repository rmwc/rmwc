import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { number } from '@storybook/addon-knobs';
import { Tab, TabBar } from './tabs';

class TabBarStory extends React.Component {
	state = {
		activeTabIndex: 0
	}

	onChange(evt) {
		this.setState({'activeTabIndex': evt.target.value})
		action('activeTabIndex: ' + evt.target.value)();
	}

	render() {
		return (
			<TabBar
				activeTabIndex={number('activeTabIndex', this.state.activeTabIndex)}
				onChange={evt => this.onChange(evt)}
			>
				<Tab>Cookies</Tab>
				<Tab>Pizza</Tab>
				<Tab>Icecream</Tab>
			</TabBar>
		)
	}
}

storiesOf('Tabs', module)
	.add('TabBar', () => (
		<TabBarStory />
		)
	)

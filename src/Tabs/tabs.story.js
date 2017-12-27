import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { number } from '@storybook/addon-knobs';
import { Tab, TabBar } from './';
import { Button } from '../Button';

class TabBarStory extends React.Component {
	state = {
		count: 0,
		activeTabIndex: 0,
		tabs: ['Cookies', 'Pizza', 'Icecream']
	};

	onChange(evt) {
		this.setState({ activeTabIndex: evt.target.value });
		action('activeTabIndex: ' + evt.target.value)();
	}
	onChangeTabNames(evt) {
		this.setState({
			tabs: this.state.tabs.map((label, index) => index),
			count: this.state.count + 1
		});
	}
	onAddTab(evt) {
		this.setState({
			tabs: [
				...this.state.tabs,
				`Dynamic Tab #${this.state.tabs.length + 1}`
			]
		});
	}
	onRemoveLastTab(evt) {
		const init = this.state.tabs.slice(0, -1);
		this.setState({
			activeTabIndex: 0,
			tabs: init
		});
	}

	render() {
		return (
			<div >
				<div style={{ width: '50%', maxWidth: '480px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
					<Button raised onClick={evt => this.onChangeTabNames(evt)}>
						Change tab labels
					</Button>
					<Button raised onClick={evt => this.onAddTab(evt)}>
						Add Tab
					</Button>
					<Button
						disabled={this.state.tabs.length <= 1}
						raised
						onClick={evt => this.onRemoveLastTab(evt)}>
						Remove Last Tab
					</Button>
				</div>
				<TabBar
					count={this.state.count}
					activeTabIndex={number(
						'activeTabIndex',
						this.state.activeTabIndex
					)}
					onChange={evt => this.onChange(evt)}>
					{this.state.tabs.map(label => <Tab key={label}>{label}</Tab>)}
				</TabBar>
			</div>
		);
	}
}

storiesOf('Tabs', module).add('TabBar', () => <TabBarStory />);

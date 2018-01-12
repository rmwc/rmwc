import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { number, text } from '@storybook/addon-knobs';
import { Tab, TabBar, TabBarScroller } from './';
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
      tabs: [...this.state.tabs, `Dynamic Tab #${this.state.tabs.length + 1}`]
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
      <div>
        <div>
          <Button raised onClick={evt => this.onChangeTabNames(evt)}>
            Change tab labels
          </Button>{' '}
          <Button raised onClick={evt => this.onAddTab(evt)}>
            Add Tab
          </Button>{' '}
          <Button
            disabled={this.state.tabs.length <= 1}
            raised
            onClick={evt => this.onRemoveLastTab(evt)}
          >
            Remove Last Tab
          </Button>
        </div>
        <TabBar
          count={this.state.count}
          activeTabIndex={number('activeTabIndex', this.state.activeTabIndex)}
          onChange={evt => this.onChange(evt)}
        >
          {this.state.tabs.map(label => <Tab key={label}>{label}</Tab>)}
        </TabBar>
      </div>
    );
  }
}

class TabBarScrollerStory extends React.Component {
  state = {
    activeTabIndex: 0
  };

  onChange(evt) {
    this.setState({ activeTabIndex: evt.target.value });
    action('activeTabIndex: ' + evt.target.value)();
  }

  render() {
    return (
      <TabBarScroller
        indicatorForward={text('indicatorForward', undefined)}
        indicatorBack={text('indicatorBack', undefined)}
      >
        <TabBar
          activeTabIndex={number('activeTabIndex', this.state.activeTabIndex)}
          onChange={evt => this.onChange(evt)}
        >
          <Tab>Cookies</Tab>
          <Tab>Pizza</Tab>
          <Tab>Icecream</Tab>
          <Tab>Chocolate</Tab>
          <Tab>Fishsticks</Tab>
          <Tab>Ratatouille</Tab>
          <Tab>Bread</Tab>
          <Tab>Rolls</Tab>
          <Tab>Sushi</Tab>
          <Tab>Cupcake</Tab>
        </TabBar>
      </TabBarScroller>
    );
  }
}

storiesOf('Tabs', module)
  .add('TabBar', () => <TabBarStory />)
  .add('TabBarScroller', () => <TabBarScrollerStory />);

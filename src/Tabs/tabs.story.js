import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { number } from '@storybook/addon-knobs';
import { Tab, TabBar, TabBarScroller } from './';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';

class TabBarStory extends React.Component {
  state = {
    withScroller: false,
    count: 0,
    activeTabIndex: 1,
    tabs: ['Cookies', 'Pizza', 'Icecream']
  };

  onToggleWithScroller(evt) {
    this.setState({ withScroller: !this.state.withScroller });
    action('withScroller: ' + !this.state.withScroller)();
  }

  onChange(evt) {
    this.setState({ activeTabIndex: evt.detail.activeTabIndex });
    action('activeTabIndex: ' + evt.detail.activeTabIndex)();
  }
  onChangeTabNames(evt) {
    const state = {
      tabs: this.state.tabs.map((label, index) => index),
      count: this.state.count + 1
    };
    this.setState(state);
    action('onChangeTabNames: ' + JSON.stringify(state))();
  }
  onAddTab(evt) {
    const state = {
      tabs: [...this.state.tabs, `Dynamic Tab #${this.state.tabs.length + 1}`]
    };

    this.setState(state);

    action('onAddTab: ' + JSON.stringify(state))();
  }
  onRemoveLastTab(evt) {
    const init = this.state.tabs.slice(0, -1);
    const state = {
      tabs: init
    };

    this.setState(state);
    action('onRemoveLastTab: ' + JSON.stringify(state))();
  }

  render() {
    const tabBar = (
      <TabBar
        count={this.state.count}
        activeTabIndex={this.state.activeTabIndex}
        onChange={evt => this.onChange(evt)}
      >
        {this.state.tabs.map(label => <Tab key={label}>{label}</Tab>)}
      </TabBar>
    );

    const finalComponent = this.state.withScroller ? (
      <TabBarScroller>{tabBar}</TabBarScroller>
    ) : (
      tabBar
    );

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
          </Button>{' '}
          <Checkbox
            checked={this.state.withScroller}
            onChange={evt => this.onToggleWithScroller(evt)}
          >
            with TabBarScroller
          </Checkbox>
        </div>
        {finalComponent}
      </div>
    );
  }
}

class TabBarScrollerStory extends React.Component {
  state = {
    activeTabIndex: 0
  };

  onChange(evt) {
    this.setState({ activeTabIndex: evt.detail.activeTabIndex });
    action('activeTabIndex: ' + evt.detail.activeTabIndex)();
  }

  render() {
    return (
      <TabBarScroller>
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

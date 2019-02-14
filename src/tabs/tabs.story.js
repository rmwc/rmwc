import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Tab, TabBar } from './';
import { Button } from '@rmwc/button';

class TabBarStory extends React.Component {
  state = {
    withScroller: false,
    activeTabIndex: 0,
    tabs: ['Cookies', 'Pizza', 'Icecream'],
    icons: ['star', 'favorite', 'info']
  };

  onToggleWithScroller(evt) {
    this.setState({ withScroller: !this.state.withScroller });
    action('withScroller: ' + !this.state.withScroller)();
  }

  onChange(evt) {
    this.setState({ activeTabIndex: evt.detail.index });
    action('index: ' + evt.detail.index)();
  }
  onChangeTabNames(evt) {
    const state = {
      tabs: this.state.tabs.map((label, index) => index)
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
          <input
            type="number"
            value={this.state.activeTabIndex}
            onChange={evt => {
              this.setState({ activeTabIndex: Number(evt.target.value || 0) });
            }}
          />
        </div>
        Controlled
        <TabBar
          activeTabIndex={this.state.activeTabIndex}
          onActivate={evt => this.onChange(evt)}
        >
          {this.state.tabs.map(label => (
            <Tab key={label}>{label}</Tab>
          ))}
        </TabBar>
        <br />
        <br />
        Uncontrolled
        <TabBar>
          {this.state.tabs.map((label, index) => (
            <Tab key={label} label={label} icon={this.state.icons[index]} />
          ))}
        </TabBar>
        <br />
        <br />
        Icons
        <TabBar>
          {this.state.tabs.map((label, index) => (
            <Tab
              stacked
              restrictIndicator
              key={label}
              label={label}
              icon={this.state.icons[index]}
            />
          ))}
        </TabBar>
        <br />
        <br />
        Always 1
        <TabBar activeTabIndex={1}>
          {this.state.tabs.map(label => (
            <Tab key={label}>{label}</Tab>
          ))}
        </TabBar>
        <br />
        <br />
      </div>
    );
  }
}

storiesOf('Tabs', module).add('TabBar', () => <TabBarStory />);

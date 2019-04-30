import * as React from 'react';

import { Link, BrowserRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Tab, TabBar } from './';
import { Button } from '../button';

class TabBarStory extends React.Component {
  state = {
    withScroller: false,
    activeTabIndex: 0,
    tabs: ['Cookies', 'Pizza', 'Icecream'],
    icons: ['star', 'favorite', 'info']
  };

  onToggleWithScroller(evt: any) {
    this.setState({ withScroller: !this.state.withScroller });
    action('withScroller: ' + !this.state.withScroller)();
  }

  onChange(evt: any) {
    this.setState({ activeTabIndex: evt.detail.index });
    action('index: ' + evt.detail.index)();
  }
  onChangeTabNames(evt: any) {
    const state = {
      tabs: this.state.tabs.map((label, index) => index)
    };
    this.setState(state);
    action('onChangeTabNames: ' + JSON.stringify(state))();
  }
  onAddTab(evt: any) {
    const state = {
      tabs: [...this.state.tabs, `Dynamic Tab #${this.state.tabs.length + 1}`]
    };

    this.setState(state);

    action('onAddTab: ' + JSON.stringify(state))();
  }
  onRemoveLastTab(evt: any) {
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
          <Button raised onClick={(evt: any) => this.onChangeTabNames(evt)}>
            Change tab labels
          </Button>{' '}
          <Button raised onClick={(evt: any) => this.onAddTab(evt)}>
            Add Tab
          </Button>{' '}
          <Button
            disabled={this.state.tabs.length <= 1}
            raised
            onClick={(evt: any) => this.onRemoveLastTab(evt)}
          >
            Remove Last Tab
          </Button>{' '}
          <input
            type="number"
            value={this.state.activeTabIndex}
            onChange={(evt: any) => {
              this.setState({ activeTabIndex: Number(evt.target.value || 0) });
            }}
          />
        </div>
        Controlled
        <TabBar
          activeTabIndex={this.state.activeTabIndex}
          onActivate={(evt: any) => this.onChange(evt)}
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

storiesOf('Tabs', module)
  .add('TabBar', () => <TabBarStory />)
  .add('TabBar Links', () => (
    <Router>
      <TabBar>
        <Tab icon="stars" tag={Link} {...{ to: '' }} />
        <Tab icon="groups" tag={Link} {...{ to: '' }} />
        <Tab icon="settings" tag={Link} {...{ to: '' }} />
      </TabBar>
    </Router>
  ));

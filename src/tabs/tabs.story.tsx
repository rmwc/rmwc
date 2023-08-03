import React from 'react';

import { Link, BrowserRouter as Router } from 'react-router-dom';
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
          foundationRef={console.log}
        >
          {this.state.tabs.map((label) => (
            <Tab key={label}>{label}</Tab>
          ))}
        </TabBar>
        <br />
        <br />
        Uncontrolled
        <TabBar>
          {this.state.tabs.map((label, index) => (
            <Tab
              key={label}
              label={label}
              icon={this.state.icons[index]}
              foundationRef={console.log}
            />
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
          {this.state.tabs.map((label) => (
            <Tab key={label}>{label}</Tab>
          ))}
        </TabBar>
        <br />
        <br />
      </div>
    );
  }
}

export default {
  title: 'Tabs'
};

export const _TabBar = () => <TabBarStory />;

_TabBar.story = {
  name: 'TabBar'
};

export const TabBarScrolls = () => {
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <TabBar
      activeTabIndex={tabIndex}
      onActivate={(evt) => setTabIndex(evt.detail.index)}
    >
      {/* Tabs automatically scroll with lots of content. */}
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
      <Tab>Cheesecake</Tab>
    </TabBar>
  );
};

TabBarScrolls.story = {
  name: 'TabBar Scrolls'
};

export const __TabBar = () => <TabBarStory />;

__TabBar.story = {
  name: 'TabBar'
};

export const TabBarIconIndicators = () => (
  <TabBar>
    <Tab
      label="Cookies"
      iconIndicator={{
        icon: 'star',
        style: {
          transformOrigin: 'center center',
          transform: 'translateY(1rem) scale(0.5)'
        }
      }}
    />
    <Tab
      label="Pizza"
      iconIndicator={{
        icon: 'favorite',
        style: {
          transformOrigin: 'center center',
          transform: 'translateY(1rem) scale(0.5)'
        }
      }}
    />
    <Tab
      label="Icecream"
      iconIndicator={{
        icon: 'mood',
        style: {
          transformOrigin: 'center center',
          transform: 'translateY(1rem) scale(0.5)'
        }
      }}
    />
  </TabBar>
);

TabBarIconIndicators.story = {
  name: 'TabBar Icon Indicators'
};

export const TabBarLinks = () => (
  <Router>
    <TabBar>
      <Tab icon="stars" tag={Link} {...{ to: '' }} />
      <Tab icon="groups" tag={Link} {...{ to: '' }} />
      <Tab icon="settings" tag={Link} {...{ to: '' }} />
    </TabBar>
  </Router>
);

TabBarLinks.story = {
  name: 'TabBar Links'
};

import * as React from 'react';
import { mount } from 'enzyme';
import { TabBar, Tab } from './';

describe('Tabs', () => {
  beforeAll(() => {
    // scrollTo is not implemented in JSDOM, mock it
    // @ts-ignore
    global.scrollTo = jest.fn();
  });

  it('TabBar renders', () => {
    mount(
      <TabBar activeTabIndex={0} onActivate={evt => {}}>
        <Tab>Test</Tab>
      </TabBar>
    );
  });

  it('Can be stacked', () => {
    mount(
      <TabBar>
        <Tab stacked>Test</Tab>
      </TabBar>
    );
  });

  it('Can have label', () => {
    mount(
      <TabBar>
        <Tab label="Test" />
      </TabBar>
    );
  });

  it('Can add and remove tabs dynamically', () => {
    class Comp extends React.Component {
      state = {
        tabs: ['ONE']
      };
      render() {
        return (
          <TabBar>
            {this.state.tabs.map(label => (
              <Tab key={label} label={label} />
            ))}
          </TabBar>
        );
      }
    }

    const el = mount(<Comp />);
    expect(el.html().includes('TWO')).toBe(false);
    el.setState({ tabs: ['MEW', 'TWO'] });
    expect(el.html().includes('ONE')).toBe(false);
    expect(el.html().includes('MEW')).toBe(true);
    expect(el.html().includes('TWO')).toBe(true);
    el.setState({ tabs: ['MEW'] });
    expect(el.html().includes('TWO')).toBe(false);
  });

  it('Can have icon', () => {
    mount(
      <TabBar>
        <Tab icon="favorite" label="Test" />
      </TabBar>
    );
  });

  it('Can have restrictIndicator', () => {
    mount(
      <TabBar>
        <Tab restrictIndicator icon="favorite" label="Test" />
      </TabBar>
    );
  });

  it('can have no tabs', () => {
    mount(<TabBar />);
  });

  it('can have custom classnames', () => {
    [TabBar, Tab].forEach((Component: React.ComponentType<any>) => {
      const el = mount(<Component className={'my-custom-classname'} />);
      expect(!!~el.html().search('my-custom-classname')).toEqual(true);
    });
  });

  it('sets initial active tab', done => {
    const el1 = mount(
      <TabBar activeTabIndex={0}>
        <Tab>1</Tab>
        <Tab>2</Tab>
      </TabBar>
    );

    const el2 = mount(
      <TabBar activeTabIndex={1}>
        <Tab>1</Tab>
        <Tab>2</Tab>
      </TabBar>
    );
    window.requestAnimationFrame(() => {
      expect(el1.html().includes('mdc-tab--active')).toEqual(true);
      expect(el2.html().includes('mdc-tab--active')).toEqual(true);
      done();
    });
  });
});

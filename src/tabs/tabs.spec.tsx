import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TabBar, Tab } from './';

describe('Tabs', () => {
  beforeAll(() => {
    // scrollTo is not implemented in JSDOM, mock it
    // @ts-ignore
    global.scrollTo = jest.fn();
  });

  it('TabBar renders', () => {
    const { asFragment } = render(
      <TabBar activeTabIndex={0} onActivate={(evt) => {}}>
        <Tab>Test</Tab>
      </TabBar>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Can be stacked', () => {
    const { asFragment } = render(
      <TabBar>
        <Tab stacked>Test</Tab>
      </TabBar>
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Can have label', () => {
    const { asFragment } = render(
      <TabBar>
        <Tab label="Test" />
      </TabBar>
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Can have icon', () => {
    const { asFragment } = render(
      <TabBar>
        <Tab icon="favorite" label="Test" />
      </TabBar>
    );
    expect(screen.getByText('favorite')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Can have restrictIndicator', () => {
    const { asFragment } = render(
      <TabBar>
        <Tab restrictIndicator icon="favorite" label="Test" />
      </TabBar>
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('can have no tabs', () => {
    const { asFragment } = render(<TabBar />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('can have custom classnames', () => {
    [TabBar, Tab].forEach((Component: React.ComponentType<any>) => {
      const { container } = render(
        <Component className={'my-custom-classname'} />
      );
      expect(container.firstChild).toHaveClass('my-custom-classname');
    });
  });

  it('sets initial active tab', async () => {
    render(
      <TabBar activeTabIndex={1}>
        <Tab>1</Tab>
        <Tab>2</Tab>
      </TabBar>
    );
    await waitFor(() =>
      expect(screen.getByText('2').parentElement?.parentElement).toHaveClass(
        'mdc-tab--active'
      )
    );
  });

  it('can be used as a controlled element', async () => {
    const { container } = render(
      <TabBar activeTabIndex={1}>
        <Tab>1</Tab>
        <Tab>2</Tab>
      </TabBar>
    );

    userEvent.click(screen.getByText('1'));

    await waitFor(() =>
      expect(container.getElementsByClassName('mdc-tab--active')).toHaveLength(
        1
      )
    );
  });

  it('focuses active tab on mount', async () => {
    const { container } = render(
      <TabBar>
        <Tab focusOnActivate>Test</Tab>
      </TabBar>
    );

    return new Promise((resolve) => {
      window.requestAnimationFrame(() => {
        expect(document.activeElement).toBe(container.querySelector('button'));
        resolve(true);
      });
    });
  });

  it('does not focus active tab on mount', () => {
    const { container } = render(
      <TabBar>
        <Tab focusOnActivate={false}>Test</Tab>
      </TabBar>
    );

    expect(document.activeElement).not.toBe(container.querySelector('button'));
  });
});

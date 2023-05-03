import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  List,
  ListItem,
  ListItemPrimaryText,
  ListItemGraphic,
  ListItemMeta,
  SimpleListItem,
  CollapsibleList
} from './';

describe('List', () => {
  it('renders', () => {
    const { asFragment } = render(
      <List>
        <ListItem ripple>
          <ListItemGraphic />
          <ListItemPrimaryText>Cookies</ListItemPrimaryText>
          <ListItemMeta />
        </ListItem>
        <ListItem ripple={false}>
          <ListItemGraphic />
          <ListItemPrimaryText>Cookies</ListItemPrimaryText>
          <ListItemMeta />
        </ListItem>
      </List>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('handles onAction', async () => {
    let clickedIndex: any;

    render(
      <List onAction={(evt) => (clickedIndex = evt.detail)}>
        <ListItem>
          <ListItemPrimaryText>Cookies</ListItemPrimaryText>
        </ListItem>
        <ListItem>
          <ListItemPrimaryText>Pancakes</ListItemPrimaryText>
        </ListItem>
      </List>
    );

    userEvent.click(screen.getByText('Pancakes'));

    await waitFor(() => expect(clickedIndex).toEqual({ index: 1 }));

    userEvent.click(screen.getByText('Cookies'));

    await waitFor(() => expect(clickedIndex).toEqual({ index: 0 }));
  });

  it('SimpleListItem renders', () => {
    const { asFragment } = render(
      <List>
        <SimpleListItem graphic="star_border" text="Cookies" />
        <SimpleListItem
          graphic="star_border"
          text="Cookies"
          secondaryText="Chocolate chip"
        />
        <SimpleListItem
          graphic="star_border"
          text="Cookies"
          secondaryText="Chocolate chip"
          meta="info"
        />
      </List>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('SimpleListItem can have children', () => {
    render(
      <SimpleListItem
        graphic="star_border"
        text="Cookies"
        secondaryText="Chocolate chip"
        meta="info"
      >
        <aside>Test</aside>
      </SimpleListItem>
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('can have custom classnames', () => {
    [List, ListItem, ListItemPrimaryText].forEach(
      (Component: React.ComponentType<any>) => {
        const { container } = render(
          <Component className={'my-custom-classname'} />
        );
        expect(container.firstChild).toHaveClass('my-custom-classname');
      }
    );
  });

  it('can be activated', () => {
    const { container } = render(<ListItem activated />);
    expect(container.firstChild).toHaveClass(
      'mdc-deprecated-list-item--activated'
    );
  });

  it('can be selected', () => {
    const { container } = render(<ListItem selected />);
    expect(container.firstChild).toHaveClass(
      'mdc-deprecated-list-item--selected'
    );
  });
});

describe('Collapsible List', () => {
  it('renders', () => {
    const { asFragment } = render(
      <List>
        <ListItem>One</ListItem>
        <CollapsibleList handle={<ListItem>Handle</ListItem>}>
          <ListItem>Two</ListItem>
        </CollapsibleList>
      </List>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('handles lifecycle', () => {
    render(
      <List>
        <ListItem>One</ListItem>
        <CollapsibleList
          defaultOpen
          handle={<ListItem className="handle">Handle</ListItem>}
        >
          <ListItem>Two</ListItem>
        </CollapsibleList>
      </List>
    );

    userEvent.click(screen.getByText('One'));

    expect(screen.getByText('Handle')).toBeInTheDocument();
  });

  it('handles events: enter', () => {
    render(
      <List>
        <ListItem>One</ListItem>
        <CollapsibleList
          defaultOpen
          handle={<ListItem className="handle">Handle</ListItem>}
        >
          <ListItem>Two</ListItem>
        </CollapsibleList>
      </List>
    );

    userEvent.type(screen.getByText('One'), '{enter}');
    expect(screen.getByText('Handle')).toBeInTheDocument();
  });
});

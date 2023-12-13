import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  ListItem,
  ListItemPrimaryText,
  ListItemGraphic,
  ListItemMeta,
  SimpleListItem
} from './list-item';
import { Checkbox } from '@rmwc/checkbox';
import { Radio } from '@rmwc/radio';
import { List } from './list';
import { CollapsibleList } from './collapsible-list';

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

  it('can be dense', async () => {
    const { asFragment } = render(
      <List dense>
        <ListItem>
          <ListItemPrimaryText>Cookies</ListItemPrimaryText>
        </ListItem>
      </List>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('can be twoLine', async () => {
    const { asFragment } = render(
      <List twoLine>
        <ListItem>
          <ListItemPrimaryText>Cookies</ListItemPrimaryText>
        </ListItem>
        <ListItem>
          <ListItemPrimaryText>Pancakes</ListItemPrimaryText>
        </ListItem>
      </List>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('can be avatarList', async () => {
    const { asFragment } = render(
      <List avatarList>
        <ListItem>
          <ListItemPrimaryText>Cookies</ListItemPrimaryText>
        </ListItem>
      </List>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('can be nonInteractive', async () => {
    const { asFragment } = render(
      <List nonInteractive>
        <ListItem>
          <ListItemPrimaryText>Cookies</ListItemPrimaryText>
        </ListItem>
      </List>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('has right role when having selectedIndex', () => {
    render(
      <List selectedIndex={1}>
        <ListItem>Pizza</ListItem>
        <ListItem>Cookies</ListItem>
        <ListItem>IceCream</ListItem>
      </List>
    );

    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('role set by user is not overwritten', () => {
    render(
      <List role="menu" selectedIndex={1}>
        <ListItem>Pizza</ListItem>
        <ListItem>Cookies</ListItem>
        <ListItem>IceCream</ListItem>
      </List>
    );

    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('has the right role when ListItem has checkboxs', () => {
    render(
      <List>
        {['Cookies', 'Pizza', 'Icecream'].map((key) => (
          <ListItem key={key}>
            {key}
            <ListItemMeta>
              <Checkbox readOnly />
            </ListItemMeta>
          </ListItem>
        ))}
      </List>
    );

    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('has the right role when ListItem has radios', () => {
    render(
      <List>
        {['Cookies', 'Pizza', 'Icecream'].map((key) => (
          <ListItem key={key}>
            {key}
            <ListItemMeta>
              <Radio readOnly />
            </ListItemMeta>
          </ListItem>
        ))}
      </List>
    );

    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
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

  it('can be disabled', () => {
    const { container } = render(<ListItem disabled />);
    expect(container.firstChild).toHaveClass(
      'mdc-deprecated-list-item--disabled'
    );
  });
});

describe('SimpleListItem', () => {
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

describe('ListItem', () => {
  it('has the right role when containing selectedIndex', () => {
    render(
      <List selectedIndex={1}>
        <ListItem>Pizza</ListItem>
        <ListItem>Cookies</ListItem>
        <ListItem>IceCream</ListItem>
      </List>
    );

    expect(screen.getByText('Pizza').getAttribute('role')).toEqual('option');
  });

  it('role set by user is not overwritten', () => {
    render(
      <List selectedIndex={1}>
        <ListItem role="menuitem">Pizza</ListItem>
        <ListItem>Cookies</ListItem>
        <ListItem>IceCream</ListItem>
      </List>
    );

    expect(screen.getByText('Pizza').getAttribute('role')).toEqual('menuitem');
  });

  it('has the right role when ListItem has checkboxs', () => {
    render(
      <List>
        {['Cookies', 'Pizza', 'Icecream'].map((key) => (
          <ListItem key={key}>
            {key}
            <ListItemMeta>
              <Checkbox readOnly />
            </ListItemMeta>
          </ListItem>
        ))}
      </List>
    );

    expect(screen.getByText('Cookies').getAttribute('role')).toEqual(
      'checkbox'
    );
  });

  it('has the right role when ListItem has radios', () => {
    render(
      <List>
        {['Cookies', 'Pizza', 'Icecream'].map((key) => (
          <ListItem key={key}>
            {key}
            <ListItemMeta>
              <Radio readOnly />
            </ListItemMeta>
          </ListItem>
        ))}
      </List>
    );

    expect(screen.getByText('Cookies').getAttribute('role')).toEqual('radio');
  });
});

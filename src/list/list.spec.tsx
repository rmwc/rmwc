import * as React from 'react';
import { mount } from 'enzyme';
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
    const el = mount(
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

    el.unmount();
  });

  it('SimpleListItem renders', () => {
    mount(
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
  });

  it('SimpleListItem can have children', () => {
    const el = mount(
      <SimpleListItem
        graphic="star_border"
        text="Cookies"
        secondaryText="Chocolate chip"
        meta="info"
      >
        <aside>Test</aside>
      </SimpleListItem>
    );
    expect(el.find('aside').length).toBe(1);
  });

  it('can have custom classnames', () => {
    [List, ListItem, ListItemPrimaryText].forEach(
      (Component: React.ComponentType<any>) => {
        const el = mount(<Component className={'my-custom-classname'} />);
        expect(!!~el.html().search('my-custom-classname')).toEqual(true);
      }
    );
  });

  it('can be activated', () => {
    const el = mount(<ListItem activated />);
    expect(!!~el.html().search('mdc-list-item--activated')).toEqual(true);
  });

  it('can be selected', () => {
    const el = mount(<ListItem selected />);
    expect(!!~el.html().search('mdc-list-item--selected')).toEqual(true);
  });
});

describe('Collapsible List', () => {
  it('renders', () => {
    mount(
      <List>
        <ListItem>One</ListItem>
        <CollapsibleList handle={<ListItem>Handle</ListItem>}>
          <ListItem>Two</ListItem>
        </CollapsibleList>
      </List>
    );
  });
});

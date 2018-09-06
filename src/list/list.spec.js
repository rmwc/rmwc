import * as React from 'react';
import { mount } from 'enzyme';
import {
  List,
  ListItem,
  ListItemPrimaryText,
  ListItemGraphic,
  ListItemMeta,
  SimpleListItem
} from './';

describe('List', () => {
  it('renders', () => {
    mount(
      <List>
        <ListItem ripple>
          <ListItemGraphic />
          <ListItemPrimaryText>Cookies</ListItemPrimaryText>
          <ListItemMeta />
        </ListItem>
      </List>
    );
  });

  it('SimpleListItem renders', () => {
    mount(
      <List>
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
    [List, ListItem, ListItemPrimaryText].forEach(Component => {
      const el = mount(<Component className={'my-custom-classname'} />);
      expect(!!~el.html().search('my-custom-classname')).toEqual(true);
    });
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

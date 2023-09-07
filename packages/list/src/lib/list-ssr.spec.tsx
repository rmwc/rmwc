/**
 * @jest-environment node
 */

import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { List } from './list';
import {
  ListItem,
  ListItemGraphic,
  ListItemMeta,
  ListItemPrimaryText,
  SimpleListItem
} from './list-item';

describe('List SSR', () => {
  it('renders', () => {
    mount(
      <List>
        <SimpleListItem text="foo" />
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
  });
});

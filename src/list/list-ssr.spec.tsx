/**
 * @jest-environment node
 */

import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import {
  List,
  ListItem,
  ListItemPrimaryText,
  ListItemGraphic,
  ListItemMeta,
  SimpleListItem
} from './';

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

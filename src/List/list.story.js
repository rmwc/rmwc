import React from 'react';

import { storiesOf } from '@storybook/react';
import {
  List,
  ListItem,
  ListItemGraphic,
  ListItemText,
  ListItemMeta
} from './';

storiesOf('Lists', module).add('List', () => (
  <List>
    <ListItem ripple>
      <ListItemGraphic>star_border</ListItemGraphic>
      <ListItemText>Cookies</ListItemText>
      <ListItemMeta>info</ListItemMeta>
    </ListItem>

    <ListItem ripple>
      <ListItemGraphic>favorite_border</ListItemGraphic>
      <ListItemText>Pizza</ListItemText>
      <ListItemMeta>info</ListItemMeta>
    </ListItem>

    <ListItem ripple>
      <ListItemGraphic>mood</ListItemGraphic>
      <ListItemText>Icecream</ListItemText>
      <ListItemMeta>info</ListItemMeta>
    </ListItem>
  </List>
));

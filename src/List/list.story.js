import * as React from 'react';

import { storiesOf } from '@storybook/react';
import {
  List,
  ListItem,
  ListItemGraphic,
  ListItemPrimaryText,
  ListItemMeta
} from './';

storiesOf('Lists', module).add('List', () => (
  <List>
    <ListItem ripple>
      <ListItemGraphic>star_border</ListItemGraphic>
      <ListItemPrimaryText>Cookies</ListItemPrimaryText>
      <ListItemMeta>info</ListItemMeta>
    </ListItem>

    <ListItem ripple>
      <ListItemGraphic>favorite_border</ListItemGraphic>
      <ListItemPrimaryText>Pizza</ListItemPrimaryText>
      <ListItemMeta>info</ListItemMeta>
    </ListItem>

    <ListItem ripple>
      <ListItemGraphic>mood</ListItemGraphic>
      <ListItemPrimaryText>Icecream</ListItemPrimaryText>
      <ListItemMeta tag="span" basename="">
        $1.00
      </ListItemMeta>
    </ListItem>
  </List>
));

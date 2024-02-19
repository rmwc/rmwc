import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryText,
  ListItemGraphic,
  ListItemPrimaryText,
  ListItemMeta
} from '..';
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Lists/List',
  component: List
} as Meta;

type Story = StoryObj<typeof List>;

export const ListStory: Story = {
  render: (args) => (
    <List {...args}>
      <ListItem>
        <ListItemGraphic icon="star_border" />
        <ListItemText>
          <ListItemPrimaryText>Cookies</ListItemPrimaryText>
          <ListItemSecondaryText>$4.99 a dozen</ListItemSecondaryText>
        </ListItemText>
        <ListItemMeta icon="info" />
      </ListItem>
      <ListItem>
        <ListItemGraphic icon="local_pizza" />
        <ListItemText>
          <ListItemPrimaryText>Pizza</ListItemPrimaryText>
          <ListItemSecondaryText>$1.99 a slice</ListItemSecondaryText>
        </ListItemText>
        <ListItemMeta icon="info" />
      </ListItem>
      <ListItem activated>
        <ListItemGraphic icon="mood" />
        <ListItemText>
          <ListItemPrimaryText>Icecream</ListItemPrimaryText>
          <ListItemSecondaryText>$0.99 a scoop</ListItemSecondaryText>
        </ListItemText>
        <ListItemMeta>Winner!</ListItemMeta>
      </ListItem>
    </List>
  ),
  args: {
    twoLine: true
  }
};

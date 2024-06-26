import React from 'react';
import { List, ListItem, ListItemGraphic } from '@rmwc/list';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerSubtitle,
  DrawerTitle
} from './drawer';

const menuItems = [
  { displayName: 'Home', icon: 'home' },
  { displayName: 'Profile', icon: 'account_circle' },
  { displayName: 'About', icon: 'info' },
  { displayName: 'Contact', icon: 'phone' }
];

const ListItems = (props: any) => (
  <>
    {menuItems.map((section, i) => (
      <ListItem key={i} onClick={props.onItemClick}>
        <ListItemGraphic>{section.icon}</ListItemGraphic>
        {section.displayName}
      </ListItem>
    ))}
  </>
);

export default {
  title: 'Drawers',
  component: Drawer
} as Meta;

type Story = StoryObj<typeof Drawer>;

export const DrawerStory: Story = {
  render: (args) => {
    const { modal, open, dismissible } = args;
    return (
      <div style={{ margin: '-24px' }}>
        <Drawer modal={modal} dismissible={dismissible} open={open}>
          <DrawerHeader style={{ backgroundColor: '#f6f6f6' }}>
            <DrawerTitle>DrawerTitle</DrawerTitle>
            <DrawerSubtitle>DrawerSubtitle</DrawerSubtitle>
          </DrawerHeader>
          <DrawerContent>
            <List>
              <ListItems onItemClick={console.log} />
            </List>
          </DrawerContent>
        </Drawer>
      </div>
    );
  },
  args: {
    open: true
  }
};

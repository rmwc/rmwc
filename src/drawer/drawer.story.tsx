import React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import {
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerTitle,
  DrawerSubtitle
} from './';
import { List, ListItem, ListItemGraphic } from '../list';
import { useKnob } from '@rmwc/base/utils/use-knob';

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
  title: 'Drawers'
};

export const _Drawer = function () {
  const [open, setOpen] = useKnob('boolean', 'open', true);
  return (
    <div style={{ margin: '-24px' }}>
      <Drawer
        modal={boolean('modal', false)}
        dismissible={boolean('dismissible', false)}
        open={open}
        onClose={() => {
          action('onClose')();
          setOpen(false);
        }}
        foundationRef={console.log}
      >
        <DrawerHeader style={{ backgroundColor: '#f6f6f6' }}>
          <DrawerTitle>DrawerTitle</DrawerTitle>
          <DrawerSubtitle>DrawerSubtitle</DrawerSubtitle>
        </DrawerHeader>
        <DrawerContent>
          <List>
            <ListItems onItemClick={action('onClick')} />
          </List>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

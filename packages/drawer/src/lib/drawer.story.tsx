import React from 'react';

import { useKnob } from '@rmwc/base/utils/use-knob';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { List, ListItem, ListItemGraphic } from '../list';
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

storiesOf('Drawers', module).add('Drawer', function () {
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
});

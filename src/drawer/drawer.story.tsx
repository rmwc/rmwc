import * as React from 'react';

import { storiesOf } from '@storybook/react';
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

storiesOf('Drawers', module).add('Drawer', () => (
  <div style={{ margin: '-24px' }}>
    <Drawer
      modal={boolean('modal', false)}
      dismissible={boolean('dismissible', false)}
      open={boolean('open', true)}
      onClose={action('onClose')}
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
));

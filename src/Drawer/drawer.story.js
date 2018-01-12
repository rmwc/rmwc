import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { Drawer, DrawerHeader, DrawerContent } from './';
import { ListItem, ListItemText, ListItemGraphic } from '../List';

const menuItems = [
  { displayName: 'Home', icon: 'home' },
  { displayName: 'Profile', icon: 'account_circle' },
  { displayName: 'About', icon: 'info' },
  { displayName: 'Contact', icon: 'phone' }
];

const ListItems = props =>
  menuItems.map((section, i) => (
    <ListItem key={i} onClick={props.onItemClick}>
      <ListItemGraphic>{section.icon}</ListItemGraphic>
      <ListItemText>{section.displayName}</ListItemText>
    </ListItem>
  ));
storiesOf('Drawers', module).add('Drawer', () => (
  <div style={{ margin: '-24px' }}>
    <Drawer
      permanent={boolean('permanent', true)}
      temporary={boolean('temporary', false)}
      persistent={boolean('persistent', false)}
      open={boolean('open', true)}
      onClose={action('onClose')}
    >
      <DrawerHeader style={{ backgroundColor: '#f6f6f6' }}>
        DrawerHeader
      </DrawerHeader>
      <DrawerContent>
        <ListItems onItemClick={action('onClick')} />
      </DrawerContent>
    </Drawer>
  </div>
));

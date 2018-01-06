import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { PermanentDrawer, PermanentDrawerContent } from './permanent-drawer';
import {
  PersistentDrawer,
  PersistentDrawerContent,
  PersistentDrawerHeader,
} from './persistent-drawer';
import {
  TemporaryDrawer,
  TemporaryDrawerContent,
  TemporaryDrawerHeader,
} from './temporary-drawer';
import { 
  List, 
  ListItem, 
  ListItemText,
  ListItemStartDetail
} from '../List';


const ListItems = props =>
  menuItems.map((section, i) => (
    <ListItem key={i} onClick={props.onItemClick}>
      <ListItemStartDetail>{section.icon}</ListItemStartDetail>
      <ListItemText>{section.displayName}</ListItemText>
    </ListItem>
  ));

const menuItems = [
  { displayName: 'Home', icon: 'home' },
  { displayName: 'Profile', icon: 'account_circle' },
  { displayName: 'About', icon: 'info' },
  { displayName: 'Contact', icon: 'phone' },
];

storiesOf('Drawers', module)
  .add('PersistentDrawer', () => (
    <div style={{ margin: '-24px' }}>
      <PersistentDrawer
        open={boolean('open', true)}
        onClose={action('onClose')}
      >
        <PersistentDrawerHeader style={{ backgroundColor: '#f6f6f6' }}>
          PersistentDrawerHeader
        </PersistentDrawerHeader>
        <PersistentDrawerContent>
          <ListItems onItemClick={action('onClick')} />
        </PersistentDrawerContent>
      </PersistentDrawer>
    </div>
  ))
  .add('TemporaryDrawer', () => (
    <div style={{ margin: '-24px' }}>
      <TemporaryDrawer open={boolean('open', true)} onClose={action('onClose')}>
        <TemporaryDrawerHeader style={{ backgroundColor: '#f6f6f6' }}>
          TemporaryDrawerHeader
        </TemporaryDrawerHeader>
        <TemporaryDrawerContent>
          <ListItems onItemClick={action('onClick')} />
        </TemporaryDrawerContent>
      </TemporaryDrawer>
    </div>
  ))
  .add('PermanentDrawer', () => (
    <div style={{ margin: '-24px' }}>
      <PermanentDrawer>
        <PermanentDrawerContent>
          <ListItems onItemClick={action('onClick')} />
        </PermanentDrawerContent>
      </PermanentDrawer>
    </div>
  ));

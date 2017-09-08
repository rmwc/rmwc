import React from 'react';
import { mount } from 'enzyme';
import {
  List,
  ListItem,
  ListItemText,
  ListItemStartDetail,
  ListItemEndDetail
} from './list';

describe('List', () => {
  it('renders', () => {
    mount(
      <List>
        <ListItem ripple>
          <ListItemStartDetail>
            <i />
          </ListItemStartDetail>
          <ListItemText>Cookies</ListItemText>
          <ListItemEndDetail>
            <i />
          </ListItemEndDetail>
        </ListItem>
      </List>
    );
  });
});

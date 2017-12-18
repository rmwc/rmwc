import React from 'react';
import { mount } from 'enzyme';
import {
  List,
  ListItem,
  ListItemText,
  ListItemStartDetail,
  ListItemEndDetail
} from './';

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

  it('can have custom classnames', () => {
    [List, ListItem, ListItemText].forEach(Component => {
      const el = mount(<Component className={'my-custom-classname'} />);
      expect(!!~el.html().search('my-custom-classname')).toEqual(true);
    });
  });

  it('can be activated', () => {
    const el = mount(<ListItem activated />);
    expect(!!~el.html().search('mdc-list-item--activated')).toEqual(true);
  });

  it('can be selected', () => {
    const el = mount(<ListItem selected />);
    expect(!!~el.html().search('mdc-list-item--selected')).toEqual(true);
  });
});

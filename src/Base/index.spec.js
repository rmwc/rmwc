import React from 'react';
import { mount } from 'enzyme';
import { ListItem } from '../List';

describe('RMWC', () => {
  it('works', () => {});
});

describe('simpleTag', () => {
  it('Tag can be another component', () => {
    const Link = ({ to, ...rest }) => <a href="#" {...rest} />;
    const ListItemGraphic = 'div';
    const ListItemText = 'div';
    mount(
      <ListItem tag={Link} to="/">
        <ListItemGraphic>home</ListItemGraphic>
        <ListItemText>Home</ListItemText>
      </ListItem>
    );
  });
});

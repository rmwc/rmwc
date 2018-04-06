import React from 'react';

import { storiesOf } from '@storybook/react';
import { ListItem, ListItemGraphic, ListItemText } from '../List';

storiesOf('Base', module).add('simpleTag elementRef', () => {
  const Link = ({ to, ...rest }) => <a href="#" {...rest} />;
  return (
    <ListItem tag={Link} to="/">
      <ListItemGraphic>home</ListItemGraphic>
      <ListItemText>Home</ListItemText>
    </ListItem>
  );
});

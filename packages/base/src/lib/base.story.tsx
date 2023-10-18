import React from 'react';

import { storiesOf } from '@storybook/react';
import { ListItem, ListItemGraphic } from '../list';

storiesOf('Base', module).add('simpleTag elementRef', () => {
  const Link = ({ to, ...rest }: any) => <a href="#" {...rest} />;
  return (
    <ListItem tag={Link} {...{ to: '/' }}>
      <ListItemGraphic icon="home" />
      Home
    </ListItem>
  );
});

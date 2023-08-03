import React from 'react';

import { ListItem, ListItemGraphic } from '../list';

export default {
  title: 'Base'
};

export const SimpleTagElementRef = () => {
  const Link = ({ to, ...rest }: any) => <a href="#" {...rest} />;
  return (
    <ListItem tag={Link} {...{ to: '/' }}>
      <ListItemGraphic icon="home" />
      Home
    </ListItem>
  );
};

SimpleTagElementRef.story = {
  name: 'simpleTag elementRef'
};

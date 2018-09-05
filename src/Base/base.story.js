import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { ListItem, ListItemGraphic, ListItemPrimaryText } from '@rmwc/list';

storiesOf('Base', module).add('simpleTag elementRef', () => {
  const Link = ({ to, ...rest }) => <a href="#" {...rest} />;
  return (
    <ListItem tag={Link} to="/">
      <ListItemGraphic icon="home" />
      Home
    </ListItem>
  );
});

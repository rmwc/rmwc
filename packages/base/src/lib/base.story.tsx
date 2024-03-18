import React from 'react';
import { ListItem, ListItemGraphic } from '@rmwc/list';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Base',
  component: ListItem
} as Meta;

type Story = StoryObj<typeof ListItem>;

export const BaseStory: Story = {
  render: (args) => {
    const Link = React.forwardRef(({ to, ...rest }, ref) => (
      <a href="#" {...rest} ref={ref} />
    ));
    return (
      <ListItem tag={Link} {...args}>
        <ListItemGraphic icon="home" />
        Home
      </ListItem>
    );
  },
  args: {
    to: '/'
  }
};

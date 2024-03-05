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
    const Link = ({ to, ...rest }) => <a href="#" {...rest} />;
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

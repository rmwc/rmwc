import React from 'react';
import { Button } from './button';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Buttons',
  component: Button
} as Meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (args) => <Button {...args}>Button</Button>
};

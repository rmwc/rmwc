import React from 'react';
import { Checkbox } from './checkbox';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Inputs and Controls/Checkbox',
  component: Checkbox
} as Meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: (args) => <Checkbox {...args} />
};

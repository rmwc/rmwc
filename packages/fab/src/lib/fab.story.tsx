import React from 'react';
import { Fab } from './fab'; // replace with your actual component import
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Buttons/Fab',
  component: Fab
} as Meta;

type Story = StoryObj<typeof Fab>;

export const FabStory: Story = {
  render: (args) => <Fab {...args}>favorite</Fab>,
  args: {
    mini: false,
    ripple: true
  }
};

export const CssOnlyFabStory: Story = {
  render: (args) => <Fab {...args}>favorite</Fab>,
  args: {
    mini: false
  }
};

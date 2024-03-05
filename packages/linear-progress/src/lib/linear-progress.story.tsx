import React from 'react';
import { LinearProgress } from './linear-progress'; // replace with your actual component import
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'LinearProgress',
  component: LinearProgress
} as Meta;

type Story = StoryObj<typeof LinearProgress>;

export const LinearProgressStory: Story = {
  render: (args) => <LinearProgress {...args} foundationRef={console.log} />,
  args: {
    progress: 0.5,
    buffer: 0,
    reversed: false,
    closed: false
  }
};

import React from 'react';
import { Segment } from './segment'; // replace with your actual component import
import { SegmentedButton } from './segmented-button'; // replace with your actual component import
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Buttons/Segmented-Button',
  component: SegmentedButton
} as Meta;

type Story = StoryObj<typeof SegmentedButton>;

export const SegmentedButtonStory: Story = {
  render: (args) => (
    <SegmentedButton {...args}>
      <Segment label="Cookies" />
      <Segment label="Pizza" />
      <Segment label="Icecream" />
    </SegmentedButton>
  ),
  args: {
    touch: false
  }
};

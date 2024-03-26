import React from 'react';
import { IconButton } from './icon-button';
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Buttons/IconButton',
  component: IconButton
} as Meta;

type Story = StoryObj<typeof IconButton>;

export const IconButtonStory: Story = {
  render: () => (
    <IconButton
      icon="star"
      onIcon="favorite_border"
      label="Rate this!"
      foundationRef={console.log}
    />
  )
};

export const IconButtonNoToggleStory: Story = {
  render: () => (
    <IconButton
      icon="star"
      label="Rate this!"
      onClick={() => console.log("click")}
      foundationRef={console.log}
    />
  )
}
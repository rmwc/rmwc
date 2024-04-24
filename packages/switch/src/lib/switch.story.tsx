import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Switch } from './switch';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Switch',
  component: Switch
} as Meta;

type Story = StoryObj<typeof Switch>;

export const SwitchStory: Story = {
  render: (args) => (
    <Switch
      {...args}
      onChange={(evt) => {
        action(
          `onChange: ${evt.currentTarget.value} ${evt.currentTarget.checked}`
        )();
      }}
    />
  ),
  args: {
    disabled: false,
    checked: false,
    value: 'myValue',
    label: 'Hello World'
  }
};

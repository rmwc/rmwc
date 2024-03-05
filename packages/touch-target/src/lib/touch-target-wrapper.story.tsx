import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button } from '@rmwc/button';
import { TouchTargetWrapper } from './touch-target';

export default {
  title: 'Buttons/TouchTargetWrapper',
  component: TouchTargetWrapper
} as Meta;

type Story = StoryObj<Parameters<typeof TouchTargetWrapper>[0]>;

export const TouchTargetWrapperStory: Story = {
  render: (args) => (
    <TouchTargetWrapper {...args}>
      <Button>Touchable</Button>
    </TouchTargetWrapper>
  )
};

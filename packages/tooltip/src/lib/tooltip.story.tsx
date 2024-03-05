import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '@rmwc/avatar';
import { Tooltip } from './tooltip';

export default {
  title: 'Tooltips/Tooltip',
  component: Tooltip
} as Meta;

type Story = StoryObj<Parameters<typeof Tooltip>[0]>;

export const TooltipStory: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <a href="#" style={{ margin: '4rem', display: 'inline-block' }}>
        hover
      </a>
    </Tooltip>
  ),
  args: {
    overlay: 'Test Tooltip'
  }
};

export const TooltipWithRichContentStory: Story = {
  render: (args) => (
    <Tooltip
      overlay={
        <div>
          <Avatar size="xsmall" name="James Friedman" /> James Friedman
        </div>
      }
    >
      <a href="#" style={{ margin: '4rem', display: 'inline-block' }}>
        Rich Content
      </a>
    </Tooltip>
  )
};
